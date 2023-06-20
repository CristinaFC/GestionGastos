const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    }
})


UserSchema.methods.toJSON = function ()
{
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;

}

UserSchema.pre('remove', (next) =>
{
    this.model('Category').deleteMany({ user: this._id }, next);
});

module.exports = model('User', UserSchema)