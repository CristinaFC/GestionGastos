const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Expense = require('../../Expense/Model/Expense')
const Category = require('../Model/Category')

const deleteCategory = async (categoryId) =>
{

    await Expense.deleteMany({ category: { $in: categoryId } })
    const category = await Category.findByIdAndDelete(categoryId)
    if (!category)
        throw new NotFoundException(`Category with the id ${categoryId} not found`)

    return category
}


module.exports = deleteCategory