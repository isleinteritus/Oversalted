//not sure what to with this yet. As of right now - it doesn't exist. Focus on forums an comments firstly.
const express = require('express')
const router = express.Router()
const Tag = require('../models/tag.js')
const Forum = require('../models/forum.js')
const { tagValStruct } = require('../middlewares/validation.js')
const { validate, StructError } = require('superstruct')
const { loggedInCheck } = require('../middlewares/authentication.js')

//ROUTES
///////CREATE///////
router.post ('/create', /*loggedInCheck, isAdmin,*/ (req, res) => {
        //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
        const [error, tagVal] = validate(req.body, tagValStruct)
        //TODO better error handling, with try/catch
        if (error instanceof StructError) {
            console.error(error)
            res.json(error)
        } else {
        Tag.create(tagVal, (error, createdTag) =>{
            if (error) {
                console.error(error)
            } else {
                res.json(createdTag)
            }
        })
    }
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
router.put('/:id', /*loggedInCheck, isAdmin,*/(req, res) => {
    //Authorize logic
    //validate information
    //layer 1 superstruct
    //layer2 mongoose
    const [error, tagVal] = validate(req.body, tagValStruct)
    //TODO better error handling, with try/catch
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        Tag.findByIdAndUpdate(
            req.params.id,
        {
            ...tagVal
        }, (error, updatedTag) => {
            if (error) {
                console.error(error)
            } else {
                res.json({message: "updated tag"})
            }
        })
    }
})
//potential edge cases of having one tag only in the forum. All forums require >=1 tag
router.delete('/:id', /*loggedInCheck, isAdmin,*/ (req, res) => {
    Tag.findByIdAndDelete(
        req.params.id, 
        (error, deletedTag) => {
        if (error) {
            console.error(error)
        } else {

            Forum.updateMany({}, {
                $pull: {
                    parentTags: {
                        $in: deletedTag._id
                    }
                }
            }, (error, updatedForumTag) => {
                if (error) {
                    console.error(error)
                }
            })

            res.json({message: "Tag deleted"})
        }
    })
})

module.exports = router
