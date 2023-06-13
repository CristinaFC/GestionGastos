const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')


const getIncomesByUser = async (userId) =>
{
    const incomes = await Income.find({ user: userId }).sort({ $natural: -1 }).populate("category").populate("account")
    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByUser }