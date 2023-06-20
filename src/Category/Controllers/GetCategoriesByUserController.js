const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getCategoriesByUser } = require('../Services/GetCategoriesByUser')
const { getCategoriesByUserAndType } = require('../Services/GetCategoriesByUserAndType')

const getCategoriesByUserController = async (req, res) =>
{
    const userId = req.user.id
    const { type } = req.query

    let categories;
    if (type) categories = await getCategoriesByUserAndType(userId, type)
    else categories = await getCategoriesByUser(userId)

    res.status(200).json({
        status: "SUCCESS",
        data: { categories },
    })
}

module.exports = catchAsync(getCategoriesByUserController) 