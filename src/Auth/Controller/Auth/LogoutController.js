const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')

const jwt = require('jsonwebtoken');


const logoutController = async (req, res) =>
{
    const authHeader = req.header('Authorization')

    jwt.sign(authHeader.replace('Bearer ', ''), "", { expiresIn: 1 }, (logout, err) =>
    {
        if (logout) { res.send({ msg: 'You have been Logged Out' }); }
        else { res.send({ msg: 'Error' }); }
    });

}

module.exports = catchAsync(logoutController)
