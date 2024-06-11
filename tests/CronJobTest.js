const tape = require('tape');
const sinon = require('sinon');
const FixedExpense = require('../src/FixedExpense/Model/FixedExpense');
const Expense = require('../src/Expense/Model/Expense');
const scheduleTasks = require('../src/Core/Service/CronJob');
const schedule = require('node-schedule');

const { calculateNextInsertion } = require('../src/FixedExpense/Helpers/Helpers');

//Creación de gasto fijo de prueba

const monthlyFixedExpense = new FixedExpense({
    amount: 250,
    user: '664884aa0c5dce933de9fe1e',
    account: '6648873f7e66f0e801431200',
    category: '664884aa0c5dce933de9fe30',
    concept: 'Alquiler',
    period: 2, // Mensual
    initDate: today,
    lastInsertion: today,
    nextInsertion: today,
    hasEndDate: false,
    endDate: null,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
});

tape('should insert two expenses for a fixed monthly expense when 2 months have elapsed', async (t) =>
{
    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const clock = sinon.useFakeTimers({
        now: today,
    });

    // Mockear la función FixedExpense.find para devolver un gasto fijo
    sinon.stub(FixedExpense, 'find').resolves([monthlyFixedExpense]);

    const saveExpenseStub = sinon.stub(Expense.prototype, 'save').resolves();

    monthlyFixedExpense.nextInsertion = calculateNextInsertion(monthlyFixedExpense.period, new Date())

    const findFixedExpense = sinon.stub(FixedExpense, 'findById').resolves(monthlyFixedExpense)
    const saveFixedExpense = sinon.stub(FixedExpense.prototype, 'save').resolves()

    const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').callsFake((rule, callback) =>
    {
        callback(new Date());
    });

    // Ejecutar la función scheduleTasks
    for (let i = 0; i < 65; i++)
    {
        // Ejecuta la función que quieres probar
        await scheduleTasks();
        clock.tick(24 * 60 * 60 * 1000); // Avanzar el reloj en un día

    }

    // Verificar que se haya llamado a la función scheduleJob
    t.ok(scheduleJobStub.called, 'scheduleJob debería ser llamado');
    t.ok(saveExpenseStub.called, 'La función save del modelo Expense debería ser llamada');
    t.equal(saveExpenseStub.callCount, 2, 'La función save del modelo Expense debería ser llamada exactamente dos veces vez');
    t.equal(findFixedExpense.callCount, 2, 'La función findFixedExpense del modelo FixedExpense debería ser llamada dos veces vez');
    t.equal(saveFixedExpense.callCount, 2, 'La función saveFixedExpense del modelo FixedExpense debería ser llamada dos veces vez');

    FixedExpense.find.restore();
    FixedExpense.findById.restore();
    scheduleJobStub.restore();
    saveExpenseStub.restore();
    findFixedExpense.restore();
    saveFixedExpense.restore();
    clock.restore();
    t.end();

});

tape('should insert two expenses for a fixed weekly expense when 2 weeks have elapsed', async (t) =>
{
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const clock = sinon.useFakeTimers({
        now: today,
    });
    const testFixedExpense = new FixedExpense({
        amount: 250,
        user: '664884aa0c5dce933de9fe1e',
        account: '6648873f7e66f0e801431200',
        category: '664884aa0c5dce933de9fe30',
        concept: 'Alquiler',
        period: 1, // semanal
        initDate: today,
        lastInsertion: today,
        nextInsertion: today,
        hasEndDate: false,
        endDate: null,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    });


    // Mockear la función FixedExpense.find para devolver un gasto fijo
    sinon.stub(FixedExpense, 'find').resolves([testFixedExpense]);

    const saveExpenseStub = sinon.stub(Expense.prototype, 'save').resolves();
    testFixedExpense.nextInsertion = calculateNextInsertion(testFixedExpense.period, today)
    const findFixedExpense = sinon.stub(FixedExpense, 'findById').resolves(testFixedExpense)
    const saveFixedExpense = sinon.stub(FixedExpense.prototype, 'save').resolves()

    const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').callsFake((rule, callback) =>
    {
        callback(new Date());
    });

    // Ejecutar la función scheduleTasks
    for (let i = -1; i < 16; i++)
    {
        await scheduleTasks();
        clock.tick(24 * 60 * 60 * 1000); //Simular que pasa un día en milisegundos
    }


    // Verificar que se haya llamado a la función scheduleJob
    t.ok(scheduleJobStub.called, 'scheduleJob debería ser llamado');

    // Restaurar los stubs
    t.ok(saveExpenseStub.called, 'La función save del modelo Expense debería ser llamada');
    t.equal(saveExpenseStub.callCount, 2, 'La función save del modelo Expense debería ser llamada exactamente dos veces vez');
    t.equal(findFixedExpense.callCount, 2, 'La función find del modelo FixedExpense debería ser llamada dos veces vez');
    t.equal(saveFixedExpense.callCount, 2, 'La función save del modelo FixedExpense debería ser llamada dos veces vez');


    clock.restore();
    FixedExpense.find.restore();
    FixedExpense.findById.restore();
    scheduleJobStub.restore();
    saveExpenseStub.restore();
    findFixedExpense.restore();
    saveFixedExpense.restore();
    t.end();

});


