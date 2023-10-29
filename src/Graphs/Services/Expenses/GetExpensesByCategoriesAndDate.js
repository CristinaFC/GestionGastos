const NotFoundException = require('../../../Core/Exceptions/NotFoundException');
const Expense = require('../../../Expense/Model/Expense');

const { ObjectId } = require('mongodb');

const getExpensesByCategoriesAndDate = async (user, month, year) =>
{

    const expenses = await Expense.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, parseInt(year)] },
                        { $eq: [{ $month: '$date' }, parseInt(month)] }
                    ]
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
            $project: {
                _id: 0,
                category: "$_id.category",
                total: 1
            }
        }
    ])

    if (!expenses) throw new NotFoundException(`Not expenses found`)

    return expenses
}


module.exports = { getExpensesByCategoriesAndDate }