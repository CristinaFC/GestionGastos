
const User = require('../../Auth/Model/User');
const Category = require('../../Category/Model/Category');
const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const createIncome = require('../../Income/Services/CreateIncome');
const createExpense = require('../../Expense/Services/CreateExpense');
const Account = require('../Model/Account');
const updateAccountAmounts = require('./UpdateAccountAmounts');
const { ObjectId } = require('mongodb');

const transfer = async (user, props, session) =>
{
    const { fromAccount, toAccount, amount, concept } = props;

    const userExists = await User.findById(user)
    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    const category = await Category.findOne({ user, name: "Transferencia" })
    if (!category) throw new NotFoundException(`Category not found`)

    const sourceAccount = await Account.findById(fromAccount)
    if (!sourceAccount) throw new NotFoundException(`Account with id ${fromAccount} not found`)

    const destinationAccount = await Account.findById(toAccount)
    if (!destinationAccount) throw new NotFoundException(`Account with id ${toAccount} not found`)

    const date = new Date()
    await createExpense(user, { account: fromAccount, date, category: category._id, amount, concept }, session)
    updateAccountAmounts(sourceAccount, userExists)

    await createIncome(user, { account: toAccount, date, category: category._id, amount, concept }, session)
    updateAccountAmounts(destinationAccount, userExists, session)

    return
}


module.exports = transfer