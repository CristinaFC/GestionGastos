const { check } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')
const hasPermission = require('../Middlewares/HasPermission')
const { getAccountByIdController,
    getAccountsByUserController,
    createAccountController,
    updateAccountController,
    deleteAccountController } = require('../Controllers')
const transferController = require('../Controllers/TransferController')

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
    '/transfer',
    [
        validateJWT,
        check('concept').not().isEmpty().isString().escape(),
        check('fromAccount').not().isEmpty().isMongoId().escape(),
        check('toAccount').not().isEmpty().isMongoId().escape(),
        check('amount').not().isEmpty().isFloat({ gt: 0.0 }).escape(),
        validateFields,
    ],
    transferController,
)


router.post(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().isString().escape(),
        check('initAmount').not().isEmpty().isNumeric().escape(),
        check('isBalance').not().isEmpty().isBoolean().escape(),
        check('icon').optional().isString().escape(),
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
        check('isBalance').not().isEmpty().isBoolean().escape(),
        check('icon').optional().isString().escape(),
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
