const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const Expense = require('../Model/Expense');
const insertAutomaticFixedExpenses = require('./InsertFixedExpensesCopies');

const updateExpense = async (expenseId, body, user) =>
{
    let { amount, account, category, date, description } = body;

    const expense = await Expense.findByIdAndUpdate(
        expenseId,
        { date, amount, account, category, description },
        { new: true },
    )

    await updateAccountAmounts(account, user)
    await updateCategoryAmount(date, category, amount)
    return expense

}


module.exports = updateExpense