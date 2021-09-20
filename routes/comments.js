const express = require('express')
const router = express.Router()
const CommentsController = require('../controllers/forums')

router.route('/commentId')
    .get()
    .delete()
    .patch()
    .put()
/*

//show requested comment
router.get('/:commentId', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        res.json({message:comment})
    }catch(error){
        res.json({message: error})
    }
})

//deletes a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = Comment.remove({_id: req.params.commentId})
        res.status(200).json({message: "You've destroyed that file"})
    }catch(error){
        res.json({message:error})
    }
})

//updated a comment
router.patch('/:commentId', async (req, res) =>{
    try {
        const updatedComment = await Comment.updateOne(
            {_id: req.params.commentId},
            {
                $set: {
                    body: req.body.body
                }
            }
        )
        res.json({message: updatedComment})
    }catch(error){
        res.json({message: error})
    }
})

//create a comment

router.post('/', async (req, res) => {
    const comment = new Comment({
        body: req.body.body
    })
    try{
        const commentPost = await comment.save()
        res.json({message: commentPost})
    }catch(error){
        res.json({message: error})
    }
})
//this is a way if we are to not using async.
// router.post('/', (req, res) => {
//     const  comment = new Comment({
//         title: req.body.title,
//         body: req.body.body
//     })
//
//     comment.save()
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(error => {
//         res.json({message: error})
//     })
// })

*/
module.exports = router