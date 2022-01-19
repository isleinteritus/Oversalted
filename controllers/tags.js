//not sure what to with this yet. As of right now - it doesn't exist. Focus on forums an comments firstly.
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

//ROUTES
///////CREATE///////
router.post ('/', (req, res) => {
})
///////INDEX///////
router.get('/index', (req, res)=> {
})

///////SHOW///////
router.get('/:id', (req, res) => {
})

//UPDATE
router.put('/:id', (req,res) => {
})

//DELETE
router.delete('/:id', (req,res) => {
})

module.exports = router
