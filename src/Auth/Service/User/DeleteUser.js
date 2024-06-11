const Category = require('../../../Category/Model/Category')
const Expense = require('../../../Expense/Model/Expense')
const Income = require('../../../Income/Model/Income')
const Balance = require('../../../Balance/Model/Balance')
const FixedExpense = require('../../../FixedExpense/Model/FixedExpense')
const cascadeDelete = require('../../Middlewares/User/CascadeDelete')
const User = require('../../Model/User')
const Account = require('../../../Account/Model/Account')

const deleteUser = async (userId, session) =>
{
    await User.findByIdAndDelete(userId).session(session)

    await cascadeDelete(Category, userId, session)
    await cascadeDelete(Account, userId, session)
    await cascadeDelete(Expense, userId, session)
    await cascadeDelete(Income, userId, session)
    await cascadeDelete(Balance, userId, session)
    await cascadeDelete(FixedExpense, userId, session)

    return
}


module.exports = deleteUser