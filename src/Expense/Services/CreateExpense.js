
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const Expense = require('../Model/Expense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');

const createExpense = async (props) =>
{
    const { date, amount, account, category, description, group, user } = props
    const userExists = await User.findById(user)

    const categoryFound = await Category.findById(category)
    if (categoryFound.type !== "Expenses")
        throw new ForbiddenException(`Forbidden - Category type needs to be "Expenses" `)

    if (categoryFound.user.toString() !== user.id)
        throw new ForbiddenException(`Forbidden`)

    const accountFound = await Account.findById(account)
    if (!accountFound)
        throw new NotFoundException(`Account with id ${account} not found`)

    if (accountFound.user.toString() !== user.id)
        throw new ForbiddenException(`Forbidden`)

    if (!userExists)
        throw new NotFoundException(`User with id ${user} not found`)

    const expense = new Expense({ date, amount, account, category, description, group, user })
    await expense.save()

    return expense
}


module.exports = createExpense