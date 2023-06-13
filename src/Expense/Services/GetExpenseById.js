const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')


const getExpense = async (id) =>
{
    const expense = await Expense.findById(id).populate("category").populate("account")

    if (!expense) throw new NotFoundException(`Expense with the id ${id} not found`)

    return expense
}


module.exports = { getExpense }