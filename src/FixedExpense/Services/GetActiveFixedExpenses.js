
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const FixedExpense = require('../Model/FixedExpense')

const getFixedExpenses = async () =>
{
    const fixedExpenses = await FixedExpense.find({ active: true })

    if (!fixedExpenses) throw new NotFoundException(`Not fixedExpenses found`)

    return fixedExpenses
}


module.exports = { getFixedExpenses }