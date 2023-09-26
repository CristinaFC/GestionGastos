const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getExpensesByCategoriesAndDate } = require('../Services/GetExpensesByCategoriesAndDate')

const getExpensesController = async (req, res) =>
{
    // const { account } = req.query
    const { user } = req

    let expenses;

    // if (account)
    //     expenses = await get(user)

    // else 
    expenses = await getExpensesByCategoriesAndDate(user)

    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}
module.exports = catchAsync(getExpensesController) 