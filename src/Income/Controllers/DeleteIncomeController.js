const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteIncome = require("../Services/DeleteIncome");


const deleteIncomeController = async (req, res) =>
{
    const { id } = req.params;

    const income = await deleteIncome(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { income },
    })
}

module.exports = catchAsync(deleteIncomeController);
