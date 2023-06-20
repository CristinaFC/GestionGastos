const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const Expense = require('../Model/Expense');

const updateExpense = async (expenseId, body, user) =>
{
    const { date, amount, account, category, description, fixed, group } = body;


    const expense = await Expense.findByIdAndUpdate(
        expenseId,
        { date, amount, account, category, description, fixed, group, user },
        { new: true },
    )

    await updateAccountAmounts(account, user)
    return expense
}


module.exports = updateExpense