tape('should insert two expenses for a fixed daily expense when 2 days have elapsed', async (t) =>
{
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const clock = sinon.useFakeTimers({
        now: today,
    });
    const testFixedExpense = new FixedExpense({
        amount: 250,
        user: '664884aa0c5dce933de9fe1e',
        account: '6648873f7e66f0e801431200',
        category: '664884aa0c5dce933de9fe30',
        concept: 'Alquiler',
        period: 0, // semanal
        initDate: today,
        lastInsertion: today,
        nextInsertion: today,
        hasEndDate: false,
        endDate: null,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    });


    // Mockear la función FixedExpense.find para devolver un gasto fijo
    sinon.stub(FixedExpense, 'find').resolves([testFixedExpense]);


    const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').callsFake((rule, callback) =>
    {
        callback(new Date());
    });
    const saveExpenseStub = sinon.stub(Expense.prototype, 'save').resolves();

    const saveFixedExpense = sinon.stub(FixedExpense.prototype, 'save').resolves()
    let findFixedExpense = sinon.stub(FixedExpense, 'findById').resolves(testFixedExpense)
    // Ejecutar la función scheduleTasks
    for (let i = 0; i < 4; i++)
    {
        await scheduleTasks();
        testFixedExpense.nextInsertion = calculateNextInsertion(testFixedExpense.period, today)
        clock.tick(24 * 60 * 60 * 1000);
    }


    // Verificar que se haya llamado a la función scheduleJob
    t.ok(scheduleJobStub.called, 'scheduleJob debería ser llamado');

    // Restaurar los stubs
    t.ok(saveExpenseStub.called, 'La función save del modelo Expense debería ser llamada');
    t.equal(saveExpenseStub.callCount, 2, 'La función save del modelo Expense debería ser llamada exactamente dos veces vez');
    t.equal(findFixedExpense.callCount, 2, 'La función find del modelo FixedExpense debería ser llamada dos veces vez');
    t.equal(saveFixedExpense.callCount, 2, 'La función save del modelo FixedExpense debería ser llamada dos veces vez');


    clock.restore();
    FixedExpense.find.restore();
    FixedExpense.findById.restore();
    scheduleJobStub.restore();
    saveExpenseStub.restore();
    findFixedExpense.restore();
    saveFixedExpense.restore();
    t.end();

});




tape('should insert two expenses for a fixed anually expense when 2 year have elapsed', async (t) =>
{
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const clock = sinon.useFakeTimers({
        now: today,
    });
    const testFixedExpense = new FixedExpense({
        amount: 250,
        user: '664884aa0c5dce933de9fe1e',
        account: '6648873f7e66f0e801431200',
        category: '664884aa0c5dce933de9fe30',
        concept: 'Alquiler',
        period: 3, // semanal
        initDate: today,
        lastInsertion: today,
        nextInsertion: today,
        hasEndDate: false,
        endDate: null,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    });


    // Mockear la función FixedExpense.find para devolver un gasto fijo
    sinon.stub(FixedExpense, 'find').resolves([testFixedExpense]);


    const scheduleJobStub = sinon.stub(schedule, 'scheduleJob').callsFake((rule, callback) =>
    {
        callback(new Date());
    });
    const saveExpenseStub = sinon.stub(Expense.prototype, 'save').resolves();

    const saveFixedExpense = sinon.stub(FixedExpense.prototype, 'save').resolves()
    let findFixedExpense = sinon.stub(FixedExpense, 'findById').resolves(testFixedExpense)
    // Ejecutar la función scheduleTasks
    for (let i = 0; i < 365 * 2; i++)
    {
        await scheduleTasks();
        testFixedExpense.nextInsertion = calculateNextInsertion(testFixedExpense.period, today)
        clock.tick(24 * 60 * 60 * 1000);
    }


    // Verificar que se haya llamado a la función scheduleJob
    t.ok(scheduleJobStub.called, 'scheduleJob debería ser llamado');

    // Restaurar los stubs
    t.ok(saveExpenseStub.called, 'La función save del modelo Expense debería ser llamada');
    t.equal(saveExpenseStub.callCount, 2, 'La función save del modelo Expense debería ser llamada exactamente dos veces vez');
    t.equal(findFixedExpense.callCount, 2, 'La función find del modelo FixedExpense debería ser llamada dos veces vez');
    t.equal(saveFixedExpense.callCount, 2, 'La función save del modelo FixedExpense debería ser llamada dos veces vez');


    clock.restore();
    FixedExpense.find.restore();
    FixedExpense.findById.restore();
    scheduleJobStub.restore();
    saveExpenseStub.restore();
    findFixedExpense.restore();
    saveFixedExpense.restore();
    t.end();

});
