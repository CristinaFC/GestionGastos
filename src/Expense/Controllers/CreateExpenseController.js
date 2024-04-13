const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createExpense = require('../Services/CreateExpense')

const createExpenseController = async (req, res) =>
{
    const user = req.user

    const expense = await createExpense(user, req.body)

    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(createExpenseController)