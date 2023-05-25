const updateAccount = require('../Services/UpdateAccount')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateAccountController = async (req, res) =>
{
    const { body } = req
    const { id } = req.params

    const account = await updateAccount(id, body)
    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(updateAccountController)
