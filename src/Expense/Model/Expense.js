const { Schema, model } = require('mongoose')

const ExpenseSchema = new Schema(
    {
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
        fixedExpenseRef: {
            type: Schema.Types.ObjectId,
            ref: 'FixedExpense',
            default: null
        },
        exchangeData: {
            rate: Number,
            value: Number,
            currency: String
        },
    },
    {
        timestamps: true
    }
)


ExpenseSchema.methods.toJSON = function ()
{
    const { __v, _id, ...expense } = this.toObject();
    expense.uid = _id;
    return expense;

}

module.exports = model('Expense', ExpenseSchema)