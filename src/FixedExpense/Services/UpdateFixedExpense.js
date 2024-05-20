const FixedExpense = require('../Model/FixedExpense');

const updateFixedExpense = async (expenseId, body) =>
{
    let { initDate, amount, account, category, concept, period, hasEndDate, endDate, status } = body;

    const fixedExpense = await FixedExpense.findByIdAndUpdate(
        expenseId,
        {
            initDate,
            nextInsertion: initDate, status,
            amount, account, category, concept, period, hasEndDate, endDate
        },
        { new: true },
    )

    return fixedExpense

}


module.exports = updateFixedExpense