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
        userForums: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forum"
            }
        ],
        userComments: [
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