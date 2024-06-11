const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const Category = require('../../Category/Model/Category')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')

const deleteExpense = async (expenseId, session) =>
{
    const expense = await Expense.findById(expenseId).session(session)
    const category = await Category.findById(expense.category)
    const expDate = new Date(expense.date)

    const index = category?.monthlyExpenses.findIndex(monthlyExpense => monthlyExpense.month === expDate.getMonth() + 1 && monthlyExpense.year === expDate.getFullYear())

    if (index !== -1) category.monthlyExpenses[index].total -= expense.amount

    await category.save({ session })

    if (!expense) throw new NotFoundException(`Expense with the id ${expenseId} not found`)

    await Expense.deleteOne(expense).session(session)
    await updateAccountAmounts(expense.account, expense.user, session)
    return expense
}


module.exports = deleteExpense