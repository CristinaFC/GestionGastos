const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


const getExpensesByUser = async (userId, category, account) =>
{
    let expenses

    if (category)
    {
        let copy = new mongoose.Types.ObjectId(category)
        expenses = await Expense.find({ user: userId, category: copy })
            .sort({ $natural: -1 })
            .populate("category").populate("account")

    } else if (account)

        expenses = await Expense.find({ user: userId, account: new ObjectId(account) })
            .sort({ $natural: -1 })
            .populate("category").populate("account")

    else expenses = await Expense.find({ user: userId })
        .sort({ $natural: -1 })
        .populate("category").populate("account")


    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByUser }