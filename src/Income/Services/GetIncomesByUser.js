const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')
const { ObjectId } = require('mongodb');

const getIncomesByUser = async (userId, account) =>
{
    let incomes;

    if (account)
        incomes = await Income.find({ user: userId, account: new ObjectId(account) })
            .sort({ $natural: -1 })
            .populate("category").populate("account")
    else incomes = await Income.find({ user: userId }).sort({ $natural: -1 }).populate("category").populate("account")

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByUser }