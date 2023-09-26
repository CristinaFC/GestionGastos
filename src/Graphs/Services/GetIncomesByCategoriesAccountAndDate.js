const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../../Income/Model/Income')

const { ObjectId } = require('mongodb');


const getIncomesByCategoriesAccountAndDate = async (user) =>
{
    let incomes

    incomes = await Income.aggregate([
        {
            $match: { user: new ObjectId(user) }
        },
        {
            $group: {
                _id: {
                    category: "$category",
                    account: "$account"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id.category",
                account: "$_id.account",
                total: 1
            }
        }
    ]);

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByCategoriesAccountAndDate }