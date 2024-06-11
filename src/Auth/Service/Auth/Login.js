const User = require('../../Model/User')
const generateJWT = require('./GenerateJWT')

const bcrypt = require('bcrypt')

const InvalidEmailOrPasswordException = require('../../../Core/Exceptions/InvalidEmailOrPasswordException')
const NotFoundException = require('../../../Core/Exceptions/NotFoundException')

const login = async (email, password) =>
{
    const user = await User.findOne({ email })
    if (!user) throw new NotFoundException(`User not found`)

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) throw new InvalidEmailOrPasswordException(`The username or password is not correct`)

    const token = await generateJWT(user)

    user.password = undefined
    user.__v = undefined

    return { user, token }
}

module.exports = login
