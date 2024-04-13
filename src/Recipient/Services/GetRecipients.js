
const NotFoundException = require('../../Core/Exceptions/NotFoundException')
const Recipient = require('../Model/Recipient')

const getRecipients = async (user) =>
{
    const recipients = await Recipient.find({ user }).populate('recipientInfo').sort({ name: 1 })

    if (!recipients) throw new NotFoundException(`Not recipients found`)

    return recipients
}


module.exports = { getRecipients }