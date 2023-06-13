const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')


const getIncome = async (id) =>
{
    const income = await Income.findById(id).populate("category").populate("account")

    if (!income) throw new NotFoundException(`Income with the id ${id} not found`)

    return income
}


module.exports = { getIncome }