//tag model

const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        //add a description field. type string & required true
        description: {
            type: String,
            required: true
        },
        forum: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forum"
            }
        ]
    }
)

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag