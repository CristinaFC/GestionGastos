const NotFoundException = require('../../../Core/Exceptions/NotFoundException');
const { ObjectId } = require('mongodb');
const Expense = require('../../../Expense/Model/Expense');

const getExpensesByDatesComparation = async (user, month, monthTwo, year, yearTwo) =>
{

    const expensesOne = await getExpenses(user, month, year);
    const expensesTwo = await getExpenses(user, monthTwo, yearTwo);

    const expenses = {
        dataOne: expensesOne,
        dataTwo: expensesTwo
    };

    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}

async function getExpenses(user, month, year)
{

    return await Expense.aggregate([
        {
            $lookup: {
                from: 'accounts',
                localField: 'account',
                foreignField: '_id',
                as: 'accountData'
            }
        },
        {
            $match: {
                'accountData.isBalance': true,
                'accountData.user': new ObjectId(user),
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
    ]);
}


module.exports = { getExpensesByDatesComparation }