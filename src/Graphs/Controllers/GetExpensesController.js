const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getTransactionsByAccountPerMonth } = require('../Services/GetTransactionsByAccountPerMonth')
const { getTransactionsByAccountPerYear } = require('../Services/GetTransactionsByAccountPerYear')
const { getTransactionsByCategoriesAndDate } = require('../Services/GetTransactionsByCategoriesAndDate')
const { getTransactionsByDatesComparation } = require('../Services/GetTransactionsByDatesComparation')
const { getTransactionsByYear } = require('../Services/GetTransactionsByYear')


const getExpensesController = async (req, res, _, session) =>
{
    const { user } = req
    const { month, year, category, account, monthTwo, yearTwo } = req.query
    let expenses;

    if ('month' in req.query && 'monthTwo' in req.query && 'year' in req.query && 'yearTwo' in req.query)
        expenses = await getTransactionsByDatesComparation(user, month, monthTwo, year, yearTwo, "Expense")
    else if ('account' in req.query && 'year' in req.query)
        expenses = await getTransactionsByAccountPerYear(user, year, account, "Expense")
    else if ('month' in req.query && 'year' in req.query)
        expenses = await getTransactionsByCategoriesAndDate(user, month, year, "Expense")
    else if ('account' in req.query && 'month' in req.query && 'year' in req.query)
        expenses = await getTransactionsByAccountPerMonth(user, month, year, account, "Expense")
    else expenses = await getTransactionsByYear(user, year, category, "Expense")


    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}
module.exports = catchAsync(getExpensesController) 