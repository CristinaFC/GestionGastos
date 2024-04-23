const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        default: 'Expense',
        required: true
    },
    limit: {
        type: Number,
        default: 0,
        required: false
    },
    monthlyExpenses: [{
        month: Number,
        year: Number,
        total: Number
    }],
    readOnly: {
        type: Boolean,
        default: false
    }

})

CategorySchema.index({ name: 1, user: 1 }, { unique: true });
CategorySchema.methods.toJSON = function ()
{
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;

}

module.exports = model('Category', CategorySchema)