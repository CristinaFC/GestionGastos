const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteAccount = require("../Services/DeleteAccount");


const deleteAccountController = async (req, res) =>
{
    const { id } = req.params;

    const account = await deleteAccount(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(deleteAccountController);
