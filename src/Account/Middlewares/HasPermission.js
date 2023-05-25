const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException')
const Account = require('../Model/Account')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const hasPermission = async (req, res, next) =>
{
    await throwExceptionIfCannotAccessUser(req)
    next()
}


const throwExceptionIfCannotAccessUser = async (req) =>
{
    const accountId = req.params.id
    const userId = req.user.id
    const account = await Account.findById(accountId);

    if (!account)
        throw new NotFoundException(`Account with the id ${accountId} not found`)

    if (account.user.toString() !== userId)
        throw new ForbiddenException('Forbidden')
}

module.exports = catchAsync(hasPermission) 