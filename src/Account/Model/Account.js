const { Schema, model } = require('mongoose')

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

})


// AccountSchema.methods.toJSON = function ()
// {
//     const { __v, password, _id, ...user } = this.toObject();
//     user.uid = _id;
//     return user;

// }

module.exports = model('Account', AccountSchema)