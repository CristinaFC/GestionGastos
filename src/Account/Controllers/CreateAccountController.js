const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createAccount = require('../Services/CreateAccount')

const createAccountController = async (req, res) =>
{
    const { name, initAmount, date, icon, isSalary } = req.body
    const user = req.user

    const account = await createAccount(name, initAmount, date, user, icon, isSalary)

    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(createAccountController)