const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const { postCommentValStruct } = require('../middlewares/validation.js')
const { validate, StructError } = require('superstruct')

//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    //tODO session authetication.  
    //isloggedIn
    //Authorize logic
        //validate information
        //layer 1 superstruct
    const [error, commentVald] = validate(req.body, postCommentValStruct)
    //TODO better error handling, with try/catch
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        //layer2 mongoose
        Comment.create(commentVald, (error, createdComment) => {
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
router.put('/:id', (req, res) => {
    //tODO session authetication.  
    //isloggedIn
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
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
    //tODO session authetication.  
    //isloggedIn
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
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