const { check } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const hasPermission = require('../Middlewares/HasPermission')
const { getAccountByIdController, getAccountsByUserController, createAccountController, updateAccountController, deleteAccountController } = require('../Controllers')



const router = Router()

router.get('/', validateJWT, getAccountsByUserController)

router.get(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getAccountByIdController,
)

router.post(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().isString().escape(),
        check('initAmount').not().isEmpty().isNumeric().escape(),
        check('isSalary').not().isEmpty().isBoolean().escape(),
        check('icon').not().isEmpty().isString().escape(),
        check('date').not().isEmpty().isDate(),
        validateFields,
    ],
    createAccountController,
)

router.put(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('name').not().isEmpty().isString().escape(),
        check('initAmount').not().isEmpty().isNumeric().escape(),
        check('isSalary').not().isEmpty().isBoolean().escape(),
        check('icon').not().isEmpty().isString().escape(),
        check('date').not().isEmpty().isDate(),
        validateFields,

    ],
    updateAccountController,
)

router.delete(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    deleteAccountController,
)

module.exports = router
