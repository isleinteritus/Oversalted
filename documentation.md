Technology used
server: express / Nodejs
Database: Mongodb

Routing system
Routes within server.js:
app.use('/user', users)
app.use('/forum', forums)
app.use('/comment', comments)
app.use('/tag', tags)

Within the routes folder is a file system that packages the information like this:
const user = require('../models/user')
const router = require('../controllers/userController.js')({
    Model: user,
    ViewPath: 'user',
    Router: require('express').Router(),
    booleanKey: ['tk']
    })
module.exports = router

This is to deliver to the controllers which are setup as one large function that takes the arguments:
Model: the database Schema
ViewPath: users path
Router: Express router system.
BooleanKey: True/false check for admin usage (pending implememtation)


Models
users
    References: forum, comment
comments
    references: User, forum
forums
    references: user, comment, tag
tags
    References forum

