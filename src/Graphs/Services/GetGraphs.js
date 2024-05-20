const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');

const { ObjectId } = require('mongodb');

const getGraphs = async (user) =>
{
    const expenses = await Expense.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                date: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                    $lt: new Date(new Date().getFullYear() + 1, 0, 1)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                total: 1
            }
        }
    ])

    const lastYearExpenses = await Expense.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $eq: [{ $year: "$date" }, new Date().getFullYear() - 1]
                }
            }
        },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                total: 1
            }
        }
    ])

    const incomes = await Income.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                date: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                    $lt: new Date(new Date().getFullYear() + 1, 0, 1)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$date" },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                total: 1
            }
        }
    ])

    if (!expenses) throw new NotFoundException(`Not expenses found`)
    if (!incomes) throw new NotFoundException(`Not incomes found`)
    if (!lastYearExpenses) throw new NotFoundException(`Not lastYearExpenses found`)

    return { expenses, incomes, lastYearExpenses }
}


module.exports = { getGraphs }