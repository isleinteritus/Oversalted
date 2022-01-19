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
        userForum: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forum"
            }
        ],
        userComment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        createdOn: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User