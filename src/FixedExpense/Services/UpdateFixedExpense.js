const createExpense = require('../../Expense/Services/CreateExpense');
const { calculateNextInsertion } = require('../Helpers/Helpers');
const FixedExpense = require('../Model/FixedExpense');

const updateFixedExpense = async (expenseId, body, user, session) =>
{
    let { initDate, amount, account, category, concept, period, hasEndDate, endDate, status } = body;

    const fixedExpense = await FixedExpense.findByIdAndUpdate(
        expenseId,
        {
            initDate,
            nextInsertion: initDate, status,
            amount, account, category, concept, period, hasEndDate, endDate
        },
        { new: true },
    )
    let date = new Date(initDate)
    date.setHours(0, 0, 0, 0);

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);

    if (date.getTime() == currentDate.getTime())
    {
        await createExpense(user, {
            date, amount, account,
            category, concept,
            fixedExpenseRef: fixedExpense.id
        }, session)

        const nextInsertion = calculateNextInsertion(period, date)
        fixedExpense.nextInsertion = nextInsertion
        fixedExpense.lastInsertion = initDate

    } else fixedExpense.nextInsertion = initDate
    await fixedExpense.save()

    return fixedExpense

}


module.exports = updateFixedExpense