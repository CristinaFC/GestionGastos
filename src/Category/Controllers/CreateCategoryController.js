const createCategory = require('../Services/CreateCategory')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')

const createCategoryController = async (req, res) =>
{
    const user = req.user

    const category = await createCategory(user, req.body)

    res.status(200).json({
        status: "SUCCESS",
        data: { category },
    })
}

module.exports = catchAsync(createCategoryController)