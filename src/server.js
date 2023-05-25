require('dotenv').config()

const authRoutes = require('./Auth/Routes/Auth')
const userRoutes = require('./Auth/Routes/User')
const categoriesRoutes = require('./Category/Routes/Category')
const accountsRoutes = require('./Account/Routes/Account')

const express = require('express');
const cors = require('cors');
const errorHandler = require('./Core/Service/ErrorHandler')

const { dbConnection } = require('./Core/Configuration/databaseConfig');

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
        //this.app.use('/api/onboarding', onboardingRoutes)
        //this.app.use('/api/companies', companyRoutes)
        //this.app.use('/api/companyUsers', companyUserRoutes)
        //this.app.use('/api/employeeUsers', employeeUserRoutes)
        //this.app.use('/api/advances', advanceRoutes)
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