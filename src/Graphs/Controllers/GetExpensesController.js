const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getExpensesByAccount } = require('../Services/Expenses/GetExpensesByAccount')
const { getExpensesByCategoriesAndDate } = require('../Services/Expenses/GetExpensesByCategoriesAndDate')
const { getExpensesByDatesComparation } = require('../Services/Expenses/GetExpensesByDatesComparation')
const { getExpensesByYear } = require('../Services/Expenses/GetExpensesByYear')


const getExpensesController = async (req, res) =>
{
    const { user } = req
    const { month, year, category, account, monthTwo, yearTwo } = req.query
    let expenses;

    if ('month' in req.query && 'monthTwo' in req.query && 'year' in req.query && 'yearTwo' in req.query)
        expenses = await getExpensesByDatesComparation(user, month, monthTwo, year, yearTwo)
    else if ('account' in req.query)
        expenses = await getExpensesByAccount(user, month, year, account)
    else if ('month' in req.query && 'year' in req.query)
        expenses = await getExpensesByCategoriesAndDate(user, month, year)
    else
        expenses = await getExpensesByYear(user, year, category)


    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}
module.exports = catchAsync(getExpensesController) 