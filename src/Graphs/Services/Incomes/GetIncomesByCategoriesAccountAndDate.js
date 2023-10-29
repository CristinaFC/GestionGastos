const NotFoundException = require('../../../Core/Exceptions/NotFoundException');
const { ObjectId } = require('mongodb');
const Income = require('../../../Income/Model/Income');

const getIncomesByAccount = async (user, month, year, account) =>
{

    const incomes = await Income.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, parseInt(year)] },
                        { $eq: [{ $month: '$date' }, parseInt(month)] }
                    ]
                }
            }
        },
        {
            $lookup: {
                from: 'accounts',
                localField: 'account',
                foreignField: '_id',
                as: 'accountData'
            }
        },

        {
            $unwind: '$accountData',
        },
        {
            $match: {
                'accountData.name': account,
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryData'
            }
        },
        {
            $unwind: '$categoryData',
        },
        {
            $group: {
                _id: '$categoryData.name',
                total: { $sum: '$amount' }
            },
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                total: 1
            }
        }
    ])

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByAccount }