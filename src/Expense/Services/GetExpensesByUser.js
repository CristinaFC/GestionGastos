const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')


const getExpensesByUser = async (userId) =>
{
    const expenses = await Expense.find({ user: userId }).sort({ $natural: -1 }).populate("category").populate("account")
    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByUser }