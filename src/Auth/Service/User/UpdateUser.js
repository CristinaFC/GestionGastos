const NotFoundException = require('../../../Core/Exceptions/NotFoundException');
const User = require('../../Model/User')

const updateUser = async (userId, body) =>
{

    const { name, lastName, email } = body;

    const user = await User.findByIdAndUpdate(
        userId,
        { name, lastName, email },
        { new: true },
    )

    if (!user)
        throw new NotFoundException(`User with the id ${userId} not found`)

    return user
}


module.exports = updateUser