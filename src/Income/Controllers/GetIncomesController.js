const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getIncomes } = require('../Services/GetIncomes')
const { getIncomesByCategoryAndDate } = require('../Services/GetIncomesByCategoryAndDate')
const { getRecentIncomes } = require('../Services/GetRecentIncomes')
const { getIncomesByAccount } = require('../Services/GetIncomesByAccount')
const { getIncomesGroupedByCategories } = require('../Services/GetIncomesGroupedByCategories')

const getIncomesController = async (req, res) =>
{
    const userId = req.user.id

    const { limit, account, month, year, category } = req.query

    let incomes;

    if ('recents' in req.query)
        incomes = await getRecentIncomes(userId, limit)
    else if ('category' in req.query && 'month' in req.query && 'year' in req.query)
        incomes = await getIncomesByCategoryAndDate(userId, category, month, year)
    else if ('month' in req.query && 'year' in req.query)
        incomes = await getIncomes(userId, month, year)
    else if ('account' in req.query)
        incomes = await getIncomesByAccount(userId, account)
    else if ('year' in req.query)
        incomes = await getIncomesGroupedByCategories(userId, year)

    res.status(200).json({
        status: "SUCCESS",
        data: { incomes },
    })
}

module.exports = catchAsync(getIncomesController) 