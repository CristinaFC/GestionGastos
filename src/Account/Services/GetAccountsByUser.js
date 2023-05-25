const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account')


const getAccountsByUser = async (userId) =>
{
    const accounts = await Account.find({ user: userId }).sort({ name: 1 })

    if (!accounts) throw new NotFoundException(`Not accounts found`)

    return accounts
}


module.exports = { getAccountsByUser }