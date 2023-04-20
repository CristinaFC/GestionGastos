const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../../Model/User')
const createUser = async (name, lastName, email, password) =>
{
    const salt = genSaltSync();

    password = hashSync(password, salt);

    const user = new User({ name, lastName, email, password })
    await user.save()
    return user
}


module.exports = createUser