const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getIncomesByCategoriesAccountAndDate } = require('../Services/GetIncomesByCategoriesAccountAndDate')
const { getIncomesByCategoriesAndDate } = require('../Services/GetIncomesByCategoriesAndDate')

const getIncomesByCategoriesAndDateController = async (req, res) =>
{
    const { account } = req.query
    const { user } = req

    let incomes;

    if (account)
        incomes = await getIncomesByCategoriesAccountAndDate(user)

    else incomes = await getIncomesByCategoriesAndDate(user)

    res.status(200).json({
        status: "SUCCESS",
        data: { incomes },
    })
}

module.exports = catchAsync(getIncomesByCategoriesAndDateController) 