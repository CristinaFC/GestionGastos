const User = require('./src/Auth/Model/User');
const Account = require('./src/Account/Model/Account');
const Income = require('./src/Income/Model/Income');
const Expense = require('./src/Expense/Model/Expense');
const faker = require('faker');
const Category = require('./src/Category/Model/Category');
const createExpense = require('./src/Expense/Services/CreateExpense');
const createIncome = require('./src/Income/Services/CreateIncome');
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
const userId = "6660ba41d47446f3aab42788"
const accounts = ["6660ba58d47446f3aab427b8", "6660ba6ad47446f3aab427f4", "6660ba857715ce5b4e33c060"]
const categoriasYConceptos = {
    '6660ba42d47446f3aab4278e': [
        'Mercadona', 'Supermercado', 'HiperDino', 'Carnicería', 'Charcutería', 'Frutería', 'Compra del mes',
        'Verdulería', 'Pescadería', 'Panadería', 'Lácteos', 'Congelados', 'Productos de limpieza', 'Bebidas', 'Snacks'
    ],
    '6660ba42d47446f3aab42792': [
        'Gasolina', 'Transporte público', 'Taxi', 'Zona azul', 'Parking',
        'Recarga de coche eléctrico', 'Peajes', 'Mantenimiento del coche', 'Limpieza de coche', 'Bicicleta compartida'
    ],
    '6660ba42d47446f3aab42796': [
        'Cine', 'Concierto', 'Parque de atracciones', 'Bolera', 'Billar', 'Dardos', 'Recreativos', 'Paintball', 'Karting', 'Curso de cerámica',
        'Teatro', 'Museo', 'Circo', 'Zoo', 'Escape Room', 'Espectáculo de magia', 'Festival de música', 'Obra de teatro', 'Visita guiada'
    ],
    '6660ba42d47446f3aab42794': [
        'Ropa evento', 'Boda', 'Camiseta', 'Pantalón Zara', 'Playeras', 'Tacones', 'Complementos', 'Anillo', 'Collar',
        'Abrigo', 'Traje', 'Gafas de sol', 'Bolso', 'Bufanda', 'Guantes', 'Cinturón', 'Sombrero', 'Pijama', 'Bañador'
    ],
    '6660ba42d47446f3aab4279a': [
        'Alquiler', 'Electricidad', 'Agua', 'Muebles', 'Reparación', 'Electrodoméstico', 'Paños de cocina', 'Toallas',
        'Internet', 'Servicio de limpieza', 'Seguridad', 'Pintura', 'Decoración', 'Plantas', 'Artículos de cocina', 'Iluminación', 'Aire acondicionado', 'Calefacción'
    ],
    '6660ba42d47446f3aab42790': [
        'Factura móvil', 'Fibra', 'Teléfono fijo', 'Llamada internacional',
        'Recarga de móvil', 'Cambio de plan', 'Compra de teléfono', 'Mantenimiento de línea', 'Servicios adicionales', 'Roaming'
    ],
    '6660ba42d47446f3aab42798': [
        'McDonalds', 'Cena con amigos', 'Italiano', 'Restaurante', 'Guachinche', 'Cena del viernes', 'Almuerzo en Las Palmas',
        'Comida rápida', 'Pizzería', 'Sushi', 'Buffet', 'Desayuno en cafetería', 'Brunch', 'Food truck', 'Cafetería', 'Tapas', 'Barbacoa', 'Marisquería', 'Cena romántica'
    ]
};


async function generarGastosParaMes(mes, anio)
{
    const user = await User.findById(userId);

    const numeroDeDias = new Date(anio, mes, 0).getDate();
    const gastosDelMes = [];

    const totalGastos = parseFloat(faker.finance.amount(1000, 1275, 2));
    console.log("--------------------------------------")
    let gastosAcumulados = 0;
    for (let dia = 1; dia <= numeroDeDias; dia++)
    {
        console.log('TOTAL', totalGastos, 'ACUMULADO', gastosAcumulados)
        if (gastosAcumulados > totalGastos) break;

        const account = await Account.findById(accounts[Math.floor(Math.random() * 2)])

        const remainingDays = numeroDeDias - dia + 1;
        const amount = parseFloat(((totalGastos - gastosAcumulados) / remainingDays).toFixed(2));
        console.log(amount)


        const category = await Category.findById(faker.random.arrayElement(Object.keys(categoriasYConceptos)))

        const concept = faker.random.arrayElement(categoriasYConceptos[category._id]);
        console.log(concept)
        const gasto = await createExpense(user, {
            user,
            date: new Date(anio, mes - 1, dia),
            amount: parseFloat(amount.toFixed(2)),
            category,
            concept,
            account
        },)
        gastosAcumulados += amount;
        gastosDelMes.push(gasto);



    }

    return gastosDelMes;
}


