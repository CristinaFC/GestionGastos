const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')
const { ObjectId } = require('mongodb');

const getExpensesByAccount = async (userId, account) =>
{
    let expenses = await Expense.find({ user: userId, account: new ObjectId(account) })
        .sort({ $natural: -1 })
        .populate("category").populate("account")

    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}

module.exports = { getExpensesByAccount }