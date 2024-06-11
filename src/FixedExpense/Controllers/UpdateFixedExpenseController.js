const updateFixedExpense = require('../Services/UpdateFixedExpense')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateFixedExpenseController = async (req, res, _, session) =>
{
    const { body, user } = req
    const { id } = req.params

    const expense = await updateFixedExpense(id, body, user, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(updateFixedExpenseController)
