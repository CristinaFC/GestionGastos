const updateAccount = require('../Services/UpdateAccount')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateAccountController = async (req, res, _, session) =>
{
    const { body, user } = req
    const { id } = req.params

    const account = await updateAccount(id, body, user, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(updateAccountController)
