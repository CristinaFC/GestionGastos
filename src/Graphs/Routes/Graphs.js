const { check, query } = require('express-validator')
const { Router } = require('express')
const { validateFields } = require('../../Core/Middlewares/ValidateFields')
const validateJWT = require('../../Auth/Middlewares/ValidateJWT')
const getIncomesController = require('../Controllers/GetIncomesController')
const getExpensesController = require('../Controllers/GetExpensesController')


const router = Router()

router.get('/incomes',
    [
        validateJWT,
        query("account").optional().isBoolean()
    ],
    getIncomesController
)

router.get('/expenses',
    [
        validateJWT,
        query("account").optional().isBoolean()
    ],
    getExpensesController
)





module.exports = router
