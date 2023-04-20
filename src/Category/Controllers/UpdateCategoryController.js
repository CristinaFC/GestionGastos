const updateCategory = require('../Services/UpdateCategory')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const updateCategoryController = async (req, res) =>
{
    const { user, body } = req
    const { id } = req.params

    const category = await updateCategory(id, body)
    res.status(200).json({
        status: "SUCCESS",
        data: { category },
    })
}

module.exports = catchAsync(updateCategoryController)
