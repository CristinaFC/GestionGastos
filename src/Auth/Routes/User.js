const { check } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../Middlewares/ValidateJWT')
const createUserController = require('../Controller/User/CreateUserController')
const updateUserController = require('../Controller/User/UpdateUserController')
const getUserController = require('../Controller/User/GetUserController')
const deleteUserController = require('../Controller/User/DeleteUserController')

const router = Router()

router.get(
    '/:id',
    [
        validateJWT,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getUserController,
)

router.post(
    '/',
    [
        check('name').optional().not().isEmpty().isString().escape(),
        check('lastName').optional().not().isEmpty().isString().escape(),
        check('email', 'email is required').isEmail().escape(),
        check('password', 'password is required').not().isEmpty(),
        validateFields,
    ],
    createUserController,
)

router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'ID not valid').isMongoId(),
        check('name').not().isEmpty().isString().escape(),
        check('lastName').not().isEmpty().isString().escape(),
        validateFields,

    ],
    updateUserController,
)

router.delete(
    '/:id',
    [
        validateJWT,
        check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    deleteUserController,
)

module.exports = router
