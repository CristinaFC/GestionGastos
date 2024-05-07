const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const { ObjectId } = require('mongodb');
const Expense = require('../../Expense/Model/Expense');
const Income = require('../../Income/Model/Income');

const getTransactionsByYear = async (user, year, category, model) =>
{
    const Model = model === "Expense" ? Expense : Income

    const data = await Model.aggregate([
        { //Gastos de ese usuario entre ese año
            $match: {
                user: new ObjectId(user),
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lt: new Date(`${year + 1}-01-01`),
                },
            }
        },
        { //Asociar el id con su tabla correspondiente
            $lookup: {
                from: 'categories', // Nombre de la colección de categorías
                localField: 'category',
                foreignField: '_id',
                as: 'categoryData'
            }
        },
        {
            $unwind: '$categoryData',
        },
        { //Coincide con el nombre de la categoría pasada
            $match: {
                'categoryData.name': category,
            },
        },
        {
            $group: {
                _id: { month: { $month: '$date' } },
                total: { $sum: '$amount' } // Calcula el total de gastos 
            }
        },
        {
            $sort: { '_id.month': 1 },
        },
        {
            $project: {
                _id: 0,
                month: '$_id.month',
                total: 1, // Incluye el campo total
            },
        }
    ])

    if (!data) throw new NotFoundException(`Not expenses found`)

    return data
}


module.exports = { getTransactionsByYear }