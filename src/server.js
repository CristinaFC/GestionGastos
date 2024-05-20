require('dotenv').config()
const authRoutes = require('./Auth/Routes/Auth')
const userRoutes = require('./Auth/Routes/User')
const categoriesRoutes = require('./Category/Routes/Category')
const accountsRoutes = require('./Account/Routes/Account')
const expensesRoutes = require('./Expense/Routes/Expense')
const incomesRoutes = require('./Income/Routes/Income')
const balanceRoutes = require('./Balance/Routes/Balance')
const graphsRoutes = require('./Graphs/Routes/Graphs')
const fixedExpensesRoutes = require('./FixedExpense/Routes/FixedExpense')
const recipientsRoutes = require('./Recipient/Routes/Recipient')

const express = require('express');
const cors = require('cors');
const errorHandler = require('./Core/Service/ErrorHandler')

const { dbConnection } = require('./Core/Configuration/databaseConfig');
const withTransaction = require('./Core/Exceptions/Utils/WithTransactions')


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

        this.app.use(withTransaction);

        this.scheduleTasks()

    }


    async connectDB()
    {
        await dbConnection();
        // await generateFakeData(5)
    }

    middlewares()
    {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    async scheduleTasks()
    {

    }

    routes()
    {
        this.app.use('/api/auth', authRoutes)
        this.app.use('/api/users', userRoutes)
        this.app.use('/api/categories', categoriesRoutes)
        this.app.use('/api/accounts', accountsRoutes)
        this.app.use('/api/expenses', expensesRoutes)
        this.app.use('/api/fixedExpenses', fixedExpensesRoutes)
        this.app.use('/api/incomes', incomesRoutes)
        this.app.use('/api/balances', balanceRoutes)
        this.app.use('/api/graphs', graphsRoutes)
        this.app.use('/api/recipients', recipientsRoutes)
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