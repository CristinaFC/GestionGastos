const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category')
const { combineObjects } = require('./CombineObjects')
const { getDefaultCategories } = require('./GetDefaultCategories')

const getCategoriesByUser = async (userId) =>
{

    const categories = await Category.find({ user: userId }).sort({ name: 1 })

    if (!categories) throw new NotFoundException(`Not categories found`)

    return categories
}


module.exports = { getCategoriesByUser }