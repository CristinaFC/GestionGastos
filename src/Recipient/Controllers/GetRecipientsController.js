const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const { getRecipients } = require('../Services/GetRecipients')

const getRecipientsController = async (req, res, _, session) =>
{
    const userId = req.user.id

    let recipients = await getRecipients(userId)

    res.status(200).json({
        status: "SUCCESS",
        data: { recipients },
    })
}

module.exports = catchAsync(getRecipientsController) 