const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')


const getRecentIncomes = async (userId, limit = 4) =>
{
    const incomes = await Income.find({ user: userId }).sort({ $natural: -1 }).limit(limit).populate('category').populate('account')

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getRecentIncomes }