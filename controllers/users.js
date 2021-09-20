//Later this will be ditched to be an auth path however for testing other routes this should work in its place.
const User = require('../models/user')
const Forum = require('../models/forum')
const Comment = require('../models/comment')

module.exports = {
    //user
    index: async (req, res, next) => {
        try{
            const users = await User.find({})//limit(10) would be useful if I wanted to limit the query
            res.json({message: users})
        }catch(error){
            res.json({message: error})
        }
    },
    //creates a new user
    newUser: async (req, res, next) => {
        try{
            const user = await User.findById(req.params.userId)
        }catch(error){
            res.json({message: error})
        }
    },

    getUser: async (req, res, next) => {
        try{
            const user = await User.findById(req.params.userId)
            res.json({message: user})
        }catch(error){
            res.json({message: error})
        }
    },
    //todo enforce all updates to replace user
    putUser: async (req, res, next) => {
        const replaceUser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(replaceUser, newUser)
            res.status(200).json({message: result})
        }catch(error){
            res.json({message: error})
        }
    },

    patchUser: async (req, res, next) => {
        const patchuser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(patchUser, newUser)
            res.status(200).json({message: result})
        }catch(error){
            res.json({message: error})
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const removedUser = User.remove({_id: req.params.userId})
        }catch(error){
            res.json({message: error})
        }
    },

//User => Forum
    getUserForums: async (req, res, next) => {
        const userId = req.params.userId
        const user = await User.findById(userId)
        try {
            res.status(200).json(user._forum)
        }catch(error){
            res.json({message:error})
        }
    },

    newUserForum: async (req, res, next) => {
        const userId = req.params.userId
        //create new forum with users request
        const newForum = new Forum(req.body)
        //get user
        const user = await User.findById(userId)
        try {
            //assigns user as the forums owner in reference the the forumSchema and assiging it an owner
            newForum._owner = user
            await newForum.save()
            user._forum.push(newForum)
            await user.save()
            res.status(200).json({createdForum : newForum})
        }catch(error) {
            res.json({createdForum: error})
        }
    },

    //user => comment
    getComment: async (req, res, next) =>{
        const userId = req.params.userId
        const user = await User.findById(userId)
        try {
            res.status(200).json(user._comment)
        }catch(error){
            res.json({message: error})
        }
    },

    //add a newUserComment
}