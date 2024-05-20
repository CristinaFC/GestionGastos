const catchAsync = require("../../Core/Exceptions/Utils/CatchAsync");
const deleteExpense = require("../Services/DeleteExpense");


const deleteExpenseController = async (req, res, _, session) =>
{
    const { id } = req.params;

    const expense = await deleteExpense(id, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { expense },
    })
}

module.exports = catchAsync(deleteExpenseController);
