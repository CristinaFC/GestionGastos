const mongoose = require('mongoose');

const dbConnection = async () =>
{
    try
    {
        await mongoose
            .connect(process.env.MONGODB_ATLAS, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('Conexión de la base de datos correcta'));

    } catch (e)
    {
        console.log(e);
        throw new Error('Error en la incialización de la base de datos');
    }

}

module.exports = {
    dbConnection
}