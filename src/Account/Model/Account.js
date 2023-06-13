const { Schema, model } = require('mongoose');
const Expense = require('../../Expense/Model/Expense');

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    initAmount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    isSalary: {
        type: Boolean,
        required: true
    }

})

AccountSchema.index({ name: 1, user: 1 }, { unique: true });


AccountSchema.methods.toJSON = function ()
{
    const { __v, password, _id, ...account } = this.toObject();
    account.uid = _id;
    return account;
}

module.exports = model('Account', AccountSchema)