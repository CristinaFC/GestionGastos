const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')
const { ObjectId } = require('mongodb');

const getExpensesByDate = async (userId, month, year) =>
{

    const expenses = await Expense.find({
        user: new ObjectId(userId),
        $expr: {
            $and: [
                { $eq: [{ $year: '$date' }, parseInt(year)] },
                { $eq: [{ $month: '$date' }, parseInt(month)] }
            ]
        }
    }).populate("category").populate('account').populate('fixedExpenseRef')

    const prevMonthExpenses = await Expense.find({
        user: new ObjectId(userId),
        $expr: {
            $and: [
                { $eq: [{ $year: '$date' }, parseInt(year)] },
                { $eq: [{ $month: '$date' }, parseInt(month - 1)] }
            ]
        }
    }).populate("category").populate('account').populate('fixedExpenseRef')

    if (!expenses) throw new NotFoundException(`Not expenses found`)


    return { expenses, prevMonthExpenses }
}


module.exports = { getExpensesByDate }