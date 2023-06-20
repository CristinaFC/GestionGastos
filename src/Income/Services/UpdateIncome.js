const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const Income = require('../Model/Income');

const updateIncome = async (incomeId, body, user) =>
{
    const { date, amount, account, category, description, fixed } = body;
    const income = await Income.findByIdAndUpdate(
        incomeId,
        { date, amount, account, category, description, user, fixed },
        { new: true },
    )

    await updateAccountAmounts(account, user)

    return income
}


module.exports = updateIncome