const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createIncome = require('../Services/CreateIncome')

const createIncomeController = async (req, res, _, session) =>
{
    const user = req.user

    const income = await createIncome(user, req.body, session)

    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(createIncomeController)