const NotFoundException = require('../Exceptions/NotFoundException')
const ForbiddenException = require('../Exceptions/ForbiddenException')
const mongoErrorHandler = require('./MongoErrorHandler')

const { MongoError } = require('mongodb')
const InvalidEmailOrPasswordException = require('../Exceptions/InvalidEmailOrPasswordException')
const AlreadyExistsEntityException = require('../Exceptions/AlreadyExistsEntityException')
const InvalidTokenException = require('../Exceptions/InvalidTokenException')

const errorHandler = (err, req, res, next) =>
{

    if (err instanceof InvalidEmailOrPasswordException) return build401Response(err, res);
    if (err instanceof InvalidTokenException) return build401Response(err, res)
    if (err instanceof ForbiddenException) return build403Response(err, res);
    if (err instanceof NotFoundException) return build404Response(err, res);
    if (err instanceof MongoError)
    {
        const specificError = mongoErrorHandler(err)
        if (specificError instanceof AlreadyExistsEntityException) return build409Response(err, res);
        return errorHandler(specificError, req, res, next)
    }

    return buildInternalServerErrorResponse(err, res)
}

const buildInternalServerErrorResponse = (err, res) =>
{

    res.status(500).json({
        status: "FAIL",
        message: process.env.ENV == 'prod' ? 'Internal Server Error' : err.message,
    })
}

/* BUILD 4** ERRORS*/
const build401Response = (err, res) =>
{
    buildFailResponse(res, 401, {
        status: 401,
        message: err.message || 'Unauthorized'
    })
}
const build403Response = (err, res) =>
{
    buildFailResponse(res, 403, {
        status: 403,
        message: err.message || 'Forbidden'
    })
}
const build404Response = (err, res) =>
{
    buildFailResponse(res, 404, {
        status: 404,
        message: err.message || 'Not found'
    })
}

const build409Response = (err, res) =>
{
    buildFailResponse(res, 409, {
        status: 409,
        message: err.message || 'Entity already exists'
    })
}

/* BUILD 5** ERRORS*/

const buildFailResponse = (res, statusCode, message) => res.status(statusCode).json(message)



module.exports = errorHandler 
