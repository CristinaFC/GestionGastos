const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')
var mongoose = require('mongoose');


const getIncomesByCategoryAndDate = async (userId, category, month, year) =>
{
    let copy = new mongoose.Types.ObjectId(category)

    let incomes = await Income.find({
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


    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByCategoryAndDate }