//comment Model
//TODO Add a sub schema for comment schema to store users comments on a comment. Basically comments on the main forum is a sub forum, for users to leave a comment on. Thus a comment on the sub forum is a true comment.
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        commentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           },
        parentForum: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Forum'
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