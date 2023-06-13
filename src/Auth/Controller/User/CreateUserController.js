const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const createUser = require('../../Service/User/CreateUser')

const createUserController = async (req, res) =>
{
    const { name, lastName, email, password } = req.body


    const user = await createUser(name, lastName, email, password)
    res.status(200).json({
        status: "SUCCESS",
        data: { user },
    })
}

module.exports = catchAsync(createUserController)