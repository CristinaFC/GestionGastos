const Category = require("../../../Category/Model/Category")
const NotFoundException = require("../../../Core/Exceptions/NotFoundException")
const catchAsync = require("../../../Core/Exceptions/Utils/CatchAsync")

const cascadeDelete = async (Model, userId) =>
{

    const documents = await Model.find({ user: userId })

    if (!documents) throw new NotFoundException('Not found')

    Array.from(documents).forEach(async (doc) => await Category.deleteOne(doc))

    return

}

module.exports = catchAsync(cascadeDelete) 