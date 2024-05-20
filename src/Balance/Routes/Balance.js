const { Router } = require('express')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')
const getBalanceController = require('../Controllers/GetBalanceController')
const getPredictionController = require('../Controllers/GetPredictionController')
const router = Router()

router.get('/', validateJWT, getBalanceController)
router.get('/prediction', validateJWT, getPredictionController)

module.exports = router
