const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category')

const getDefaultCategories = async (type) =>
{
    let defaultCategory
    if (type)
        defaultCategory = await Category.find({ readOnly: true, type }).sort({ name: 1 })
    else
        defaultCategory = await Category.find({ readOnly: true }).sort({ name: 1 })

    if (!defaultCategory) throw new NotFoundException(`Not categories found`)

    return defaultCategory
}


module.exports = { getDefaultCategories }