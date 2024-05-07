const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../Model/Income')
const { ObjectId } = require('mongodb');

const getIncomes = async (userId, month, year) =>
{
    const incomes = await Income.find({
        user: new ObjectId(userId),
        $expr: {
            $and: [
                { $eq: [{ $year: '$date' }, parseInt(year)] },
                { $eq: [{ $month: '$date' }, parseInt(month)] }
            ]
        }
    }).populate("category").populate('account')

    if (!incomes) throw new NotFoundException(`Not expenses found`)

    return incomes
}


module.exports = { getIncomes }