const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const hasPermission = require('../Middlewares/HasPermission')

const {
    createExpenseController,
    getExpenseByIdController,
    getExpensesController,
    updateExpenseController,
    deleteExpenseController
} = require('../Controllers')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const withTransaction = require('../../Core/Exceptions/Utils/WithTransactions')

const router = Router()

router.get('/',
    [
        validateJWT,
        query('recents').optional(),
        query('limit').optional(),
        query('month').optional(),
        query('year').optional(),
        query('category').isMongoId(),
        query('account').isMongoId(),
        query('recipient').optional().isMongoId(),
    ],
    getExpensesController)


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
        validateFields,
    ],
    catchAsync(createExpenseController, withTransaction),
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
