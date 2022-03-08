//tag model

const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        taggedForums: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Forum'
            }
        ]
    }
)

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag