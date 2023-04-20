const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getCategoriesByUser } = require('../Services/GetCategoriesByUser')

const getCategoriesByUserController = async (req, res) =>
{
    const userId = req.user.id
    const categories = await getCategoriesByUser(userId)
    res.status(200).json({
        status: "SUCCESS",
        data: { categories },
    })
}

module.exports = catchAsync(getCategoriesByUserController) 