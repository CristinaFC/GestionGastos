const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createFixedExpense = require('../Services/CreateFixedExpense')

const createFixedExpenseController = async (req, res, _, session) =>
{
    const user = req.user

    const fixedExpense = await createFixedExpense(user, req.body, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { fixedExpense },
    })
}

module.exports = catchAsync(createFixedExpenseController)