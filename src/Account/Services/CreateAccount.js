
const User = require('../../Auth/Model/User');
const Balance = require('../../Balance/Model/Balance');
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account');

const createAccount = async (name, user, icon, isBalance) =>
{

    const userExists = await User.findById(user)

    if (!userExists)
        throw new NotFoundException(`User with id ${user} not found`)

    let account = []
    if (isBalance)
    {
        const balance = await Balance.findOne({ user })
        account = new Account({ name, user, icon, isBalance, balance: balance.uid })
    }
    else account = new Account({ name, user, icon, isBalance, balance: null })

    await account.save()

    return account
}


module.exports = createAccount