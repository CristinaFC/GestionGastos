const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteCategory = require("../Services/DeleteCategory");


const deleteCategoryController = async (req, res, _, session) =>
{
    const { id } = req.params;

    const category = await deleteCategory(id, req.user, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { category },
    })
}

module.exports = catchAsync(deleteCategoryController);
