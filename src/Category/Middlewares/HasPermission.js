const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const ForbiddenException = require('../../Core/Exceptions/ForbiddenException')
const Category = require('../Model/Category')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const hasPermission = async (req, res, next) =>
{
    await throwExceptionIfCannotAccessUser(req)
    next()
}


const throwExceptionIfCannotAccessUser = async (req) =>
{
    const categoryId = req.params.id
    const userId = req.user.id
    const category = await Category.findById(categoryId);

    if (!category)
        throw new NotFoundException(`Category with the id ${categoryId} not found`)

    if (category.user.toString() !== userId)
        throw new ForbiddenException('Forbidden')
}

module.exports = catchAsync(hasPermission) 