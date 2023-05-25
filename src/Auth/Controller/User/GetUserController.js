const { request, response } = require('express')
const { getUser } = require('../../Service/User/GetUser')
const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')

const getUserController = async (req = request, res = response) =>
{

    const id = req.user
    const user = await getUser(id)

    res.status(200).json({
        status: "SUCCESS",
        data: { user },
    });

};

module.exports = catchAsync(getUserController)