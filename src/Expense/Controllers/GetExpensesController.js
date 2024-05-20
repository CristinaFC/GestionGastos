const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getExpensesByCategoryAndDate } = require('../Services/GetExpensesByCategoryAndDate')
const { getRecentExpenses } = require('../Services/GetRecentExpenses')
const { getExpensesByDate } = require('../Services/GetExpensesByDate')
const { getExpensesByAccount } = require('../Services/GetExpensesByAccount')
const { getExpensesGroupedByCategories } = require('../Services/GetExpensesGroupedByCategories')


const getExpensesByUserController = async (req, res) =>
{
    const userId = req.user.id
    const { recents, limit, category, account, month, year } = req.query

    let expenses;
    if ('recents' in req.query)
        expenses = await getRecentExpenses(userId, limit)
    else if ('category' in req.query && 'month' in req.query && 'year' in req.query)
        expenses = await getExpensesByCategoryAndDate(userId, category, month, year)
    else if ('month' in req.query && 'year' in req.query)
        expenses = (await getExpensesByDate(userId, month, year))
    else if ('account' in req.query)
        expenses = await getExpensesByAccount(userId, account)
    else if ('year' in req.query)
        expenses = await getExpensesGroupedByCategories(userId, year)

    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}

module.exports = catchAsync(getExpensesByUserController) 