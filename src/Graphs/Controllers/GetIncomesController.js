const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getIncomesByAccount } = require('../Services/Incomes/GetIncomesByCategoriesAccountAndDate')
const { getIncomesByCategoriesAndDate } = require('../Services/Incomes/GetIncomesByCategoriesAndDate')

const getIncomesByCategoriesAndDateController = async (req, res) =>
{
    const { account, month, year } = req.query

    const { user } = req

    let incomes;
    if ('account' in req.query)
        incomes = await getIncomesByAccount(user, month, year, account)
    else incomes = await getIncomesByCategoriesAndDate(user, month, year)

    res.status(200).json({
        status: "SUCCESS",
        data: { incomes },
    })
}

module.exports = catchAsync(getIncomesByCategoriesAndDateController) 