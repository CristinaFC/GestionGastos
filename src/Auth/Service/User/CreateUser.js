const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../../Model/User');
const Balance = require('../../../Balance/Model/Balance');
const Category = require('../../../Category/Model/Category');

const createUser = async (name, lastName, email, password, role = "user") =>
{
    const salt = genSaltSync();

    password = hashSync(password, salt);

    const user = new User({ name, lastName, email, password, role })
    await user.save()

    const balance = new Balance({ totalIncomes: 0, totalExpenses: 0, totalAmount: 0, user: user._id })
    await balance.save()

    const categoriesToSave = defaultCategories.map(category => ({
        ...category,
        user
    }));

    await Category.insertMany(categoriesToSave);

    return user
}


const defaultCategories = [
    { name: 'Alimentación', type: 'Expenses', icon: 'food', limit: null },
    { name: 'Teléfono', type: 'Expenses', icon: 'phone', limit: null },
    { name: 'Transporte', type: 'Expenses', icon: 'train-car', limit: null },
    { name: 'Ropa', type: 'Expenses', icon: 'hanger', limit: null },
    { name: 'Ocio', type: 'Expenses', icon: 'controller-classic', limit: null },
    { name: 'Restaurantes', type: 'Expenses', icon: 'silverware-fork-knife', limit: null },
    { name: 'Hogar', type: 'Expenses', icon: 'home-outline', limit: null },
    { name: 'Salario', type: 'Incomes', icon: 'controller-classic', limit: null },
    { name: 'Saldo inicial', type: 'Incomes', icon: 'wallet', limit: null },
];


module.exports = createUser