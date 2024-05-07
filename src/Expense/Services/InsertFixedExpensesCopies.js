const Periods = require('../../Core/Enumeration/Periods')
const Expense = require('../Model/Expense')

const insertAutomaticFixedExpenses = async (expense, endDate) =>
{
    const increment = {
        [Periods.Diario]: (date) => date.setDate(date.getDate() + 1),
        [Periods.Semanal]: (date) => date.setDate(date.getDate() + 7),
        [Periods.Mensual]: (date) => date.setMonth(date.getMonth() + 1),
        [Periods.Anual]: (date) => date.setFullYear(date.getFullYear() + 1)
    }
    let { period, date } = expense
    increment[period](date)
    await helperInsert(expense, increment[period])
}

const helperInsert = async (expense, increment, endDate) =>
{
    let { amount, account, category, date, description, user, fixed, period, endOf, dateEndOf } = expense
    date = new Date(date)

    while (date <= endDate)
    {
        const exp = new Expensepense({
            date, amount, account, category,
            description, user, fixed,
            dateEndOf, period, original: false,
            originalExpenseRef: expense.id, endOf
        })
        await exp.save()
        increment(date)
    }
    return
}

module.exports = insertAutomaticFixedExpenses