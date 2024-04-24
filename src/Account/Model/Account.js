const { Schema, model } = require('mongoose');
const Expense = require('../../Expense/Model/Expense');

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    totalExpenses: {
        type: Number,
        default: 0
    },
    totalIncomes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isBalance: {
        type: Boolean,
        required: true,
        default: true
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: 'Balance',
        default: null
    },
    icon: {
        type: String,
        required: false
    },
    initAmountRef: {
        type: Schema.Types.ObjectId,
        ref: 'Income',
        required: false
    }
    // date: {
    //     type: Date,
    //     required: true,
    //     default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    // },

})

AccountSchema.index({ name: 1, user: 1 }, { unique: true });


AccountSchema.methods.toJSON = function ()
{
    const { __v, password, _id, ...account } = this.toObject();
    account.uid = _id;
    return account;
}

module.exports = model('Account', AccountSchema)