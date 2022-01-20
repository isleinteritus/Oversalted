const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')

//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    Comment.create(req.body, (error, createdComment) => {
        if (error) {
            console.error(error)
        } else {
            User.findByIdAndUpdate(createdComment.commentOwner, {
                $push: {
                    userComment: createdComment.id
                }
            }, (error, updatedUserComment) => {
                if (error) {
                    console.error(error)
                }
            })
            Forum.findByIdAndUpdate(createdComment.parentForum, {
                $push: {
                    comments: createdComment.id
                }
            }, (error, updatedForumComment) => {
                if (error) {
                    console.error(error)
                }
            })
            res.json(createdComment)
        }
    })
})
///////INDEX///////
//forum ID
router.get('/:id', (req, res)=> {
    Comment.find({parentForum: req.params.id}, (error, foundComments) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundComments)
        }
    })
})

//UPDATE
//comment id
router.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate(
        req.params.id, 
        {
            ...req.body
        }, (error, updatedComment) => {
            if (error) {
                console.error(error)
            } else {
                res.json({message:"successful"})
            }
        })
})

//DELETE
//comment id
router.delete('/:id', (req,res) => {
    Comment.findByIdAndDelete(req.params.id, (error, deletedComment) => {
        if (error) {
            console.error(error)
        } else {
            User.findByIdAndUpdate(deletedComment.commentOwner, {
                $pull: {
                    userComment: deletedComment.id
                }
            }, (error, updatedUserComment) => {
                if (error) {
                    console.error(error)
                }
            })
            Forum.findByIdAndUpdate(deletedComment.parentForum, {
                $pull: {
                    comments: deletedComment.id
                }
            }, (error, updatedForumComment) => {
                if (error) {
                    console.error(error)
                }
            })
            res.json({message: "Comment deleted"})
        }
    })
})

module.exports = router