const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account')


const getAccount = async (id) =>
{
    const account = await Account.findById(id)

    if (!account) throw new NotFoundException(`Account with the id ${id} not found`)

    return account
}


module.exports = { getAccount }