const catchAsync = require('../../../Core/Exceptions/Utils/CatchAsync')
const jwt = require('jsonwebtoken');
const Blacklist = require('../../Model/Blacklist')


const logoutController = async (req, res, _, session) =>
{
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.decode(token);

    const blacklist = new Blacklist({
        token: token,
        expiresAt: new Date(decoded.exp * 1000),
    });

    await blacklist.save();

    res.status(200).send({ msg: 'You have been logged out' });

}

module.exports = catchAsync(logoutController)
