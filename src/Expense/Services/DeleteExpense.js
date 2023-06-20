const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')

const deleteExpense = async (expenseId) =>
{
    const expense = await Expense.findByIdAndDelete(expenseId)

    if (!expense)
        throw new NotFoundException(`Expense with the id ${expenseId} not found`)

    await updateAccountAmounts(expense.account, expense.user)
    return expense
}


module.exports = deleteExpense