const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../Model/Expense')
var mongoose = require('mongoose');


const getExpensesByCategoryAndDate = async (userId, category, month, year) =>
{
    let expenses


    let copy = new mongoose.Types.ObjectId(category)
    expenses = await Expense.find({
        user: userId,
        category: copy,
        $expr: {
            $and: [
                { $eq: [{ $year: '$date' }, parseInt(year)] },
                { $eq: [{ $month: '$date' }, parseInt(month)] }
            ]
        }
    }).sort({ $natural: -1 })
        .populate("category").populate("account")


    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByCategoryAndDate }