const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');
const { ObjectId } = require('mongodb');

const getTransactionsByCategoriesAndDate = async (user, month, year, model) =>
{
    const Model = model === "Expense" ? Expense : Income
    const data = await Model.aggregate([
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
            $lookup: {
                from: "accounts",
                localField: "account",
                foreignField: "_id",
                as: "accountInfo"
            }
        },
        {
            $match: {
                "accountInfo.isBalance": true
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

    if (!data) throw new NotFoundException(`Not ${Model} found`)

    return data
}


module.exports = { getTransactionsByCategoriesAndDate }