const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const login = require('../../Service/Auth/Login')

const loginController = async (req, res, _, session) =>
{
    const { email, password } = req.body

    const loginResponse = await login(email, password)

    res.status(200).json({
        status: "SUCCESS",
        data: loginResponse,
    })
}

module.exports = catchAsync(loginController)
