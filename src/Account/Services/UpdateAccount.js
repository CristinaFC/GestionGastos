const Account = require('../Model/Account');

const updateAccount = async (accountId, body) =>
{
    const { name, initAmount, date, user, icon, isSalary } = body;

    const account = await Account.findByIdAndUpdate(
        accountId,
        { name, initAmount, date, user, icon, isSalary },
        { new: true },
    )
    return account
}


module.exports = updateAccount