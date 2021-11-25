const Forum = require('../models/forum')
const router = require('../routeController.js')({
    //Now to figure out what goes here
    Model: Forum,
    ViewPath: 'forum',
    Router: require('express').Router(),
    booleanKey: ['tk']
    })
module.exports = router

/*
const express = require('express')
const router = express.Router()
const ForumsController = require('../controllers/forums')

router.route('/')
    .get(ForumsController.index)

router.route('/:forumId')
    .get(ForumsController.getForum)
    .delete(ForumsController.deleteForum)
    .put(ForumsController.putForum)
    .patch(ForumsController.patchForum)

//I think there should be a comments controller as well

module.exports = router
*/