
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Account = require('../Model/Account');

const createAccount = async (name, initAmount, date, user, icon, isSalary) =>
{

    const userExists = await User.findById(user)

    if (!userExists)
        throw new NotFoundException(`User with id ${user} not found`)
    const totalAmount = initAmount
    const account = new Account({ name, initAmount, date, user, icon, isSalary, totalAmount })
    await account.save()

    return account
}


module.exports = createAccount