
const User = require('../../Auth/Model/User');
const Balance = require('../../Balance/Model/Balance');
const Category = require('../../Category/Model/Category');
const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');
const createIncome = require('../../Income/Services/CreateIncome');
const Account = require('../Model/Account');
const updateAccountAmounts = require('./UpdateAccountAmounts');

const createAccount = async (user, props, session) =>
{
    const { name, initAmount, icon, isBalance } = props

    const userExists = await User.findById(user)


    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    let account = []
    if (isBalance)
    {
        const balance = await Balance.findOne({ user })
        account = new Account({ name, user: userExists._id, icon, isBalance, balance: balance.id, initAmount })
    } else account = new Account({ name, user: userExists._id, icon, isBalance, balance: null, initAmount })
    await account.save({ session })

    let transaction
    if (initAmount > 0)
    {
        const category = await Category.findOne({ user: userExists._id, name: "Saldo inicial" })
        transaction = new Income({
            user: userExists._id,
            date: new Date(),
            amount: initAmount,
            account: account._id,
            category: category._id,
            concept: `Saldo inicial ${name}`
        });

    } else if (initAmount < 0)
    {
        const category = await Category.findOne({ user: userExists._id, name: "Saldo inicial" })
        transaction = new Expense({
            user: userExists._id,
            date: new Date(),
            amount: initAmount.replace('-', ''),
            account: account._id,
            category: category._id,
            concept: `Saldo inicial ${name}`
        });
        await transaction.save({ session });
    }
    if (transaction)
    {
        await transaction.save({ session });
        account.initAmountRef = transaction.id
        account.initAmountRefModel = transaction.constructor.modelName
        await account.save({ session })
    }

    await updateAccountAmounts(account, user, session)

    return account
}


module.exports = createAccount