const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', isRefresh) =>
{
    const options = isRefresh ? { expiresIn: '24h' } : { expiresIn: '4h' }

    return new Promise((resolve, reject) =>
    {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETEORPRIVATEKEY, options, (err, token) =>
        {
            if (err) reject('Can not generate token');
            else resolve(token);

        })
    })
}

module.exports = generateJWT