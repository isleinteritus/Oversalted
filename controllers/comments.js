const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')

//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    Comment.create({
        content: req.body.content,
        commentOwner: req.body._id,
        forum: req.body._id
    }, (error, createdComment) => {
        if (error) {
            console.error(error)
        } else {
            //findUser $push
            //findForum $push
            res.json(createdComment)
        }
    })
    //comment takes in data
    //input username in else statement
    //input forum ID in else statement of the comment function NOT the username else statement
    //res.json(someComment)
})
///////INDEX///////
router.get('/index', (req, res)=> {
    //grabs the selected forum ID
    //grab all comments (body and username) linked to forum ID
    //
})

///////SHOW///////
router.get('/:id', (req, res) => {
    //grabs forum ID and renders all comments on selected forum
})

//UPDATE
router.put('/:id', (req, res) => {
    //grabs comment id
    //updates info
})

//DELETE
router.delete('/:id', (req,res) => {
    //finds the comment id
    //grab the forum
    //find the user
    //remove the forum from the comment
    //remove the user
    //remove the comment

})

module.exports = router