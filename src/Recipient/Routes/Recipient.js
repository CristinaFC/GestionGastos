const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')

const {
    getRecipientsController,
    createRecipientController,
} = require('../Controllers')

const router = Router()

router.get('/',
    [
        validateJWT,
        query('name').not().isEmpty(),
        query('info').not().isEmpty(),
    ],
    getRecipientsController)

router.post(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().escape(),
        check('recipientInfo').notEmpty(),
        validateFields,
    ],
    createRecipientController,
)

//router.get(
//    '/:id',
//    [
//        validateJWT,
//        hasPermission,
//        check('id', 'ID not valid').isMongoId(),
//        validateFields
//    ],
//    getFixedExpenseByIdController,
//)




//router.put(
//    '/:id',
//    [
//        validateJWT,
//        hasPermission,
//        check('date').not().isEmpty().isDate().escape(),
//        check('amount').not().isEmpty().isFloat({ gt: 0.0 }).escape(),
//        check('account').not().isEmpty().isMongoId().escape(),
//        check('category').not().isEmpty().isMongoId().escape(),
//        check('description').optional().isString().escape(),
//        check('period').not().isEmpty().isNumeric().escape(),
//        check('hasEndDate').not().isEmpty().isBoolean().escape(),
//        check('endDate').optional().isDate().escape(),
//        validateFields,
//
//    ],
//    updateFixedExpenseController,
//)

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
