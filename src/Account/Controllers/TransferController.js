const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const transfer = require('../Services/Transfer')

const transferController = async (req, res, _, session) =>
{
    const user = req.user

    await transfer(user, req.body, session)

    res.status(200).json({
        status: "SUCCESS",
    })
}

module.exports = catchAsync(transferController)