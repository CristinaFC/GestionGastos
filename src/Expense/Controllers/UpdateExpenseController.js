const updateExpense = require('../Services/UpdateExpense')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateExpenseController = async (req, res, _, session) =>
{
    const { body, user } = req
    const { id } = req.params

    const expense = await updateExpense(id, body, user, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(updateExpenseController)
