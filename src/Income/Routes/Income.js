const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const hasPermission = require('../Middlewares/HasPermission')

const {
    createIncomeController,
    getIncomeByIdController,
    getIncomesByUserController,
    updateIncomeController,
    deleteIncomeController
} = require('../Controllers')
const router = Router()

router.get('/',
    [
        validateJWT,
        query('recents').optional(),
        query('limit').optional(),
        query('sort').optional(),
        query('type').optional()
    ],
    getIncomesByUserController)


router.get(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getIncomeByIdController,
)

router.post(
    '/',
    [
        validateJWT,
        check('date').not().isEmpty().isDate().escape(),
        check('amount').not().isEmpty().isNumeric().escape(),
        check('account').not().isEmpty().isMongoId().escape(),
        check('category').not().isEmpty().isMongoId().escape(),
        check('description').not().isEmpty().isString().escape(),

        validateFields,
    ],
    createIncomeController,
)

router.put(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        check('date').not().isEmpty().isDate().escape(),
        check('amount').not().isEmpty().isNumeric().escape(),
        check('account').not().isEmpty().isMongoId().escape(),
        check('category').not().isEmpty().isMongoId().escape(),
        check('description').not().isEmpty().isString().escape(),
        validateFields,

    ],
    updateIncomeController,
)

router.delete(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    deleteIncomeController,
)

module.exports = router
