const jwt = require('jsonwebtoken');
const User = require('../../Model/User');
const InvalidRefreshTokenException = require('../../../Core/Exceptions/InvalidRefreshTokenException');

const refreshJWT = async (refreshToken) =>
{
    const { uid, isRefresh } = jwt.verify(
        refreshToken.replace('Bearer ', ''),
        process.env.SECRET_KEY,
    )

    if (!isRefresh) throw new InvalidRefreshTokenException('Invalid token')

    const user = await User.findById(uid)

    const [token, refresh] = await Promise.all([
        generateJWT(user.id),
        generateJWT(user.id, true),
    ])

    return { token, refreshToken: refresh }
}

module.exports = refreshJWT
