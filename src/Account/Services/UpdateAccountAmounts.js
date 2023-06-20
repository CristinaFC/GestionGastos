const updateBalance = require("../../Balance/Services/UpdateBalance");
const NotFoundException = require("../../Core/Exceptions/NotFoundException");
const Expense = require("../../Expense/Model/Expense");
const Income = require("../../Income/Model/Income");
const Account = require("../Model/Account");

const { ObjectId } = require('mongodb');

const updateAccountAmounts = async (account, user) =>
{
    const accountDocument = await Account.findById(new ObjectId(account))

    if (!accountDocument)
        throw new NotFoundException(`Acoount with id ${account} not found`)

    const incomes = await Income.aggregate([
        {
            $match: { user: new ObjectId(user), account: new ObjectId(account) }
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$amount' }
            }
        }
    ]);

    const expenses = await Expense.aggregate([
        {
            $match: { user: new ObjectId(user), account: new ObjectId(account) }
        },
        {
            $group: {
                _id: null,
                amount: { $sum: '$amount' }
            }
        }
    ]);


    accountDocument.totalIncomes = incomes[0]?.amount || 0
    accountDocument.totalExpenses = expenses[0]?.amount || 0
    accountDocument.totalAmount = (incomes[0]?.amount || 0) - (expenses[0]?.amount || 0)
    await accountDocument.save()

    await updateBalance(user)
}

module.exports = updateAccountAmounts
