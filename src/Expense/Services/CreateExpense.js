
const User = require('../../Auth/Model/User')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException');
const Expense = require('../Model/Expense');
const Category = require('../../Category/Model/Category');
const Account = require('../../Account/Model/Account');
const updateAccountAmounts = require('../../Account/Services/UpdateAccountAmounts');
const { updateCategoryAmount } = require('../../Category/Helpers/Helpers');

const createExpense = async (user, props, session) =>
{
    const userExists = await User.findById(user);

    if (!userExists) throw new NotFoundException(`User with id ${user} not found`);

    let { date, amount, account, category, concept, fixedExpenseRef, exchangeData } = props;

    const categoryFound = await Category.findById(category);

    validateFields(account, categoryFound, user);

    const { total, reached, limit } = await updateCategoryAmount(date, categoryFound, amount, session);

    const expense = new Expense({
        date, amount, account, category, user,
        concept, fixedExpenseRef, exchangeData
    });

    await expense.save({ session });

    await updateAccountAmounts(account, user, session);

    return { expense, limitInfo: { total, reached, limit, name: categoryFound.name } };
};


const validateFields = async (account, categoryFound, user) =>
{
    if (!categoryFound) throw new NotFoundException(`Category not found`)

    if (categoryFound.type !== "Expenses" && categoryFound?.type !== "ExpenseIncome")
        throw new ForbiddenException(`Forbidden - Category type needs to be "Expenses" `)

    if (categoryFound.user.toString() !== user.id && categoryFound.readOnly === false)
        throw new ForbiddenException(`Forbidden`)

    const accountFound = await Account.findById(account)
    if (!accountFound) throw new NotFoundException(`Account with id ${account} not found`)

    if (accountFound.user.toString() !== user.id)
        throw new ForbiddenException(`Forbidden`)
}


module.exports = createExpense