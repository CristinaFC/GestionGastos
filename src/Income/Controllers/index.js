const createIncomeController = require('./CreateIncomeController');
const deleteIncomeController = require('./DeleteIncomeController');
const getIncomeByIdController = require('./GetIncomeByIdController');
const getIncomesByUserController = require('./GetIncomesByUserController');
const updateIncomeController = require('./UpdateIncomecontroller');


module.exports = {
    createIncomeController,
    deleteIncomeController,
    getIncomeByIdController,
    getIncomesByUserController,
    updateIncomeController,
}