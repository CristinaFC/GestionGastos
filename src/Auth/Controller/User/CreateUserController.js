const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const createUser = require('../../Service/User/CreateUser')

const createUserController = async (req, res, _, session) =>
{

    const user = await createUser(req.body)
    res.status(200).json({
        status: "SUCCESS",
        data: { user },
    })
}

module.exports = catchAsync(createUserController)
