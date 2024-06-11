const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../../Model/User');
const Balance = require('../../../Balance/Model/Balance');
const Category = require('../../../Category/Model/Category');

const createUser = async (props) =>
{
    let { name, lastName, email, password } = props;

    const salt = genSaltSync();

    password = hashSync(password, salt);

    const user = new User({ name, lastName, email, password })
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

const date = new Date()
const monthlyExpenses = [
    {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        total: 0,
        limit: 0
    }
]
const defaultCategories = [
    { name: 'Transferencia', type: 'ExpenseIncome', icon: 'bank-transfer', monthlyExpenses },
    { name: 'Alimentación', type: 'Expenses', icon: 'food', monthlyExpenses },
    { name: 'Teléfono', type: 'Expenses', icon: 'phone', monthlyExpenses },
    { name: 'Transporte', type: 'Expenses', icon: 'train-car', monthlyExpenses },
    { name: 'Ropa', type: 'Expenses', icon: 'hanger', monthlyExpenses },
    { name: 'Ocio', type: 'Expenses', icon: 'controller-classic', monthlyExpenses },
    { name: 'Restaurantes', type: 'Expenses', icon: 'silverware-fork-knife', monthlyExpenses },
    { name: 'Hogar', type: 'Expenses', icon: 'home-outline', monthlyExpenses },
    { name: 'Salario', type: 'Incomes', icon: 'controller-classic' },
    { name: 'Saldo inicial', type: 'ExpenseIncome', icon: 'wallet' },
];


module.exports = createUser