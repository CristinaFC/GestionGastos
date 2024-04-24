const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createAccount = require('../Services/CreateAccount')

const createAccountController = async (req, res) =>
{
    const user = req.user

    const account = await createAccount(user, req.body)

    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(createAccountController)