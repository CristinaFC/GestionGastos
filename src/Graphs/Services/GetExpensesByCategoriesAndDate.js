const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../../Expense/Model/Expense');

const { ObjectId } = require('mongodb');

const getExpensesByCategoriesAndDate = async (user) =>
{

    const expenses = await Expense.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $eq: [{ $month: '$date' }, 6] // Filtrar por el mes de junio (valor 6)
                }
            }
        },
        {
            $lookup: {
                from: 'categories', // Nombre de la colección de categorías
                localField: 'category',
                foreignField: '_id',
                as: 'categoryData'
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: '%m %Y',
                            date: '$date'
                        }
                    },
                    category: { $arrayElemAt: ['$categoryData.name', 0] } // Campo de categoría en la colección "Categorías"
                },
                total: { $sum: '$amount' } // Calcula el total de ingresos en cada grupo
            }
        },
        {
            $group: {
                _id: '$_id.date',
                gastos: {
                    $push: {
                        label: '$_id.category',
                        value: '$total'
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                date: '$_id',
                gastos: 1
            }
        }
    ])

    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByCategoriesAndDate }