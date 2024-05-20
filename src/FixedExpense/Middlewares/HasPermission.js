const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const FixedExpense = require('../Model/FixedExpense')

const hasPermission = async (req, res, next) =>
{
    await throwExceptionIfCannotAccessUser(req)
    next()
}


const throwExceptionIfCannotAccessUser = async (req) =>
{
    const expenseId = req.params.id
    const userId = req.user.id
    const fixedExpense = await FixedExpense.findById(expenseId);

    if (!fixedExpense)
        throw new NotFoundException(`Expense with the id ${expenseId} not found`)

    if (fixedExpense.user.toString() !== userId)
        throw new ForbiddenException('Forbidden')
}

module.exports = catchAsync(hasPermission) 