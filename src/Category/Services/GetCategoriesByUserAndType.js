const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category');
const { combineObjects } = require('./CombineObjects');
const { getDefaultCategories } = require('./GetDefaultCategories')

const getCategoriesByUserAndType = async (userId, type) =>
{
    const defaultCategories = await getDefaultCategories(type)

    const userCategories = await Category.find({ user: userId, type }).sort({ name: 1 })

    if (!userCategories) throw new NotFoundException(`Not categories found`)

    const categories = combineObjects(defaultCategories, userCategories)

    return categories
}


module.exports = { getCategoriesByUserAndType }