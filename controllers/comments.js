const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const { commentValStruct } = require('../middlewares/validation.js')
const { validate, StructError } = require('superstruct')
const { loggedInCheck } = require('../middlewares/authentication.js')

//ROUTES
///////CREATE///////
router.post ('/create', loggedInCheck, (req, res) => {
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
    const [error, commentVal] = validate(req.body, commentValStruct)
    //TODO better error handling, with try/catch
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        Comment.create(commentVal, (error, createdComment) => {
            if (error) {
                console.error(error)
            } else {

                User.findByIdAndUpdate(createdComment.commentOwner, {
                    $push: {
                        userComments: createdComment.id
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
    }
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
router.put('/:id', loggedInCheck, (req, res) => {
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
    const [error, commentVal] = validate(req.body, commentValStruct)
    //TODO better error handling, with try/catch
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        Comment.findByIdAndUpdate(
            req.params.id, 
            {
                ...commentVal
            }, (error, updatedComment) => {
                if (error) {
                    console.error(error)
                } else {
                    res.json({message:"successful"})
                }
            }
        )
    }
})

//DELETE
//comment id
router.delete('/:id', loggedInCheck, (req,res) => {
        Comment.findByIdAndDelete(
            req.params.id, 
            (error, deletedComment) => {
            if (error) {
                console.error(error)
            } else {

                User.updateOne({}, {
                    $pull: {
                        userComments: {
                            $in: deletedComment._id
                        }
                    }
                }, (error, updatedUserComment) => {
                    if (error) {
                        console.error(error)
                    }
                })

                Forum.updateOne({}, {
                    $pull: {
                        comments: {
                            $in: deletedComment._id
                        }
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