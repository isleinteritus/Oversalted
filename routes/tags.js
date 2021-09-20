const express = require('express')
const router = express.Router()
const TagsController = require('../controllers/tags')

router.route()

/*
const Tag = require('../models/tag')

//show all tags
//renders a list of all the tags
//todo renders name and a small body of a description for the tag
router.get('/', async (req, res) => {
    try{
        const tags = await Tag.find()//limit(10) would be useful if I wanted to add a limit to the query
    }catch(error){
        res.json({message: error})
    }
})

//deletes tag
router.delete('/:tagId', async (req, res) => {
    try {
        const removedTag = Tag.remove({_id: req.params.tagId})
        res.status(200).json({message: "You've destroyed the file"})
    }catch(error){
        res.json({message: error})
    }

})

//patches a tag
router.patch('/:tagId', async (req, res) => {
    try {
        const updatedTag = await Tag.updateOne(
            {_id: req.params.tagId},
            {
                $set: {
                    name: req.body.name
                }
            }
        )
        res.json({message: updatedTag})
    }catch(error){
        res.json({message: error})
    }
})

//create a tag
//a new tag
//todo Admibn acccess only to creating new tags
router.post('/', async (req, res) =>{
    const tag = new Tag({
        name: req.body.name,
        body: req.body.body
    })
    try{
        const tagPost = await tag.save()
        res.json({message: error})
    }catch(error){
        res.json({message: error})
    }
})

//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  tag = new Tag({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     tag.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })

//show requested tag
//todo Add that when a user selects a tag that all rewlated pages with said tag renders an index.
//todo When able to render all related pages as an index limit amount by n and use pagination
router.get('/:tagId', async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.tagId)
        res.json({message: tag})
    }catch(error){
        res.json({message: error})
    }
})

module.exports = router
*/