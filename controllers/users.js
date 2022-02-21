const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const { loggedInCheck } = require('../middlewares/authentication.js')
const { regisUserValStruct, loginUserValStruct, userValStruct } = require('../middlewares/validation.js')
const { assert, validate, coerce, create, StructError} = require('superstruct')
const { nanoid } = require('nanoid')

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
    //TODO before adding user to database, user needs to confirm idenity through email validation link. Maybe have limited access? schema for user: is validated or not? Hmn.
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

                req.session.logInKey = keyGen
                res.json(foundUser)
            }
        })
    }
})

//PLACEHOLDER:TODO test route and add extra data. 
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
router.put('/:id', loggedInCheck, (req, res) => {
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
router.delete('/:id', loggedInCheck, (req, res) => {
    //TODO add boolean to userval struct as areyousure check.
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
        }
        req.session.destroy((error, deletedSession) => {
            if (error) {
                console.error(error)
            }
        })
})

module.exports = router
