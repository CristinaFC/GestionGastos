const User = require('./src/Auth/Model/User');
const Account = require('./src/Account/Model/Account');
const Income = require('./src/Income/Model/Income');
const Expense = require('./src/Expense/Model/Expense');
const faker = require('faker');
const Category = require('./src/Category/Model/Category');
// const { faker } = require('@faker-js/faker');

async function createFakeUsers()
{

    const fakeUser = new User({
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    });
    return await fakeUser.save();

}

// Función para obtener un usuario aleatorio de la base de datos
async function getRandomUser()
{
    const count = await User.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    return User.findOne().skip(randomIndex);
}

async function getRandomCategory(type, user)
{
    const count = await Category.countDocuments({ type, user });
    const randomIndex = Math.floor(Math.random() * count);
    return Category.findOne({ type: "Expenses" }).skip(randomIndex);
}

// Función para crear una cuenta falsa asociada a un usuario aleatorio
async function createFakeAccount()
{
    const user = await getRandomUser();
    const fakeAccount = new Account({
        name: faker.company.companyName(),
        totalAmount: faker.finance.amount(),
        user: user,
        icon: faker.image.avatar(),
    });
    return fakeAccount.save();
}

// Función para crear un ingreso
async function createFakeIncome()
{
    const user = await getRandomUser();
    const account = await Account.findOne({ user: user._id });
    console.log('account', account)
    if (account)
    {

        const category = await getRandomCategory("Incomes", user);
        const fakeIncome = new Income({
            date: faker.date.recent(),
            amount: faker.finance.amount(),
            user: user._id,
            account: account._id,
            concept: faker.lorem.words(),
            category: category._id
        });
        return fakeIncome.save();
    }
}

// Función para crear un gasto falso asociado a una cuenta aleatoria y a un usuario aleatorio
async function createFakeExpense()
{
    const user = await getRandomUser();
    const account = await Account.findOne({ user: user });
    const category = await getRandomCategory("Expenses", user);
    console.log(account)
    if (account)
    {

        const fakeExpense = new Expense({
            date: faker.date.recent(),
            amount: faker.finance.amount(),
            user: user,
            account: account,
            concept: faker.lorem.words(),
            category: category
        });
        return fakeExpense.save();
    }
}

// Función para generar datos falsos
async function generateFakeData(amount)
{
    // Crea 10 cuentas falsas
    for (let i = 0; i < amount; i++)
    {
        // await createFakeUsers();
        // await createFakeAccount();
    }

    // Crea 20 ingresos falsos
    for (let i = 0; i < amount * 5; i++)
    {
        // await createFakeIncome();
    }

    // Crea 20 gastos falsos

    for (let i = 0; i < amount * 70; i++)
    {
        await createFakeExpense();
    }

    console.log('Fake data generated successfully.');

}


module.exports = {
    generateFakeData,
};