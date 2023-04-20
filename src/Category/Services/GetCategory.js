const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category')

const getCategory = async (id) =>
{
    const category = await Category.findById(id)

    if (!category) throw new NotFoundException(`Category with the id ${id} not found`)

    return category
}


module.exports = { getCategory }