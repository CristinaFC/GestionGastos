
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const Expense = require('../Model/Expense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');

const createExpense = async (props) =>
{
    const { date, amount, account, category, description, group, user, fixed } = props
    const userExists = await User.findById(user)

    const categoryFound = await Category.findById(category)
    if (categoryFound.type !== "Expenses")
        throw new ForbiddenException(`Forbidden - Category type needs to be "Expenses" `)

    if (categoryFound.user.toString() !== user.id && categoryFound.readOnly === false)
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

    // const totalExpenses = parseFloat(accountFound.totalExpenses) + parseFloat(amount)
    // const totalAmount = accountFound.totalIncomes - totalExpenses
    // await Account.findByIdAndUpdate(account, { totalExpenses, totalAmount })

    await updateAccountAmounts(account, user)
    // accountFound.totalExpenses += parseFloat(amount)
    // accountFound.totalAmount -= parseFloat(amount)
    // await accountFound.save()

    return expense
}


module.exports = createExpense