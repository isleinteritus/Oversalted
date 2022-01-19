const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')

//ROUTES
///////CREATE///////
router.post ('/', (req, res) => {
    //comment takes in data
    //input username
    //input forum ID
    //send it off
})
///////INDEX///////
router.get('/index', (req, res)=> {
    //grabs the selected forum ID
    //grab all comments
    //Along with each ID to each comment
})

///////SHOW///////
router.get('/:id', (req, res) => {
    //grabs forum ID and renders all comments onl selected forum
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