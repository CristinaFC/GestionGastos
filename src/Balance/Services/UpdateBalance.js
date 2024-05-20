const Account = require('../../Account/Model/Account')
const Income = require('../../Income/Model/Income');
const Balance = require('../Model/Balance');

const { ObjectId } = require('mongodb');

const updateBalance = async (user, session) =>
{
    const incomes = await Account.aggregate([
        {
            $match: { isBalance: true, user: new ObjectId(user) }
        },
        {
            $group: {
                _id: null,
                totalIncomes: { $sum: '$totalIncomes' }
            }
        }
    ]).session(session);

    const expenses = await Account.aggregate([
        {
            $match: { isBalance: true, user: new ObjectId(user) }
        },
        {
            $group: {
                _id: null,
                totalExpenses: { $sum: '$totalExpenses' }
            }
        }
    ]).session(session);

    const totalIncomes = incomes[0]?.totalIncomes || 0;
    const totalExpenses = expenses[0]?.totalExpenses || 0;

    const totalAmount = totalIncomes - totalExpenses;

    await Balance.findOneAndUpdate({ user: new ObjectId(user) }, { totalAmount, totalIncomes, totalExpenses }, { new: true }).session(session);

    return;
};


module.exports = updateBalance