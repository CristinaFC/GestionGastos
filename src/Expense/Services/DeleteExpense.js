const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')

const deleteExpense = async (expenseId, session) =>
{
    const expense = await Expense.findOneAndDelete({ _id: expenseId }).session(session)

    if (!expense) throw new NotFoundException(`Expense with the id ${expenseId} not found`)

    await updateAccountAmounts(expense.account, expense.user, session)
    return expense
}


module.exports = deleteExpense