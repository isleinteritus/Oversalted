// user model

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        _forum: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forum"
            }
        ],
        _userComment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.Model('User', userSchema)
module.exports = User