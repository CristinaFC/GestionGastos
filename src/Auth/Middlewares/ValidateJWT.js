const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../Model/User');
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync');
const InvalidRefreshTokenException = require('../../Core/Exceptions/InvalidTokenException');
const Blacklist = require('../Model/Blacklist');

const validateJWT = async (req, res = response, next) =>
{
    let token = req.header('Authorization');

    const decoded = jwt.decode(token.replace('Bearer ', ''));

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded == null || decoded.exp < currentTime) throw new InvalidRefreshTokenException(`Token expired`)

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const blacklist = await Blacklist.findOne({ token: token });

    if (blacklist) return res.status(401).json({ message: 'Token has been revoked' });

    const { uid, isRefresh } = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETEORPRIVATEKEY);

    if (isRefresh) return res.status(401).json({ message: 'Provided token is not valid' })

    const user = await User.findById(uid.uid);

    if (!user) return res.status(401).json({ msg: 'Token no válido - usuario no existe en la bd' });

    req.user = user;
    next();
}


module.exports = catchAsync(validateJWT)
