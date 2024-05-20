const Category = require('../../../Category/Model/Category')
const Expense = require('../../../Expense/Model/Expense')
const Income = require('../../../Income/Model/Income')
const Balance = require('../../../Balance/Model/Balance')
const FixedExpense = require('../../../FixedExpense/Model/FixedExpense')
const Recipient = require('../../../Recipient/Model/Recipient')
const cascadeDelete = require('../../Middlewares/User/CascadeDelete')
const User = require('../../Model/User')

const deleteUser = async (userId) =>
{
    await User.findByIdAndDelete(userId)

    await cascadeDelete(Category, userId)
    await cascadeDelete(Expense, userId)
    await cascadeDelete(Income, userId)
    await cascadeDelete(Balance, userId)
    await cascadeDelete(FixedExpense, userId)
    await cascadeDelete(Recipient, userId)

    return
}


module.exports = deleteUser