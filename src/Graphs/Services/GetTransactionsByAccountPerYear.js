const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');
const { ObjectId } = require('mongodb');

const getTransactionsByAccountPerYear = async (user, year, account, model) =>
{
    const Model = model === "Expense" ? Expense : Income
    const data = await Model.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, parseInt(year)] },
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

    if (!data) throw new NotFoundException(`Not ${model} found`)

    return data
}


module.exports = { getTransactionsByAccountPerYear }