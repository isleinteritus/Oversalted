const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')

//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    const findUser = User.findById({
        _id: req.body._id
    }, (error, foundUser) => {
            if (error) {
                console.error(error)
            }
        })
    Forum.create({
        title: req.body.title,
        content: req.body.content,
        forumOwner:req.body._id
    }, (error, createdForum) => {
        if (error) {
            console.error(error)
        } else {
            //change findUser to be User.findByIdAndUpdate. Then remove the full variable usage
            findUser.updateOne({
                $push: {
                    userForum: createdForum._id
                }
            }, (error, updatedUserForum) => {
                    if (error) {
                        console.error(error)
                    }
            })
            res.json(createdForum)
        }
    })
})
///////INDEX///////
router.get('/index', (req, res)=> {
    Forum.find({
    }, (error, foundForums) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundForums)
        }
    })
})

///////SHOW///////
router.get('/:id', (req, res) => {
    Forum.findById({
        _id: req.params._id
    }, (error, foundForum) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundForum)
        }
    })
})

//UPDATE
router.put('/:id', (req,res) => {
    Forum.findByIdAndUpdate({
        _id: req.params._id
    },
    {
        ...req.body
    },
    {
        new: true
    }, (error, updatedForum) => {
        if (error) {
            console.error(error)
        } else {
            res.json(updatedForum)
        }
    })
})

//DELETE
router.delete('/:id', (req,res) => {
    Forum.findByIdAndDelete({
        _id: req.params._id
    }, (error, deletedForum) => {
        if (error) {
            console.error(error)
        } else {
            res.json(deletedForum)
        }
    })
})

module.exports = router
