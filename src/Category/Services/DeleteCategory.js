const Account = require('../../Account/Model/Account')
const { getAccountsByUser } = require('../../Account/Services/GetAccountsByUser')
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../../Expense/Model/Expense')
const Income = require('../../Income/Model/Income')
const Category = require('../Model/Category')

const deleteCategory = async (categoryId, user, session) =>
{
    const category = await Category.findOneAndDelete({ _id: categoryId }).session(session)
    if (!category) throw new NotFoundException(`Category with the id ${categoryId} not found`)

    if (category.type == "Expenses")
        await Expense.deleteMany({ category: { $in: categoryId } }).session(session)
    else await Income.deleteMany({ category: { $in: categoryId } }).session(session)

    const accounts = await getAccountsByUser(user)

    await updateAccountsAmount(accounts, user, session)

    return category
}

const updateAccountsAmount = async (accounts, user, session) =>
{
    await Promise.all(accounts.map(ac => updateAccountAmounts(ac.id, user, session)));
};



module.exports = deleteCategory