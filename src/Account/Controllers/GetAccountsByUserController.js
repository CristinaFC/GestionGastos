const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getAccountsByUser } = require('../Services/GetAccountsByUser')


const getAccountsByUserController = async (req, res,) =>
{
    const userId = req.user.id
    const accounts = await getAccountsByUser(userId)
    res.status(200).json({
        status: "SUCCESS",
        data: { accounts },
    })
}

module.exports = catchAsync(getAccountsByUserController) 