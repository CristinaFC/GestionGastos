const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteIncome = require("../Services/DeleteIncome");


const deleteIncomeController = async (req, res, _, session) =>
{
    const { id } = req.params;

    const income = await deleteIncome(id, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(deleteIncomeController);
