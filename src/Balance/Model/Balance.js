const { Schema, model } = require('mongoose');

const BalanceSchema = new Schema({
    totalIncomes: {
        type: Number,
        required: true,
        default: 0
    },
    totalExpenses: {
        type: Number,
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    }
)

BalanceSchema.index({ user: 1 }, { unique: true });


BalanceSchema.methods.toJSON = function ()
{
    const { __v, _id, ...balance } = this.toObject();
    balance.uid = _id;
    return balance;
}

module.exports = model('Balance', BalanceSchema)