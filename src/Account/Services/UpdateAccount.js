const Balance = require('../../Balance/Model/Balance');
const updateBalance = require('../../Balance/Services/UpdateBalance');
const Account = require('../Model/Account');

const updateAccount = async (accountId, body, user) =>
{
    const { name, icon, isBalance } = body;

    let account;
    if (isBalance)
    {
        const balance = await Balance.find({ user })

        account = await Account.findByIdAndUpdate(
            accountId,
            { name, user, icon, isBalance, balance: balance._id },
            { new: true },
        )
    }
    else account = await Account.findByIdAndUpdate(
        accountId,
        { name, user, icon, isBalance, balance: null },
        { new: true },
    )
    await updateBalance(user)
    return account
}


module.exports = updateAccount