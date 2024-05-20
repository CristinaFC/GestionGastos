const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const FixedExpense = require('../Model/FixedExpense')


const getFixedExpenseById = async (id) =>
{
    const fixedExpense = await FixedExpense.findById(id).populate("category").populate("account")

    if (!fixedExpense) throw new NotFoundException(`fixedExpense with the id ${id} not found`)

    return fixedExpense
}


module.exports = { getFixedExpenseById }
