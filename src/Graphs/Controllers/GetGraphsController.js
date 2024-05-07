const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getGraphs } = require('../Services/GetGraphs')


const getGraphsController = async (req, res) =>
{
    let data = await getGraphs(req.user);

    res.status(200).json({
        status: "SUCCESS",
        data,
    })

}
module.exports = catchAsync(getGraphsController) 