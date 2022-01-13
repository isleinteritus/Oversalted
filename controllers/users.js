const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

//ROUTES
///////CREATE (signup)///////
router.post('/signup', (req, res) => {
    //could change req.body to req.body.name/email/password
        User.create(req.body, (error, createdUser) =>{
            if (error) {
                console.error(error)
            } else {
                res.json(createdUser)
            }
        })
})
router.post('/login', (req, res) =>{
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, (error, foundUser) =>{
            if (error) {
                console.error(error)
            } else {
                res.json(foundUser)
            }
        })
})
///////INDEX///////
router.get('/index', (req, res)=> {
        //retrieves index of requested User
        User.find({
        }, (error, foundUsers) => {
            if (error) {
                console.error(error)
            } else {
                res.json(foundUsers)
            }
        })//Should this pull all from database or limit query? find all from back end and only send back what the frontend sends abstract names:'page' 'skip'
})
///////SHOW///////
router.get('/:id', (req, res) => {
        //finds specific id and shows it to user
        User.findById({
            _id: req.params.id
        }, (error, foundUser) => {
            if (error) {
                console.error(error)
            } else {
                res.json(foundUser)
            }
        })
})
//UPDATE
router.put('/:id', (req, res) => {
        //updates the document with the new information
        User.findByIdAndUpdate({
            _id: req.params.id
        },
        { //which information should go here?
            ...req.body
        },
        {
            new: true
        }, (error, updatedUser) => {
            if (error) {
                console.error(error)
            } else {
                res.json(updatedUser)
            }
        })
})
//DELETE
//todo check if user has permission to delete their account. requires token so ignore this for now on all controllers until ready to implement
router.delete('/:id', (req,res) => {
        //finds the User id and removes it from the collection
        User.findByIdAndRemove({
            _id: req.params.id
        }, (error, deletedUser) => {
            if (error) {
                console.error(error)
            } else {
                res.json(deletedUser)
            }
        })
})
module.exports = router
