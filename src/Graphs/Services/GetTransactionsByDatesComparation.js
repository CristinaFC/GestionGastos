const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const { ObjectId } = require('mongodb');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');

const getTransactionsByDatesComparation = async (user, month, monthTwo, year, yearTwo, model) =>
{

    const transactionsOne = await getTransactions(user, month, year, model);
    const transactionsTwo = await getTransactions(user, monthTwo, yearTwo, model);

    const transactions = {
        dataOne: transactionsOne,
        dataTwo: transactionsTwo
    };

    if (!transactions) throw new NotFoundException(`Not ${model} found`)

    return transactions
}

async function getTransactions(user, month, year, model)
{
    const Model = model === "Expense" ? Expense : Income
    return await Model.aggregate([
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


module.exports = { getTransactionsByDatesComparation }