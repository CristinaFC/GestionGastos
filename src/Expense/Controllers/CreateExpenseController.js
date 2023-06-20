const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createExpense = require('../Services/CreateExpense')

const createExpenseController = async (req, res) =>
{
    const { date, amount, account, category, description, group, fixed } = req.body
    const user = req.user


    const expense = await createExpense({ date, amount, account, category, description, group, user, fixed })

    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(createExpenseController)