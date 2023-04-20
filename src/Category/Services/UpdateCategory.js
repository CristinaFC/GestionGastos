const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Category = require('../Model/Category')

const updateCategory = async (categoryId, body) =>
{
    const { name, icon, type } = body;

    const category = await Category.findByIdAndUpdate(
        categoryId,
        { name, icon, type },
        { new: true },
    )
    return category
}


module.exports = updateCategory