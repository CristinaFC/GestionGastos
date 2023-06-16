const Income = require('../Model/Income');

const updateIncome = async (incomeId, body) =>
{
    const { date, amount, account, category, description, user, fixed } = body;

    const income = await Income.findByIdAndUpdate(
        incomeId,
        { date, amount, account, category, description, user, fixed },
        { new: true },
    )
    return income
}


module.exports = updateIncome