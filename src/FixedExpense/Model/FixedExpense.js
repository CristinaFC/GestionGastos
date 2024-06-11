const { Schema, model } = require('mongoose')

const FixedExpenseSchema = new Schema(
    {
        initDate: {
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
        period: {
            type: Number,
            required: true,
            default: 2
        },
        lastInsertion: {
            type: Date,
            default: null
        },
        nextInsertion: {
            type: Date,
            default: null
        },
        hasEndDate: {
            type: Boolean,
            default: false,
        },
        endDate: {
            type: Date,
            default: null
        },
        status: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true
    }
)


FixedExpenseSchema.methods.toJSON = function ()
{
    const { __v, _id, ...fixedExpense } = this.toObject();
    fixedExpense.uid = _id;
    return fixedExpense;

}

module.exports = model('FixedExpense', FixedExpenseSchema)