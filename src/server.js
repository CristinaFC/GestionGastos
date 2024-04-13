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
const schedule = require('node-schedule');
const { getFixedExpenses } = require('./FixedExpense/Services/GetActiveFixedExpenses')
const Expense = require('./Expense/Model/Expense')
const FixedExpense = require('./FixedExpense/Model/FixedExpense')
const { calculateNextInsertion } = require('./FixedExpense/Helpers/Helpers')


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

        this.scheduleTasks()

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
        const job = schedule.scheduleJob('0 0 * * *', async function (fireDate)
        {
            const fixedExpenses = await getFixedExpenses();
            const actualDate = new Date()
            actualDate.setHours(0, 0, 0, 0);
            fixedExpenses.forEach(async (fixedExp) =>
            {

                let {
                    amount, user,
                    account, category,
                    description, date,
                    hasEndDate,
                    dateEndOf, period,
                    lastInsertion, nextInsertion } = fixedExp
                dateEndOf?.setHours(0, 0, 0, 0);

                //Si no tiene fecha final o si la fecha de finalización es posterior o igual a hoy
                if (!hasEndDate || actualDate?.getTime() <= dateEndOf?.getTime()) 
                {
                    nextInsertion?.setHours(0, 0, 0, 0);

                    /**Si la próx. inser. es hoy se añade un gasto*/
                    if (nextInsertion?.getTime() === actualDate?.getTime())
                    {
                        const expense = new Expense({
                            amount,
                            user,
                            account,
                            category,
                            description,
                            date: actualDate,
                            fixedExpenseRef: fixedExp.uid
                        })
                        await expense.save()

                        const nextInsertion = calculateNextInsertion(period, actualDate)
                        if (hasEndDate)
                        {
                            nextInsertion.setHours(0, 0, 0, 0);
                            endDate.setHours(0, 0, 0, 0);
                            //Si la fecha final es antes que la próx insersión, deja de ser un gasto fijo
                            if (endDate.getTime() < nextInsertion.getTime())
                                await FixedExpense.updateOne({ _id: fixedExp.id },
                                    { $set: { active: false, lastInsertion: actualDate, nextInsertion: null } })

                        } else
                            await FixedExpense.updateOne({ _id: fixedExp.id },
                                { $set: { lastInsertion: actualDate, active: true, nextInsertion } })

                    }

                } else if (dateEndOf?.getTime() > actualDate?.getTime())
                    await FixedExpense.updateOne({ _id: fixedExp.id }, { $set: { active: false } })
            })
        });

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