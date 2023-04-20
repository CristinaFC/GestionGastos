const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getCategory } = require('../Services/GetCategory')

const getCategoryController = async (req, res) =>
{
    const { id } = req.params

    const category = await getCategory(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { category },
    })
}

module.exports = catchAsync(getCategoryController) 