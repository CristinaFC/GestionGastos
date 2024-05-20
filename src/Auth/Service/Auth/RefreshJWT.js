const jwt = require('jsonwebtoken');
const User = require('../../Model/User');
const InvalidTokenException = require('../../../Core/Exceptions/InvalidTokenException');
const generateJWT = require('./GenerateJWT')
const refreshJWT = async (refreshToken) =>
{
    const { uid, isRefresh } = jwt.verify(refreshToken.replace('Bearer ', ''), process.env.SECRETEORPRIVATEKEY)

    if (!isRefresh) throw new InvalidTokenException('Invalid token')

    const user = await User.findById(uid)

    const [token, refresh] = await Promise.all([
        generateJWT(user.id),
        generateJWT(user.id, true),
    ])

    return { token, refreshToken: refresh }
}

module.exports = refreshJWT
