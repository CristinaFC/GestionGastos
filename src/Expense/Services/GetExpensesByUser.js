const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')
var mongoose = require('mongoose');

const getExpensesByUser = async (userId, category) =>
{
    let expenses

    if (category)
    {
        let copy = new mongoose.Types.ObjectId(category)
        expenses = await Expense.find({ user: userId, category: copy }).sort({ $natural: -1 })
            .populate("category").populate("account")
    } else
    {
        expenses = await Expense.find({ user: userId }).sort({ $natural: -1 })
            .populate("category").populate("account")
    }
    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByUser }