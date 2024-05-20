const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Category = require('../Model/Category');

const getCategoriesWithLimit = async (userId) =>
{
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const categories = await Category.find({
        user: userId, 'monthlyExpenses': {
            $elemMatch: {
                'month': month,
                'year': year,
                'limit': { $gt: 0 }
            }
        }
    });

    if (!categories) throw new NotFoundException(`Not categories found`)

    return categories
}


module.exports = { getCategoriesWithLimit }