const User = require("../../Auth/Model/User");
const ForbiddenException = require("../../Core/Exceptions/ForbiddenException");
const Recipient = require("../Model/Recipient");


const createRecipient = async (user, props) =>
{
    const userExists = await User.findById(user)

    if (!userExists) throw new NotFoundException(`User with id ${user} not found`)

    let { name, recipientInfo } = props

    if (!recipientInfo || recipientInfo.length === 0)
        throw new ForbiddenException("Forbidden - At least one recipient information must be provided")

    const recipient = new Recipient({ name, recipientInfo: recipientInfo, user });

    await recipient.save();

    return recipient
}

module.exports = createRecipient