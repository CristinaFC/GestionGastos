const { Schema, model } = require('mongoose')

const RecipientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    recipientInfo:
        [{
            type: {
                type: Number,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

RecipientSchema.methods.toJSON = function ()
{
    const { __v, _id, ...recipient } = this.toObject();
    recipient.uid = _id;
    return recipient;

}

module.exports = model('Recipient', RecipientSchema)


