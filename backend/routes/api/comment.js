const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { Comment } = require('../../db/models');

// Delete a Comment >> WORKS
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    const { commentId } = req.params;
    const deleteComment = await Comment.findByPk(commentId);

    if(!deleteComment){
        res.status(404);
        return res.json({ "message": "Comment couldn't be found", "statusCode": 404 });
    }

    if(deleteComment.userId === req.user.id){
        await deleteComment.destroy();
        return res.json({ "message": "Successfully deleted", "statusCode": 200 });
    } else {
        return res.json({"message": "A comment can only be deleted by the comment owner"});
    }
});

// Edit a Comment >> WORKS
router.put('/:commentId', requireAuth, async (req, res, next) => {
    const { body } = req.body;
    const { commentId } = req.params;
    const updateComment = await Comment.findByPk(commentId);

    if(!updateComment){
        res.status(404);
        return res.json({ "message": "Comment couldn't be found", "statusCode": 404 });
    }

   if(!body){
    res.status(400);
    return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "body": "Comment body text is required"
        }
    });
   }
   if(updateComment.userId === req.user.id){
        updateComment.update({
            body
        });
        return res.json(updateComment);
    } else {
        return res.json({"message": "A comment can only be edited by the comment owner"});
    }
});


module.exports = router;
