const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getFixedExpenseById } = require('../Services/GetFixedExpenseById')

const getFixedExpenseController = async (req, res) =>
{
    const { id } = req.params

    const expense = await getFixedExpenseById(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(getFixedExpenseController) 