async function generarGastosParaMes(mes, anio)
{
    const user = await User.findById(userId);

    const numeroDeDias = new Date(anio, mes, 0).getDate();
    const gastosDelMes = [];

    const totalGastos = parseFloat(faker.finance.amount(1000, 1275, 2));
    console.log("--------------------------------------")
    let gastosAcumulados = 0;
    for (let dia = 1; dia <= numeroDeDias; dia++)
    {
        console.log('TOTAL', totalGastos, 'ACUMULADO', gastosAcumulados)
        if (gastosAcumulados > totalGastos) break;

        const account = await Account.findById(accounts[Math.floor(Math.random() * 2)])

        const remainingDays = numeroDeDias - dia + 1;
        const amount = parseFloat(((totalGastos - gastosAcumulados) / remainingDays).toFixed(2));
        console.log(amount)


        const category = await Category.findById(faker.random.arrayElement(Object.keys(categoriasYConceptos)))

        const concept = faker.random.arrayElement(categoriasYConceptos[category._id]);
        console.log(concept)
        const gasto = await createExpense(user, {
            user,
            date: new Date(anio, mes - 1, dia),
            amount: parseFloat(amount.toFixed(2)),
            category,
            concept,
            account
        },)
        gastosAcumulados += amount;
        gastosDelMes.push(gasto);



    }

    return gastosDelMes;
}


// Función para generar gastos aleatorios para cada mes desde diciembre de 2022 hasta la fecha actual
// Función para generar gastos aleatorios para cada mes desde diciembre de 2022 hasta la fecha actual
async function generarGastosDesdeDiciembre2022()
{
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;

    const gastosTotales = [];

    for (let anio = 2024; anio <= anioActual; anio++)
    {
        const mesInicial = (anio === 2022) ? 12 : 1; // Empezar desde diciembre de 2022
        const mesFinal = (anio === anioActual) ? mesActual : 12;

        for (let mes = mesInicial; mes <= mesActual; mes++)
        {
            const gastosDelMes = await generarGastosParaMes(mes, anio);
            gastosTotales.push(...gastosDelMes);
        }
    }

    return gastosTotales;
}

async function generarIngresosDesdeDiciembre2022()
{
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const user = await User.findById(userId);

    const gastosTotales = [];

    for (let anio = 2024; anio <= anioActual; anio++)
    {
        const mesInicial = (anio === 2022) ? 12 : 1; // Empezar desde diciembre de 2022
        const mesFinal = (anio === anioActual) ? mesActual : 12;

        for (let mes = mesInicial; mes <= mesActual; mes++)
        {

            //Salario
            const category = await Category.findById("6660ba42d47446f3aab4279c")

            const BBVAAccount = await Account.findById(accounts[0])
            const savingAccount = await Account.findById(accounts[2])
            const cashAccount = await Account.findById(accounts[1])

            const ingresoBBVA = await createIncome(user, {
                user,
                date: new Date(anio, mes - 1, 1),
                amount: 1765.22,
                category,
                concept: 'Nómina',
                account: BBVAAccount
            },)
            const savingAccountIngreso = await createIncome(user, {
                user,
                date: new Date(anio, mes - 1, 1),
                amount: 150,
                category,
                concept: 'Viaje',
                account: savingAccount
            },)

            const ingresocashAccount = await createIncome(user, {
                user,
                date: new Date(anio, mes - 1, 1),
                amount: 200,
                category,
                concept: 'Clases particulares',
                account: cashAccount
            },)




        }
    }

    return gastosTotales;
}

async function borrarGastosDel2024()
{
    try
    {
        // Borrar los gastos del año 2024
        const result = await Expense.deleteMany({
            date: {
                $gte: new Date("2024-01-01T00:00:00Z"),
                $lt: new Date("2025-01-01T00:00:00Z")
            }
        });

        console.log(`Se han borrado ${result.deletedCount} gastos del año 2024.`);

        // Actualizar las categorías
        await Category.updateMany(
            { 'monthlyExpenses.year': 2024 }, // Filtra categorías que tienen gastos en el 2024
            { $set: { 'monthlyExpenses.$[elem].total': 0 } }, // Establece el límite a 0
            { arrayFilters: [{ 'elem.year': 2024 }] } // Aplica el filtro solo a los elementos del array con el año 2024
        );

        console.log('Se han actualizado los límites de los gastos del 2024 a 0.');
    } catch (error)
    {
        console.error('Error borrando los gastos o actualizando las categorías:', error);
    }
}


async function eliminarIngresosNoSaldoInicial()
{
    try
    {
        // Encuentra la categoría "Saldo inicial"
        const saldoInicialCategory = await Category.findOne({ name: 'Saldo inicial' });

        if (!saldoInicialCategory)
        {
            console.log('No se encontró la categoría "Saldo inicial".');
            return;
        }

        // Borra los ingresos cuya categoría no sea "Saldo inicial"
        const result = await Income.deleteMany({
            category: { $ne: saldoInicialCategory._id }
        });

        console.log(`Se han borrado ${result.deletedCount} ingresos cuya categoría no es "Saldo inicial".`);
    } catch (error)
    {
        console.error('Error eliminando ingresos:', error);
    }
}





module.exports = {
    generarGastosDesdeDiciembre2022, borrarGastosDel2024, generarIngresosDesdeDiciembre2022, eliminarIngresosNoSaldoInicial
};