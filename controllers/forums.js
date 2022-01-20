const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')

//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    Forum.create(req.body, (error, createdForum) => {
        if (error) {
            console.error(error)
        } else {
            //change findUser to be User.findByIdAndUpdate. Then remove the full variable usage
            User.findByIdAndUpdate(createdForum.forumOwner, {
                $push: {
                    userForum: createdForum.id
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
    Forum.find((error, foundForums) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundForums)
        }
    })
})

///////SHOW///////
router.get('/:id', (req, res) => {
    Forum.findById(req.params.id, (error, foundForum) => {
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
        _id: req.params.id
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
    Forum.findByIdAndDelete(req.params.id, (error, deletedForum) => {
        if (error) {
            console.error(error)
        } else {
            res.json(deletedForum)
        }
    })
})

module.exports = router
