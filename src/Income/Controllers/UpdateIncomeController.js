const updateIncome = require('../Services/UpdateIncome')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateIncomeController = async (req, res, _, session) =>
{
    const { body, user } = req
    const { id } = req.params

    const income = await updateIncome(id, body, user, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(updateIncomeController)
