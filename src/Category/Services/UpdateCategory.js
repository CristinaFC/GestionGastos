const NotFoundException = require('../../Core/Exceptions/NotFoundException');
const Category = require('../Model/Category')

const updateCategory = async (categoryId, body) =>
{
    const { name, icon, type, limit } = body;

    const category = await Category.findById(categoryId)

    if (!category) throw new NotFoundException('Category not found')

    const date = new Date()

    const month = date.getMonth() + 1

    category.name = name;
    category.icon = icon;
    category.type = type;

    if (type === 'Expenses')
    {
        const index = category.monthlyExpenses?.findIndex(monthlyExpense =>
            monthlyExpense.month === month && monthlyExpense.year === date.getFullYear()
        );

        if (index === -1) category.monthlyExpenses.push({ month: month, year: date.getFullYear(), limit, total: 0 })
        else category.monthlyExpenses[index].limit = limit
    }


    await category.save()

    return category
}


module.exports = updateCategory