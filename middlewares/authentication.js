const User = require('../models/user.js')
const express = require('express')
const session = require('express-session')

//not sure if I will use these. May just have to write my own specific checks that cater towards each route. Yikes. 
const loggedIn = (req, res, next) => {
    if (!req.session || !req.session.logInKey) {
        return false
    }
    next()
}

const authentic = (req, res, next) => {
    const sessionLogInKey = req.session.logInKey
    const user = req.body
    if (loggedIn() === false) {
        res.json({ message: "not logged in" })
    } else {
        User.findOne(user, (error, foundUser) => {
            if (error) {
                console.error(error)
            } else if(foundUser.logInKey === sessionLogInKey) {
                next()
            } else {
                res.json({message: "You don't have access to this"})
            }
        })
    }

    next()
}

module.exports = authentic