const { Schema, model } = require('mongoose')

const ExpenseSchema = new Schema({
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
    }
})


// ExpenseSchema.methods.toJSON = function ()
// {
//     const { __v, password, _id, ...user } = this.toObject();
//     user.uid = _id;
//     return user;

// }

module.exports = model('Expense', ExpenseSchema)