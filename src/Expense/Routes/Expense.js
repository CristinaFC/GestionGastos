const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const hasPermission = require('../Middlewares/HasPermission')

const {
    createExpenseController,
    getExpenseByIdController,
    getExpensesByUserController,
    updateExpenseController,
    deleteExpenseController
} = require('../Controllers')
const router = Router()

router.get('/',
    [
        validateJWT,
        query('recents').optional(),
        query('limit').optional(),
        query('sort').optional(),
        query('type').optional(),
        query('category').optional().isMongoId()
    ],
    getExpensesByUserController)


router.get(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getExpenseByIdController,
)

router.post(
    '/',
    [
        validateJWT,
        check('date').not().isEmpty().isDate().escape(),
        check('amount').not().isEmpty().isFloat({ gt: 0.0 }).escape(),
        check('account').not().isEmpty().isMongoId().escape(),
        check('category').not().isEmpty().isMongoId().escape(),
        check('description').optional().isString().escape(),
        check('fixed').not().isEmpty().isBoolean().escape(),
        check('group').optional().isMongoId(),
        validateFields,
    ],
    createExpenseController,
)

router.put(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        check('date').not().isEmpty().isDate().escape(),
        check('amount').not().isEmpty().isFloat({ gt: 0.0 }).escape(),
        check('account').not().isEmpty().isMongoId().escape(),
        check('category').not().isEmpty().isMongoId().escape(),
        check('description').optional().isString().escape(),
        check('fixed').not().isEmpty().isBoolean().escape(),
        check('group').optional().isMongoId(),
        validateFields,

    ],
    updateExpenseController,
)

router.delete(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    deleteExpenseController,
)

module.exports = router
