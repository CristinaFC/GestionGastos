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
        description: {
            type: String
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            default: 'NULL'
        },
        fixed: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamp: true
    }
)


ExpenseSchema.methods.toJSON = function ()
{
    const { __v, password, _id, ...expense } = this.toObject();
    expense.uid = _id;
    return expense;

}

module.exports = model('Expense', ExpenseSchema)