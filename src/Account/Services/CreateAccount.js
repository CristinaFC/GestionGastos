
const User = require('../../Auth/Model/User');
const Balance = require('../../Balance/Model/Balance');
const Category = require('../../Category/Model/Category');
const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const createIncome = require('../../Income/Services/CreateIncome');
const Account = require('../Model/Account');

const createAccount = async (user, props, session) =>
{
    const { name, initAmount, icon, isBalance } = props
    const userExists = await User.findById(user)

    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    let account = []
    if (isBalance)
    {
        const balance = await Balance.findOne({ user })
        account = new Account({ name, user: user.id, icon, isBalance, balance: balance.uid, initAmount })
    } else account = new Account({ name, user: user.id, icon, isBalance, balance: null, initAmount })

    await account.save({ session })

    const category = await Category.findOne({ user: user.id, name: "Saldo inicial" })
    if (initAmount > 0)
    {
        const income = await createIncome(user,
            { date: new Date(), amount: initAmount, account, category: category.id, concept: `Saldo inicial ${name}` })
        account.initAmountRef = income.id
        await account.save({ session })
    }

    return account
}


module.exports = createAccount