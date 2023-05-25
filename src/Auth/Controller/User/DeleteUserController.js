const catchAsync = require("../../../Core/Exceptions/Utils/CatchAsync");
const deleteUser = require("../../Service/User/DeleteUser");


const deleteUserController = async (req, res) =>
{
    const id = req.user;

    const user = await deleteUser(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { user },
    })
}

module.exports = catchAsync(deleteUserController);
