const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getExpensesByUser } = require('../Services/GetExpensesByUser')
const { getRecentExpenses } = require('../Services/GetRecentExpenses')


const getExpensesByUserController = async (req, res) =>
{
    const userId = req.user.id
    const { recents, limit, category, account } = req.query

    let expenses;
    if (recents)
        expenses = await getRecentExpenses(userId, limit)
    else
        expenses = await getExpensesByUser(userId, category, account)

    res.status(200).json({
        status: "SUCCESS",
        data: { expenses },
    })
}

module.exports = catchAsync(getExpensesByUserController) 