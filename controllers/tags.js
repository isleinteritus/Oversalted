const express = require('express')
const router = express.Router()


    //ROUTES
    ///////INDEX///////
    router.get('/index', async (req, res)=> {
        try{
            //retrieves index of requested Model
            Model.find({})//Should this pull all from database or limit query? Could frontend handle that?
            res.send({message: 'success of something'})
        }catch(error){
            res.send({message: error})
        }
    })
    //NEW
    router.get('/New', (req, res) => {
        res.send({message: 'success of something'})
    })

    //DELETE
    router.delete('/:id', async (req,res) => {
        try {
            //finds the model id and removes it from the collection
            Model.findByIdAndRemove(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })

    //UPDATE
    router.put('/:id', async (req,res) => {
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        try {
            //updates the document with the new information
            Model.findByIdAndUpdate(
                {
                    _id:req.params.id
                },
                {
                    ...req.body
                },
                {
                    new : true
                })
                res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })

    ///////CREATE///////
    router.post ('/', async (req, res) => {
        //How to handle the logic here? If true do the try catch block. If false return "you do not have permission to create this post"
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false //if false I think it should return an error that use does not have permission.
        })
        try {
            Model.create(req.body)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })
    ///////EDIT///////
    router.get('/:id/Edit', async (req, res) => {
        //placeholder for logic in mind. Basically aiming to check if user owns post and if they don't, well, they can't.
        BooleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        try {
            //retrieves the id then sends a version that is editable
            Model.findById(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })

    ///////SHOW///////
    router.get('/:id', async (req, res) => {
        try {
            //finds specific id and shows it to user
            Model.findById(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message : error})
        }
    })

    module.exports = router
