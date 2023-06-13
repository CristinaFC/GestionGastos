const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const Expense = require('../Model/Expense')

const hasPermission = async (req, res, next) =>
{
    await throwExceptionIfCannotAccessUser(req)
    next()
}


const throwExceptionIfCannotAccessUser = async (req) =>
{
    const expenseId = req.params.id
    const userId = req.user.id
    const expense = await Expense.findById(expenseId);

    if (!expense)
        throw new NotFoundException(`Expense with the id ${expenseId} not found`)

    if (expense.user.toString() !== userId)
        throw new ForbiddenException('Forbidden')
}

module.exports = catchAsync(hasPermission) 