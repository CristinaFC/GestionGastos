const NotFoundException = require('../Exceptions/NotFoundException')
const ForbiddenException = require('../Exceptions/ForbiddenException')
const mongoErrorHandler = require('./MongoErrorHandler')

const { MongoError } = require('mongodb')

const errorHandler = (err, req, res, next) =>
{
    if (err instanceof ForbiddenException) return build403Response(err, res);
    if (err instanceof NotFoundException) return build404Response(err, res);

    if (err instanceof MongoError)
    {
        const entityAlreadyExistsError = mongoErrorHandler(err);
        return errorHandler(entityAlreadyExistsError, req, res, next);
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

/* BUILD 5** ERRORS*/

const buildFailResponse = (res, statusCode, message) => res.status(statusCode).json(message)



module.exports = errorHandler 
