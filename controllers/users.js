const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const { loggedIn } = require('../middlewares/authentication.js')
const { regisUserValStruct, loginUserValStruct, userValStruct } = require('../middlewares/validation.js')
const { assert, validate, coerce, create, StructError} = require('superstruct')
const { nanoid } = require('nanoid')
const { defineRulesFor } = require('../middlewares/userControl.js')

//ROUTES
///////CREATE USER///////
router.post('/register', (req, res) => {
    const [error, userVal] = validate(req.body, regisUserValStruct)
    //TODO better error handling, with try/catch
    //https://docs.superstructjs.org/guides/05-handling-errors
   if (error instanceof StructError) {
       console.error(error)
       res.json(error)
   } else {
        User.create(
            userVal
        , (error, createdUser) =>{
                if (error) {
                    console.error(error)
                } else {
                    res.json(createdUser)
                }
        })
    }
   //TODO before adding user to database, user needs to confirm idenity through email validation link.
    //Maybe have limited access? schema for user: is validated or not? Hmn.
})

router.post('/login', (req, res) => {
const [error, userInfo] = validate(req.body, loginUserValStruct)
    if (error) {
        console.error(error)
    } else {

        User.findOne(
            userInfo,
        (error, foundUser) =>{
            if (error) {
                console.error(error)
            } else {
                const keyGen = nanoid()
                User.updateOne(foundUser, {
                    logInKey: keyGen
                }, (error, updatedUser) => {
                        if (error) {
                            console.error(error)
                        }
                    })
                //creates a login key to register to the user as a layer of identity protection from the user and the session. This key is destroyed on logout.
                req.session.logInKey = keyGen
                //defines the rules on login for the user to access on login.
                req.session.rules = defineRulesFor(user)
                res.json(foundUser)
            }
        })
    }
})

router.post('/logout', (req, res) => {
    const user = req.body
    User.findOne(
        user,
    (error, foundUser) =>{
        if (error) {
            console.error(error)
        } else {

            User.updateOne(foundUser,
                {
                    logInKey: ""
                }
                , (error, updatedUser) => {
                    if (error) {
                        console.error(error)
                    }
                })
        }
    })

    req.session.destroy((error, deletedSession) => {
        if (error) {
            console.error(error)
        }
    })

    res.json({message : "you've been logged out"})
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

//UPDATE
//user id
router.put('/:id', loggedIn, (req, res) => {
    //Authorize logic
            //validate information
            //layer 1 superstruct
            //layer2 mongoose
    const [error, userVal] = validate(req.body, userValStruct)
    //TODO better error handling, with try/catch
    //https://docs.superstructjs.org/guides/05-handling-errors
   if (error instanceof StructError) {
       console.error(error)
       res.json(error)
   } else {
        User.findByIdAndUpdate(
            req.body.id,
        {
            ...userVal
        }, (error, updatedUser) => {
            if (error) {
                console.error(error)
            } else {
                res.json({message: "updated user"})
            }
        })
        //session regen
   }
})

//DELETE
//user ID
router.delete('/:id', loggedIn, (req, res) => {
//TODO validation for that this is the user asking to delete requested user
            User.findByIdAndRemove(
                req.params.id,
                (error, deletedUser) => {
                if (error) {
                    console.error(error)
                } else {

                    Forum.updateMany({}, {
                        forumOwner: null
                    }, (error, deletedForum) => {
                        if (error) {
                            console.error(error)
                        }
                    })
                    //TODO this one needs to be fixed
                    Comment.updateMany({}, {
                        //.TODO PLACEHOLDER TEXT FOR FUTURE USAGE.
                            commentOwner: null
                    }, (error, deletedComment) => {
                        if (error) {
                            console.error(error)
                        }
                    })

                    res.json({message: "user committed not alive"})
                }
            })
        req.session.destroy((error, deletedSession) => {
            if (error) {
                console.error(error)
            }
        })
})

module.exports = router
