const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteExpense = require("../Services/DeleteExpense");


const deleteExpenseController = async (req, res) =>
{
    const { id } = req.params;

    const expense = await deleteExpense(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(deleteExpenseController);
