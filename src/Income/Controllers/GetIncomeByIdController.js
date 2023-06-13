const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getIncome } = require('../Services/GetIncomeById')

const getIncomeController = async (req, res) =>
{
    const { id } = req.params

    const income = await getIncome(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(getIncomeController) 