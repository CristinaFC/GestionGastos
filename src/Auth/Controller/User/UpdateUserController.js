const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const updateUser = require('../../Service/User/UpdateUser')

const updateUserController = async (req, res) =>
{
    const { body } = req
    const id = req.user

    const user = await updateUser(id, body)
    res.status(200).json({
        status: "SUCCESS",
        data: { user },
    })
}

module.exports = catchAsync(updateUserController)
