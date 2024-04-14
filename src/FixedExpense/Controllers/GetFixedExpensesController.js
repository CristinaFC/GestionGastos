const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getFixedExpenses } = require('../Services/GetFixedExpenses')

const getFixedExpensesByUserController = async (req, res) =>
{
    const userId = req.user.id

    let expenses = await getFixedExpenses(userId)

    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}

module.exports = catchAsync(getFixedExpensesByUserController) 