const updateExpense = require('../Services/UpdateExpense')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateExpenseController = async (req, res) =>
{
    const { body } = req
    const { id } = req.params

    const expense = await updateExpense(id, body)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(updateExpenseController)
