const NotFoundException = require('../../../Core/Exceptions/NotFoundException');
const Income = require('../../../Income/Model/Income');

const { ObjectId } = require('mongodb');

const getIncomesByCategoriesAndDate = async (user, month, year) =>
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
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryData'
            }
        },

        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: '%m %Y',
                            date: '$date'
                        }
                    },
                    category: { $arrayElemAt: ['$categoryData.name', 0] }
                },
                total: { $sum: '$amount' }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id.category",
                total: 1
            }
        }
    ])

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByCategoriesAndDate }