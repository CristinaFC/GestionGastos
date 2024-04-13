const { Schema, model } = require('mongoose')

const RecipientInfoSchema = new Schema({
    type: {
        type: Number,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'Recipient',
        required: true,
    },
});

RecipientInfoSchema.methods.toJSON = function ()
{
    const { __v, _id, ...recipient } = this.toObject();
    recipient.uid = _id;
    return recipient;

}

const RecipientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    recipientInfo: [RecipientInfoSchema],
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

module.exports = {
    Recipient: model('Recipient', RecipientSchema),
    RecipientInfo: model('RecipientInfo', RecipientInfoSchema),
};


