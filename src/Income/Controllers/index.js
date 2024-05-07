const createIncomeController = require('./CreateIncomeController');
const deleteIncomeController = require('./DeleteIncomeController');
const getIncomeByIdController = require('./GetIncomeByIdController');
const getIncomesController = require('./GetIncomesController');
const updateIncomeController = require('./UpdateIncomecontroller');


module.exports = {
    createIncomeController,
    deleteIncomeController,
    getIncomeByIdController,
    getIncomesByUserController: getIncomesController,
    updateIncomeController,
}