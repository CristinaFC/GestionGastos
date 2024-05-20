const User = require("../../Auth/Model/User")
const NotFoundException = require("../../Core/Exceptions/NotFoundException")
const Expense = require("../../Expense/Model/Expense")
const FixedExpense = require("../../FixedExpense/Model/FixedExpense")
const { ObjectId } = require('mongodb');

const getExpensePrediction = async (id) =>
{

    const user = await User.findById(id)

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    const date = new Date()
    const lastYear = date.getFullYear() - 1
    let month = date.getMonth() + 1;

    let year = date.getFullYear();


    const fixedExpenses = await FixedExpense.find({
        user: new ObjectId(id),
        $expr: {
            $and: [
                { $eq: [{ $year: "$nextInsertion" }, year] },
                { $eq: [{ $month: "$nextInsertion" }, month] }
            ]
        }
    })

    const totalAmountFixedExpenses = fixedExpenses.reduce((total, expense) => total + expense.amount, 0)

    /**
     * Gastos de los 12 meses anteriores
     */
    const lastYearExpenses = await Expense.aggregate([
        {
            $match: {
                user: new ObjectId(id),
                fixedExpenseRef: null,
                date: {
                    $gte: new Date(Date.UTC(lastYear, date.getMonth(), 1, 0, 0, 0)),
                    $lt: new Date(Date.UTC(year, date.getMonth(), date.getDate(), 0, 0, 0))
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" }
                },
                totalAmount: { $sum: "$amount" }
            },
        },
        {
            $sort: { "_id": 1 }
        }
    ])

    const amountLastYearExpenses = lastYearExpenses.reduce((total, month) => total + month.totalAmount, 0)

    //Media de los gastos mensuales de los últ 12 meses
    let expensesMedia = amountLastYearExpenses / 12
    //Gastos fijos del próximo más la media de lo gastado mensualmente en el último año
    let total = totalAmountFixedExpenses + expensesMedia

    return total
}

module.exports = getExpensePrediction