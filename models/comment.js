//comment Model

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        commentOwner: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
           }
        ],
        forum: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Forum"
            }
        ],
        createdOn: {
            type: Date,
            default: Date.now
        }
    }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment