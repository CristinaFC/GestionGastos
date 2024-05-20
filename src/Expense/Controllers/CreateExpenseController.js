const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createExpense = require('../Services/CreateExpense')

const createExpenseController = async (req, res, _, session) =>
{
    const user = req.user

    const { expense, limitInfo } = await createExpense(user, req.body, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
        limitInfo
    })
}

module.exports = catchAsync(createExpenseController)