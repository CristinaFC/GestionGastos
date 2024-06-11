const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Income = require('../Model/Income');

const getIncomesGroupedByCategories = async (userId, year) =>
{
    const incomes = await Income.aggregate([
        {
            $match: {
                date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) },
            },
        },
        {
            $lookup: {
                from: "accounts",
                localField: "account",
                foreignField: "_id",
                as: "accountInfo"
            }
        },
        {
            $match: {
                "accountInfo.isBalance": true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'categoryInfo',
            },
        },
        {
            $unwind: '$categoryInfo',
        },
        {
            $group: {
                _id: {
                    category: '$categoryInfo.name',
                    month: { $month: '$date' },
                },
                totalAmount: { $sum: '$amount' },
            },
        },
        {
            $group: {
                _id: '$_id.category',
                months: {
                    $push: {
                        month: '$_id.month',
                        total: '$totalAmount',
                    },
                },
            },
        },
    ]);


    if (!incomes)
        throw new NotFoundException(`Not incomes found for the year ${year}`);

    return incomes;

};

module.exports = { getIncomesGroupedByCategories };
