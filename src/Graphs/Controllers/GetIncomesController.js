const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getTransactionsByAccountPerMonth } = require('../Services/GetTransactionsByAccountPerMonth')
const { getTransactionsByAccountPerYear } = require('../Services/GetTransactionsByAccountPerYear')
const { getTransactionsByCategoriesAndDate } = require('../Services/GetTransactionsByCategoriesAndDate')
const { getTransactionsByDatesComparation } = require('../Services/GetTransactionsByDatesComparation')
const { getTransactionsByYear } = require('../Services/GetTransactionsByYear')

const getIncomesController = async (req, res) =>
{
    const { user } = req
    const { month, year, category, account, monthTwo, yearTwo } = req.query
    let incomes;

    if ('month' in req.query && 'monthTwo' in req.query && 'year' in req.query && 'yearTwo' in req.query)
        incomes = await getTransactionsByDatesComparation(user, month, monthTwo, year, yearTwo, "Income")
    else if ('account' in req.query && 'year' in req.query)
        incomes = await getTransactionsByAccountPerYear(user, year, account, "Income")
    else if ('month' in req.query && 'year' in req.query)
        incomes = await getTransactionsByCategoriesAndDate(user, month, year, "Income")
    else if ('account' in req.query && 'month' in req.query && 'year' in req.query)
        incomes = await getTransactionsByAccountPerMonth(user, month, year, account, "Income")
    else incomes = await getTransactionsByYear(user, year, category, "Income")


    res.status(200).json({
        status: "SUCCESS",
        data: { incomes },
    })
}



module.exports = catchAsync(getIncomesController) 