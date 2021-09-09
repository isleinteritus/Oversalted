const Forum = require('../models/forum')

module.exports = {
    //todo: Figure out a way to render all forums by tags instead of this way.
    index: async (req, res, next) => {
        try{
            const forums = await Forum.find()//.limit(10) would be useful if I wanted to add a limit to the query
            res.json({controllersForumIndex: forums})
        }catch(error){
            res.json({message: error})
        }
    },

    getForum: async (req, res, next) =>{
        try{
            const forum = await Forum.findById(req.params.forumId)
            res.json({message: forum})
        }catch(error){
            res.json({message: error})
        }
    },

    putForum: async (req, res, next) => {
        const replaceForum = req.params.forumId
        const newForum = req.body
        try {
            const result = await Forum.findByIdAndUpdate(replaceForum, newForum)
            res.status(200).json({message: result})
        }catch(error){
            res.json({message: error})
        }
    },

    patchForum: async (req, res, next) => {
        const patchForum = req.params.forumId
        const newForum = req.body
        try {
            const result = await Forum.findByIdAndUpdate(patchForum, newForum)
            res.status(200).json({message: result})
        }catch(error){
            res.json({message: error})
        }
    },

    deleteForum: async (req, res, next) => {
        const forumId = req.params.forumId
        //get forum id
        const forum = await Forum(findById)
        if (!forum) {
            return res.status(404).json({ error : 'Forum doesn\'t exist '})
        }

        const ownerId = forum._owner
        //get owner of forums id
        const owner = await User.findById(ownerId)
        try {
            //remove the forum
            await forum.remove()
            //remove forum from the owners list
            owner.forums.pull(forum)
            //saves result to DB
            await owner.save()
            res.status(200).json({message: 'You\'ve destroyed that file'})
        }catch(error){
            res.json({ message: error})
        }
    }
}