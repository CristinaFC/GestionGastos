
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const Expense = require('../Model/Expense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const { updateCategoryAmount } = require('../../Category/Helpers/Helpers');

const createExpense = async (user, props) =>
{
    const userExists = await User.findById(user)

    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    let { date, amount, account, category, concept, recipient, fixedExpenseRef } = props

    const categoryFound = await Category.findById(category)

    validateFields(account, categoryFound, user)

    const { total, reached } = await updateCategoryAmount(date, categoryFound, amount)

    const expense = new Expense({
        date, amount, account, category, user,
        concept, recipient, fixedExpenseRef
    })

    await expense.save()

    await updateAccountAmounts(account, user)

    return { expense, limitInfo: { total, reached, limit: categoryFound.limit, name: categoryFound.name } }
}



const validateFields = async (account, categoryFound, user) =>
{

    if (categoryFound.type !== "Expenses")
        throw new ForbiddenException(`Forbidden - Category type needs to be "Expenses" `)

    if (categoryFound.user.toString() !== user.id && categoryFound.readOnly === false)
        throw new ForbiddenException(`Forbidden`)

    const accountFound = await Account.findById(account)
    if (!accountFound)
        throw new NotFoundException(`Account with id ${account} not found`)

    if (accountFound.user.toString() !== user.id)
        throw new ForbiddenException(`Forbidden`)
}


module.exports = createExpense