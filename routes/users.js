const express = require('express')
const router = express.Router()

usersController = require('../controllers/users')

router.route('/')
    .get(usersController.index)
    .post(usersController.newUser)

router.route('/:userId')
    .get(usersController.getUser)
    .put(usersController.putUser)
    .patch(usersController.patchUser)
    .delete(usersController.deleteUser)

router.route('/:userId/forums')
    .get(usersController.getUserForum)
    .post(usersController.newUserForum)

//post user comments - maybe. Might go to some specific comment route or into forum route as its part of the forum then I can tie it to the commentors name and the forums idea.

module.exports = router