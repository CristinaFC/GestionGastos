const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Income = require('../../Income/Model/Income')

const { ObjectId } = require('mongodb');




const getIncomesByCategoriesAndDate = async (user, date) =>
{

    const incomes = await Income.aggregate([
        {
            $match: {
                user: new ObjectId(user),
                $expr: {
                    $eq: [{ $month: '$date' }, 6] // Filtrar por el mes de junio , lo ideal sería pasarle el date
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
                ingresos: {
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
                ingresos: 1
            }
        }
        // {
        //     $group: {
        //         _id: {
        //             date: { //Agrupamos los ingresos por meses y año y por categoría
        //                 $dateToString: {
        //                     format: '%m %Y',
        //                     date: '$date'
        //                 }
        //             },
        //             category: { $arrayElemAt: ['$categoryData.name', 0] }
        //         },
        //         total: { $sum: '$amount' } //Obtenemos el total del amount de esa agrupación
        //     }
        // },
        // {
        //     $group: {
        //         _id: '$_id.date',
        //         category:'$_id.category',
        //         total:'$total',
        //         monthIncomes: {
        //             $push: {
        //                 k: '$_id.category',
        //                 v: '$total'
        //             }
        //         }
        //     }
        // },
        // {
        //     $project: {
        //         _id: 0,
        //         date: '$_id',
        //         monthIncomes: { $arrayToObject: '$monthIncomes' }
        //     }
        // }
    ]);

    if (!incomes) throw new NotFoundException(`Not incomes found`)

    return incomes
}


module.exports = { getIncomesByCategoriesAndDate }