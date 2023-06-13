const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const Income = require('../Model/Income')

const hasPermission = async (req, res, next) =>
{
    await throwExceptionIfCannotAccessUser(req)
    next()
}


const throwExceptionIfCannotAccessUser = async (req) =>
{
    const incomeId = req.params.id
    const userId = req.user.id
    const income = await Income.findById(incomeId);

    if (!income)
        throw new NotFoundException(`Income with the id ${incomeId} not found`)

    if (income.user.toString() !== userId)
        throw new ForbiddenException('Forbidden')
}

module.exports = catchAsync(hasPermission) 