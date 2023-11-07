require('dotenv').config()

const authRoutes = require('./Auth/Routes/Auth')
const userRoutes = require('./Auth/Routes/User')
const categoriesRoutes = require('./Category/Routes/Category')
const accountsRoutes = require('./Account/Routes/Account')
const expensesRoutes = require('./Expense/Routes/Expense')
const incomesRoutes = require('./Income/Routes/Income')
const balanceRoutes = require('./Balance/Routes/Balance')
const graphsRoutes = require('./Graphs/Routes/Graphs')

const express = require('express');
const cors = require('cors');
const errorHandler = require('./Core/Service/ErrorHandler')

const { dbConnection } = require('./Core/Configuration/databaseConfig');
const schedule = require('node-schedule');
const { getFixedExpenses } = require('./Expense/Services/GetFixedExpenses')
const createExpense = require('./Expense/Services/CreateExpense')
const Expense = require('./Expense/Model/Expense')

class Server
{

    app = express();

    constructor()
    {
        this.app = express();

        this.port = process.env.PORT || 3000;

        //Conectar a base de datos 
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        //Control de errores personalizado
        this.app.use(errorHandler)

        const job = schedule.scheduleJob('0 0 * * *', async function (fireDate)
        {
            const expenses = await getFixedExpenses();
            expenses.forEach(async (exp) =>
            {

                const actual = new Date()
                let { amount, user, account, category, description, group, date } = exp

                if (actual.getMonth() > date.getMonth()
                    && actual.getFullYear() > date.getFullYear()
                    && actual.getDate() == date.getDate())
                {
                    const expense = new Expense({
                        amount,
                        user,
                        account,
                        category,
                        description,
                        fixed: false,
                        date: new Date(), group
                    })
                    await expense.save()
                }
            })
        });
    }

    async connectDB()
    {
        await dbConnection();
    }

    middlewares()
    {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    async scheduleTasks()
    {
        const expenses = await getFixedExpenses();
        console.log(expenses);
    }

    routes()
    {
        this.app.use('/api/auth', authRoutes)
        this.app.use('/api/users', userRoutes)
        this.app.use('/api/categories', categoriesRoutes)
        this.app.use('/api/accounts', accountsRoutes)
        this.app.use('/api/expenses', expensesRoutes)
        this.app.use('/api/incomes', incomesRoutes)
        this.app.use('/api/balances', balanceRoutes)
        this.app.use('/api/graphs', graphsRoutes)
    }

    listen()
    {
        this.app.listen(this.port, () =>
        {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }

}


module.exports = Server;