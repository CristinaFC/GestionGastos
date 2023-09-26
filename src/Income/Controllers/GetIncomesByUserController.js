const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getIncomesByUser } = require('../Services/GetIncomesByUser')
const { getRecentIncomes } = require('../Services/GetRecentIncomes')


const getIncomesByUserController = async (req, res) =>
{
    const userId = req.user.id

    const { recents, limit, account } = req.query

    let incomes;
    if (recents)
        incomes = await getRecentIncomes(userId, limit)
    else
        incomes = await getIncomesByUser(userId, account)

    res.status(200).json({
        status: "SUCCESS",
        data: { incomes },
    })
}

module.exports = catchAsync(getIncomesByUserController) 