const Account = require('../../Account/Model/Account')
const Income = require('../../Income/Model/Income');
const Balance = require('../Model/Balance');

const { ObjectId } = require('mongodb');


const updateBalance = async (user) =>
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
    ]);

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
    ]);

    const totalIncomes = incomes[0]?.totalIncomes || 0;
    const totalExpenses = expenses[0]?.totalExpenses || 0;
    console.log('Total de gastos de las cuentas con isBalance:', totalExpenses);
    console.log('Total de ingresos de las cuentas con isBalance:', totalIncomes);

    const totalAmount = totalIncomes - totalExpenses

    await Balance.findOneAndUpdate({ user: new ObjectId(user) }, { totalAmount, totalIncomes, totalExpenses }, { new: true })

    return
}


module.exports = updateBalance