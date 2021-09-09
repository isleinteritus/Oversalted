const Forum = require('../models/forum')

module.exports = {
    index: async (req, res, next) => {
        try{
            const forums = await Forum.find()
            res.json({controllersForumIndex: forums})
        }catch(error){
            res.json({message: error})
        }
    },

    getForum: async (req, res, next) =>{
        try{
            const forum = await Forum.findById(req.params.forumId)
        }catch(error){
            res.json({message: error})
        }
    }
}