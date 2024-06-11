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

const express = require('express');
const cors = require('cors');
const errorHandler = require('./Core/Service/ErrorHandler')

const { dbConnection } = require('./Core/Configuration/databaseConfig');
const withTransaction = require('./Core/Exceptions/Utils/WithTransactions')
const Expense = require('./Expense/Model/Expense')
const FixedExpense = require('./FixedExpense/Model/FixedExpense')
const { getFixedExpenses } = require('./FixedExpense/Services/GetFixedExpenses')
const { calculateNextInsertion } = require('./FixedExpense/Helpers/Helpers')
const scheduleTasks = require('./Core/Service/CronJob')
const { generarGastosDesdeDiciembre2022, borrarGastosDel2024, generarIngresosDesdeDiciembre2022, eliminarIngresosNoSaldoInicial } = require('../DataGenerator')


class Server
{

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

        scheduleTasks()
        // generarGastosDesdeDiciembre2022()
        // borrarGastosDel2024()
        generarIngresosDesdeDiciembre2022()
        // eliminarIngresosNoSaldoInicial()

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