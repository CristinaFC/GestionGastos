const NotFoundException = require('../../../Core/Exceptions/NotFoundException')
const User = require('../../Model/User')

const getUser = async (id) =>
{
    const user = await User.findById(id)

    if (!user) throw new NotFoundException(`User with the id ${id} not found`)

    return user
}


module.exports = { getUser }