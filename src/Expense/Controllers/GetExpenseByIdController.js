const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getExpense } = require('../Services/GetExpenseById')

const getExpenseController = async (req, res) =>
{
    const { id } = req.params

    const expense = await getExpense(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(getExpenseController) 