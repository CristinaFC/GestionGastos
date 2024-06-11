const { Schema, model } = require('mongoose')

const BlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
    }
);


module.exports = model('Blacklist', BlacklistSchema)

