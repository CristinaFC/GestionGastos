
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const Income = require('../Model/Income');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');

const createIncome = async (user, props, session) =>
{
    const { date, amount, account, category, concept, exchangeData } = props
    const userExists = await User.findById(user)

    const categoryFound = await Category.findById(category)
    if (categoryFound?.type !== "Incomes" && categoryFound?.type !== "ExpenseIncome")
        throw new ForbiddenException(`Forbidden - Category type needs to be "Incomes" `)

    if (categoryFound?.user.toString() !== user.id) throw new ForbiddenException(`Forbidden`)

    const accountFound = await Account.findById(account)
    if (!accountFound)
        throw new NotFoundException(`Account with id ${account} not found`)

    if (accountFound.user.toString() !== user.id)
        throw new ForbiddenException(`Forbidden`)

    if (!userExists)
        throw new NotFoundException(`User with id ${user} not found`)

    const income = new Income({ date, amount, account, category, concept, user, exchangeData })
    await income.save({ session })

    await updateAccountAmounts(account, user, session)

    return income
}


module.exports = createIncome