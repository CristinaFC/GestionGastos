const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const Expense = require('../Model/Expense');
const insertAutomaticFixedExpenses = require('./InsertFixedExpensesCopies');


//NO SE USA
const updateExpense = async (expenseId, body, user, session) =>
{
    let { amount, account, category, date, description } = body;

    const expense = await Expense.findByIdAndUpdate(
        expenseId,
        { date, amount, account, category, description },
        { new: true },
    ).session(session)

    await updateAccountAmounts(account, user, session)
    await updateCategoryAmount(date, category, amount)
    return expense

}


module.exports = updateExpense