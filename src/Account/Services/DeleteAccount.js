const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account')
const Expense = require('../../Expense/Model/Expense')

const deleteAccount = async (accountId) =>
{

    await Expense.deleteMany({ account: { $in: accountId } })

    const account = await Account.findByIdAndDelete(accountId)

    if (!account)
        throw new NotFoundException(`Account with the id ${accountId} not found`)

    return account
}


module.exports = deleteAccount