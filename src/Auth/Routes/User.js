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
    '/',
    [
        validateJWT,
        // check('id', 'ID not valid').isMongoId(),
        validateFields
    ],
    getUserController,
)

router.post(
    '/',
    [
        check('name').not().isEmpty().isString().escape(),
        check('lastName').not().isEmpty().isString().escape(),
        check('email', 'email is required').isEmail().escape(),
        check('password', 'password is required').not().isEmpty().escape(),
        validateFields,
    ],
    createUserController,
)

router.put(
    '/',
    [
        validateJWT,
        check('name').not().isEmpty().isString().escape(),
        check('lastName').not().isEmpty().isString().escape(),
        check('email').not().isEmpty().isString().escape(),
        validateFields,

    ],
    updateUserController,
)

router.delete(
    '/',
    [
        validateJWT,
        validateFields
    ],
    deleteUserController,
)

module.exports = router
