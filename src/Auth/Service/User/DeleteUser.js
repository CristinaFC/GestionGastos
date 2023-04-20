const Category = require('../../../Category/Model/Category')
const cascadeDelete = require('../../Middlewares/User/CascadeDelete')
const User = require('../../Model/User')

const deleteUser = async (userId) =>
{
    await User.findByIdAndDelete(userId)

    await cascadeDelete(Category, userId)

    return
}


module.exports = deleteUser