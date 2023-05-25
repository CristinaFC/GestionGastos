const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const logout = require('../../Service/Auth/Logout')
const { request } = require('express')


const logoutController = async (req, res) =>
{
    const token = req.header('Authorization')


    if (token)
    {

        delete req.headers['authorization']

        res.status(200).json({
            status: "SUCCESS",
        })
    }

    if (!token) res.status(404).json({ status: "FAIL", data: "Not auth user" })
}

module.exports = catchAsync(logoutController)
