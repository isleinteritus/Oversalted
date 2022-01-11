const express = require('express')
const router = express.Router()

    //ROUTES
    ///////INDEX///////
    router.get('/index', (req, res)=> {
        try{
            //retrieves index of requested Model
            Model.find({})//Should this pull all from database or limit query? find all from back end and only send back what the frontend sends abstract names:'page' 'skip'
            res.send({message: 'success of something'})
        }catch(error){
            res.send({message: error})
        }
    })

    //DELETE
    //todo check if user has permission to delete their account. requires token so ignore this for now on all controllers until ready to implement
    router.delete('/:id', (req,res) => {
        try {
            //finds the model id and removes it from the collection
            Model.findByIdAndRemove(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })

    //UPDATE
    router.put('/:id', (req,res) => {
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
    ///////CREATE (signup)///////
    router.post ('/signup', (req, res) => {
        try {
            Model.create(req.body)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })
    ///////EDIT///////
    router.get('/:id/Edit', (req, res) => {
        //placeholder for logic in mind.
        try {
            //retrieves the id then sends a version that is editable
            Model.findById(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message: error})
        }
    })

    ///////SHOW///////
    router.get('/:id', (req, res) => {
        try {
            //finds specific id and shows it to user
            Model.findById(req.params.id)
            res.send({message: 'success of something'})
        } catch (error) {
            res.send({message : error})
        }
    })
    module.exports = router
