const AlreadyExistsEntityException = require('../Exceptions/AlreadyExistsEntityException')

const mongoErrorHandler = (err) =>
{

    if (err.code == '11000') return new AlreadyExistsEntityException('Entity already exists')

    return Error('MongoDB error')
}


module.exports = mongoErrorHandler;