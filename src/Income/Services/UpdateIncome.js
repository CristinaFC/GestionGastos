const Income = require('../Model/Income');

const updateIncome = async (incomeId, body) =>
{
    const { date, amount, account, category, description, user } = body;

    const income = await Income.findByIdAndUpdate(
        incomeId,
        { date, amount, account, category, description, user },
        { new: true },
    )
    return income
}


module.exports = updateIncome