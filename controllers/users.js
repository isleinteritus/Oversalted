const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const authentic = require('../middlewares/authenticate.js')
const {registerValidation} = require('../middlewares/validation.js')

//ROUTES
///////CREATE USER///////
router.post('/register', (req, res) => {
    registerValidation.validate(req.body, {
        abortEarly: false
    })

    const { email, name, password } = req.body
    const found = User.exists({email})

    if (found) {
        res.send('Invalid email or password')
    }

    User.create({
        email,
        name,
        password,
    }, (error, createdUser) =>{
            if (error) {++

                
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
            req.session.email = foundUser.email
            res.json(foundUser)
        }
    })
})

//PLACEHOLDER:TODO test route and add extra data. 
router.post('/logout', (req, res) => {
    User.findOne({})
    req.session.destroy((error, deletedSession) => {
        if (error) {
            console.error(error)
        } else {
            res.redirect('/')
        }
    })
})

///////INDEX///////
router.get('/index', (req, res)=> {
    User.find({
    }, (error, foundUsers) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundUsers)
        }
    })
})

///////SHOW///////
//user id
router.get('/:id', (req, res) => {
    //finds specific id and shows it to user
    User.findById(
        req.params.id, 
        (error, foundUser) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundUser)
        }
    })
})

//NOTE: All routes below this point /should be/ routes accessed through authentication.

//UPDATE
//user id
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
    {
        ...req.body
    }, (error, updatedUser) => {
        if (error) {
            console.error(error)
        } else {
            res.json({message: "updated user"})
        }
    })
})

//DELETE
//todo check if user has permission to delete their account. requires token so ignore this for now on all controllers until ready to implement
//user ID
router.delete('/:id', (req, res) => {
    //finds the User id and removes it from the collection
    User.findByIdAndRemove(
        req.params.id,
        (error, deletedUser) => {
        if (error) {
            console.error(error)
        } else {

            Forum.updateMany({}, {
                $pull: {
                    userForums: {
                        $in: deletedUser._id
                    }
                }
            }, (error, deletedForum) => {
                if (error) {
                    console.error(error)
                }
            })

            Comment.updateMany({}, {
                $pull: {
                    commentOwner: {
                        $in: deletedComment._id
                    }
                }
            }, (error, deletedComment) => {
                if (error) {
                    console.error(error)
                }
            })

            res.json({message: "user committed not alive"})
        }
    })
})

module.exports = router
