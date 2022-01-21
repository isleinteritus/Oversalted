//not sure what to with this yet. As of right now - it doesn't exist. Focus on forums an comments firstly.
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Tag = require('../models/tag.js')


//ROUTES
///////CREATE///////
router.post ('/create', (req, res) => {
    Tag.create(req.body, (error, createdTag) =>{
        if (error) {
            console.error(error)
        } else {
            res.json(createdTag)
        }
    })
})
///////INDEX///////
router.get('/index', (req, res)=> {
    Tag.find((error, foundTags) => {
        if (error){
            console.error(error)
        }else{
            res.json(foundTags)
        }
    })
})

///////SHOW///////
//tag id
router.get('/:id', (req, res) => {
    //does this one need to render out the forums as well? Might be front end that splits that information
            Tag.findById(
                req.params.id, 
                (error, foundTag) => {
                if (error) {
                    console.error(error)
                } else {
                    res.json(foundTag)
                }
            })
})
//UPDATE
//tag id
router.put('/:id', (req, res) => {
    Tag.findByIdAndUpdate(
        req.params.id,
    {
        ...req.body
    }, (error, updatedTag) => {
        if (error) {
            console.error(error)
        } else {
            res.json({message: "updated tag"})
        }
    })
})
//DO NOT UNCOMMENT THIS. (╯°Д°)╯︵/(.□ . \)
router.delete('/:id', (req, res) => {
    //finds the User id and removes it from the collection
    Tag.findByIdAndRemove(
        req.params.id,
        (error, deletedTag) => {
        if (error) {
            console.error(error)
        } else {
            res.json({message: "WHY DID YOU DELETE THIS"})
        }
    })
})
module.exports = router
