const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../../Model/User');
const Balance = require('../../../Balance/Model/Balance');

const createUser = async (name, lastName, email, password, role = "user") =>
{
    const salt = genSaltSync();

    password = hashSync(password, salt);

    const user = new User({ name, lastName, email, password, role })
    await user.save()

    const balance = new Balance({ totalIncomes: 0, totalExpenses: 0, totalAmount: 0, user: user._id })
    await balance.save()
    return user
}


module.exports = createUser