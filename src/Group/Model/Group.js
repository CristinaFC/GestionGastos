import { Schema, model } from 'mongoose'

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expense',
        },
    ]
})


// GroupSchema.methods.toJSON = function ()
// {
//     const { __v, password, _id, ...user } = this.toObject();
//     user.uid = _id;
//     return user;

// }

export default model('Group', GroupSchema)