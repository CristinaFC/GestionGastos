const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const hasPermission = require('../Middlewares/HasPermission')

const {
    createFixedExpenseController,
    getFixedExpensesByUserController,
} = require('../Controllers')
const updateFixedExpenseController = require('../Controllers/UpdateFixedExpenseController')
const getFixedExpenseByIdController = require('../Controllers/GetFixedExpenseByIdController')

const router = Router()

router.get('/',
    [
        validateJWT,
        query('recents').optional(),
        query('limit').optional(),
        query('month').optional(),
        query('year').optional(),
        query('category').optional().isMongoId(),
        query('account').optional().isMongoId(),

    ],
    getFixedExpensesByUserController)

router.get(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getFixedExpenseByIdController,
)

router.post(
    '/',
    [
        validateJWT,
        check('initDate').not().isEmpty().isDate().escape(),
        check('amount').not().isEmpty().isFloat({ gt: 0.0 }).escape(),
        check('account').not().isEmpty().isMongoId(),
        check('category').not().isEmpty().isMongoId(),
        check('concept').not().isEmpty().isString().escape(),
        check('period').not().isEmpty().isNumeric().escape(),
        check('hasEndDate').not().isEmpty().isBoolean().escape(),
        check('endDate').optional().isDate().escape(),
        validateFields,
    ],
    createFixedExpenseController,
)


router.put(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('initDate').optional().isDate().escape(),
        check('amount').optional().isFloat({ gt: 0.0 }).escape(),
        check('account').optional().isMongoId().escape(),
        check('category').optional().isMongoId().escape(),
        check('description').optional().isString().escape(),
        check('period').optional().isNumeric().escape(),
        check('hasEndDate').optional().isBoolean().escape(),
        check('endDate').optional().optional().isDate().escape(),
        check('status').optional().isNumeric(),
        validateFields,

    ],
    updateFixedExpenseController,
)

// router.delete(
//     '/:id',
//     [
//         validateJWT,
//         hasPermission,
//         check('id', 'ID not valid').isMongoId(),
//         validateFields
//     ],
//     deleteExpenseController,
// )

module.exports = router
