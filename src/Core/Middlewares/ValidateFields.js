const { validationResult } = require('express-validator');


const validateFields = (req, res, next) =>
{
    const errors = validationResult(req, res);


    if (!errors.isEmpty())
    {
        return res.status(400).json({
            status: "FAIL",
            data: errors,
        })
    }

    next();
}


module.exports = {
    validateFields
}

