//not sure what to with this yet. As of right now - it doesn't exist. Focus on forums an comments firstly.
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

//ROUTES
///////CREATE///////
router.post ('/', (req, res) => {
    User.create(req.body)
    res.json({message: 'success of something'})
})
///////INDEX///////
router.get('/index', (req, res)=> {
    //retrieves index of requested User
    User.find({})//Should this pull all from database or limit query? Could frontend handle that?
    res.json({message: 'success of something'})
})

///////SHOW///////
router.get('/:id', (req, res) => {
    //finds specific id and shows it to user
    User.findById(req.params.id)
    res.json({message: 'success of something'})
})

//UPDATE
router.put('/:id', (req,res) => {
    //updates the document with the new information
    User.findByIdAndUpdate(
        {
            _id:req.params.id
        },
        {
            ...req.body
        },
        {
            new : true
        })
        res.json({message: 'success of something'})
})

//DELETE
router.delete('/:id', (req,res) => {
    //finds the User id and removes it from the collection
    User.findByIdAndRemove(req.params.id)
    res.json({message: 'success of something'})
})

module.exports = router
