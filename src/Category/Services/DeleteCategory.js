const Account = require('../../Account/Model/Account')
const { getAccountsByUser } = require('../../Account/Services/GetAccountsByUser')
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../../Expense/Model/Expense')
const Income = require('../../Income/Model/Income')
const Category = require('../Model/Category')

const deleteCategory = async (categoryId, user, session) =>
{
    await Expense.deleteMany({ category: { $in: categoryId } }).session(session)

    await Income.deleteMany({ category: { $in: categoryId } }).session(session)

    const accounts = await getAccountsByUser(user)

    const category = await Category.findOneAndDelete({ _id: categoryId }).session(session)
    updateAccountsAmount(accounts, user, session)

    if (!category) throw new NotFoundException(`Category with the id ${categoryId} not found`)

    return category
}

const updateAccountsAmount = (accounts, user, session) =>
{
    accounts.map(async ac =>
    {
        await updateAccountAmounts(ac.id, user, session)
    })
}


module.exports = deleteCategory