const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getAccount } = require('../Services/GetAccountById')

const getAccountController = async (req, res) =>
{
    const { id } = req.params

    const account = await getAccount(id)
    res.status(200).json({
        status: "SUCCESS",
        data: { account },
    })
}

module.exports = catchAsync(getAccountController) 