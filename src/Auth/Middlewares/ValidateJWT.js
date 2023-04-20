const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../Model/User');
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync');


const validateJWT = async (req, res = response, next) =>
{
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const { uid, isRefresh } = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETEORPRIVATEKEY);

    if (isRefresh) return res.status(401).json({ message: 'Provided token is not valid' })

    const user = await User.findById(uid.uid);

    if (!user) return res.status(401).json({ msg: 'Token no válido - usuario no existe en la bd' });

    req.user = user;

    next();
}


module.exports = catchAsync(validateJWT)
