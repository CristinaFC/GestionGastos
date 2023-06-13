const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')

const deleteIncome = async (incomeId) =>
{
    const income = await Income.findByIdAndDelete(incomeId)

    if (!income)
        throw new NotFoundException(`Incomewith the id ${incomeId} not found`)

    return income
}


module.exports = deleteIncome