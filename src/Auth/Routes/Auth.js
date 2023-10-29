const { check } = require('express-validator')
const { Router } = require('express')

const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const loginController = require('../Controller/Auth/LoginController')
const logoutController = require('../Controller/Auth/LogoutController')

const validateJWT = require('../Middlewares/ValidateJWT')
const refreshJWTController = require('../Controller/Auth/RefreshJWTController')


const router = Router()

router.post(
    '/login',
    [
        check('email', 'email is required').trim().isEmail().not().isEmpty().escape(),
        check('password', 'password is required').not().isEmpty(),
        validateFields,
    ],
    loginController,
)

router.get(
    '/logout',
    logoutController,
)

router.post(
    '/refresh',
    [check('refreshToken', 'refreshToken is required').isJWT(), validateFields],
    refreshJWTController,
)

// router.post(
//     '/password/request',
//     [check('email', 'email is required').isEmail().escape(), validateFields],
//     requestPasswordResetController,
// )

// router.post(
//     '/password/reset',
//     [
//         check('code', 'code is required').not().isEmpty().escape(),
//         check('password', 'password is required').not().isEmpty().escape(),
//         validateFields,
//     ],
//     resetPasswordController,
// )

// router.patch(
//     '/password',
//     [
//         validateJWT,
//         check('oldPassword').not().isEmpty().escape(),
//         check('newPassword').not().isEmpty().escape(),
//         validateFields,
//     ],
//     changeUserPasswordController,
// )

module.exports = router
