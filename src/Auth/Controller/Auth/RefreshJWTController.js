const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const refreshJWT = require('../../Service/Auth/RefreshJWT')

const refreshJWTController = async (req, res, _, session) =>
{
    const { refreshToken } = req.body

    const token = await refreshJWT(refreshToken)
    res.status(200).json({
        status: "SUCCESS",
        data: token,
    })
}

module.exports = catchAsync(refreshJWTController)