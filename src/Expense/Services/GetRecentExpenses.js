const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')


const getRecentExpenses = async (userId, limit = 4) =>
{
    const expenses = await Expense.find({ user: userId })
        .sort({ $natural: -1 })
        .limit(limit)
        .populate('category')
        .populate('account')

    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getRecentExpenses }