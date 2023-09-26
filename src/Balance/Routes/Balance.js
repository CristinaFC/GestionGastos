const { Router } = require('express')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')
const getBalanceController = require('../Controllers/GetBalanceController')
const router = Router()

router.get('/', validateJWT, getBalanceController)


module.exports = router
