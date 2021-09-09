//tag model

const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        _forum: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forum"
            }
        ]
    }
)

const Tag = monbgoose.model('Tag', tagSchema)
module.exports = Tag