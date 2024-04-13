const { Schema, model } = require('mongoose')

const RecipientInfoSchema = new Schema({
    type: {
        type: Number,
        default: 0,
        required: true,
    },
    value: {
        type: String,
        default: 'Number'
    },
})


RecipientInfoSchema.methods.toJSON = function ()
{
    const { __v, _id, ...recipient } = this.toObject();
    recipient.uid = _id;
    return recipient;

}

module.exports = model('RecipientInfo', RecipientInfoSchema)