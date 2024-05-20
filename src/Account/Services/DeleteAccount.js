const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account')
const Expense = require('../../Expense/Model/Expense')
const Income = require('../../Income/Model/Income')
const updateBalance = require('../../Balance/Services/UpdateBalance')

const deleteAccount = async (accountId, session) =>
{
    await Expense.deleteMany({ account: { $in: accountId } }).session(session)
    await Income.deleteMany({ account: { $in: accountId } }).session(session)

    const account = await Account.findOneAndDelete({ _id: accountId }).session(session)

    if (!account)
        throw new NotFoundException(`Account with the id ${accountId} not found`)

    updateBalance(account.user)
    return account
}


module.exports = deleteAccount