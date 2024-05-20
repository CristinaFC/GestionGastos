const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../Model/Expense');
const { ObjectId } = require('mongodb');

const getExpensesGroupedByCategories = async (userId, year) =>
{
    const expenses = await Expense.aggregate([
        {
            $match: {
                date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) },
            },
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


    if (!expenses) throw new NotFoundException(`No expenses found for the year ${year}`);

    return expenses;

};

module.exports = { getExpensesGroupedByCategories };
