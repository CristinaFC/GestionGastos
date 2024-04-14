
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const FixedExpense = require('../Model/FixedExpense')

const getFixedExpenses = async (user) =>
{
    const fixedExpenses = await FixedExpense.find({ user }).populate('category').populate('account').sort({ date: -1 })
    console.log(user, fixedExpenses)

    if (!fixedExpenses) throw new NotFoundException(`Not fixedExpenses found`)

    return fixedExpenses
}


module.exports = { getFixedExpenses }