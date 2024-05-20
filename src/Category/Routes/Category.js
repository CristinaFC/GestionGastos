const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')
const createCategoryController = require('../Controllers/CreateCategoryController')
const updateCategoryController = require('../Controllers/UpdateCategoryController')
const deleteCategoryController = require('../Controllers/DeleteCategoryController')
const getCategoryController = require('../Controllers/GetCategoryController')
const getCategoriesByUserController = require('../Controllers/GetCategoriesByUserController')
const hasPermission = require('../Middlewares/HasPermission')

const router = Router()

router.get('/',
    [
        validateJWT,
        query('type').optional(),
        query('limit').optional(),
    ],
    getCategoriesByUserController)



router.get(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getCategoryController,
)

router.post(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().isString().escape(),
        check('icon').not().isEmpty().isString().escape(),
        check('type').not().isEmpty().isString(),
        check('limit').optional().isNumeric(),
        validateFields,
    ],
    createCategoryController,
)

router.put(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        check('name').not().isEmpty().isString().escape(),
        check('icon').not().isEmpty().isString().escape(),
        check('type').not().isEmpty().isString(),
        check('limit').isNumeric(),
        validateFields,

    ],
    updateCategoryController,
)

router.delete(
    '/:id',
    [
        validateJWT,
        hasPermission,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    deleteCategoryController,
)

module.exports = router
