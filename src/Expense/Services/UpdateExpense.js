const Expense = require('../Model/Expense');

const updateExpense = async (expenseId, body) =>
{
    const { date, amount, account, category, description, fixed, group, user } = body;

    const expense = await Expense.findByIdAndUpdate(
        expenseId,
        { date, amount, account, category, description, fixed, group, user },
        { new: true },
    )
    return expense
}


module.exports = updateExpense