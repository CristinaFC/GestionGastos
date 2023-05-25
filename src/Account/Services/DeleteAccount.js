const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account')

const deleteAccount = async (accountId) =>
{
    const account = await Account.findByIdAndDelete(accountId)

    if (!account)
        throw new NotFoundException(`Account with the id ${accountId} not found`)

    return account
}


module.exports = deleteAccount