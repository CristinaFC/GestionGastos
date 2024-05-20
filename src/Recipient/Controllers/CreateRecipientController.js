const catchAsync = require('../../Core/Exceptions/Utils/CatchAsync')
const createRecipient = require('../Services/CreateRecipient')

const createRecipientController = async (req, res, _, session) =>
{
    const user = req.user

    const recipient = await createRecipient(user, req.body, session)
    res.status(200).json({
        status: "SUCCESS",
        data: { recipient: recipient },
    })
}

module.exports = catchAsync(createRecipientController)