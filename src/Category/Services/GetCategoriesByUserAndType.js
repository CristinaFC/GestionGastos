const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category')

const getCategoriesByUserAndType = async (userId, type) =>
{
    const categories = await Category.find({ user: userId, type }).sort({ name: 1 })

    if (!categories) throw new NotFoundException(`Not categories found`)

    return categories
}


module.exports = { getCategoriesByUserAndType }