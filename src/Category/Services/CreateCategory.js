
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
    const category = new Category({ name, icon, user, type, monthlyExpenses })
    await category.save()

    return category
}


module.exports = createCategory