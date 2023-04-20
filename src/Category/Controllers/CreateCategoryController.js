const createCategory = require('../Services/CreateCategory')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createCategoryController = async (req, res) =>
{
    const { name, icon, type } = req.body
    const user = req.user

    const category = await createCategory(name, icon, user, type)

    res.status(200).json({
        status: "SUCCESS",
        data: { category },
    })
}

module.exports = catchAsync(createCategoryController)