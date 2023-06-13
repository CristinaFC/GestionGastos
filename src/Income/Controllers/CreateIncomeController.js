const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createIncome = require('../Services/CreateIncome')

const createIncomeController = async (req, res) =>
{
    const { date, amount, account, category, description } = req.body
    const user = req.user


    const income = await createIncome({ date, amount, account, category, description, user })

    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(createIncomeController)