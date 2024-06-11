
const User = require('../../Auth/Model/User')
const Category = require('../Model/Category')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')

const createCategory = async (user, props) =>
{
    const userExists = await User.findById(user)

    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    const { name, icon, type, limit } = props
    const date = new Date()
    let monthlyExpenses = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        total: 0,
        limit
    }

    let category;
    if (type === "Expenses") category = new Category({ name, icon, user, type, monthlyExpenses })
    else category = new Category({ name, icon, user, type })

    await category.save()

    return category
}


module.exports = createCategory