const { Schema, model } = require('mongoose')

const IncomeSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    concept: {
        type: String,
        required: true,
        default: '',
    },
})


IncomeSchema.methods.toJSON = function ()
{
    const { __v, _id, ...income } = this.toObject();
    income.uid = _id;
    return income;

}

module.exports = model('Income', IncomeSchema)