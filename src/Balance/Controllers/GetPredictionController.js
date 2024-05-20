const getExpensePrediction = require('../Services/GetExpensePrediction')
const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')


const getPredictionController = async (req, res, _, session) =>
{
    const userId = req.user
    const prediction = await getExpensePrediction(userId)

    res.status(200).json({
        status: "SUCCESS",
        data: { prediction },
    })
}

module.exports = catchAsync(getPredictionController) 