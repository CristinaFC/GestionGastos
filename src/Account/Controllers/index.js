const createAccountController = require('./CreateAccountController');
const deleteAccountController = require('./DeleteAccountController');
const getAccountByIdController = require('./GetAccountByIdController');
const getAccountsByUserController = require('./GetAccountsByUserController');
const updateAccountController = require('./UpdateAccountController');


module.exports = {
    createAccountController,
    deleteAccountController,
    getAccountByIdController,
    getAccountsByUserController,
    updateAccountController,
}