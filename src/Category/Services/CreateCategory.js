
const User = require('../../Auth/Model/User')
const Category = require('../Model/Category')
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const cloudinary = require('../../Core/Configuration/cloudinaryConfig')
const path = require('path');

const createCategory = async (name, icon, user, type) =>
{

    const userExists = await User.findById(user)

    if (!userExists)
        throw new NotFoundException(`User with id ${user} not found`)

    const category = new Category({ name, icon, user, type })
    await category.save()

    return category
}


module.exports = createCategory