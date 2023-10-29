const User = require('../../Auth/Model/User');
const Balance = require('../../Balance/Model/Balance');
const NotFoundException = require('../../Core/Exceptions/NotFoundException')


const getBalanceByUser = async (id) =>
{

    const user = await User.findById(id)

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    const balance = await Balance.find({ user: id })

    if (!balance) throw new NotFoundException(`Balance for user with id ${id} not found`)

    return balance
}


module.exports = getBalanceByUser