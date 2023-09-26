const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const getBalanceByUser = require('../Services/GetBalanceByUser')


const getBalanceController = async (req, res) =>
{
    const userId = req.user.id

    const balance = await getBalanceByUser(userId)

    res.status(200).json({
        status: "SUCCESS",
        data: { balance },
    })
}

module.exports = catchAsync(getBalanceController) 