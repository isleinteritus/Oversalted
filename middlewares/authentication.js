const User = require('../models/user.js')
const express = require('express')
const session = require('express-session')

//not sure if I will use these. May just have to write my own specific checks that cater towards each route. Yikes. 
const logInCheck = (req, res, next) => {
    if (!req.session || !req.session.logInKey) {
        res.json({message: "You must log in to use that action"})
        next()
    }
    next()
}

module.exports = {
    logInCheck
}