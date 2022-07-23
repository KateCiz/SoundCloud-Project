const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { User, Song, Album, Comment } = require('../../db/models');



// Create a Comment for a Song based on the Song's id >> WORKS
router.post('/:songId/comments', 
    requireAuth,
    async (req, res, next) => {
        const { body } = req.body;
        const { songId } = req.params;
        const oneSong = await Song.findByPk(songId);

        if(!oneSong){
            res.status(404);
            return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
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

        const newComment = await Comment.create({
            userId: req.user.id,
            songId, 
            body
        });

        res.status(200); //WHY IS THIS 200, SHOULDN'T IT BE 201??
        return res.json(newComment);
});

// Get all Comments by a Song's id >> WORKS
router.get('/:songId/comments',
    async (req, res, next) => {
        const { songId } = req.params;
        const oneSong = await Song.findByPk(songId);
        if(!oneSong){
            res.status(404);
            return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
        }

        const allSongComments = await Comment.findAll({
            where: { songId },
            include: [{
                model: User,
                attributes: ['id', 'username']
            }]
        });
        return res.json({"Comments": allSongComments})
});


// Delete a Song >> WORKS
router.delete('/:songId', requireAuth, async (req, res, next) => {
    const { songId } = req.params;
    const oneSong = await Song.findByPk(songId);

    if(!oneSong){
        res.status(404);
        return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
    }
    if(oneSong.userId === req.user.id){
    await oneSong.destroy();
    return res.json({ "message": "Successfully deleted", "statusCode": 200 });
    } else {
        return res.json({"message": "A song can only be deleted by the song owner"});
    }
});

// Edit a Song >> WORKS
router.put('/:songId', requireAuth, async (req, res, next) => {
    const { title, description, url, imageUrl } = req.body;
    const { songId } = req.params;
    const updateSong = await Song.findByPk(songId);

    if(!updateSong){
        res.status(404);
        return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
    }

   if(!title){
    res.status(400);
    return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "title": "Song title is required",
            "url": "Audio is required"
        }
    });
   }

   if(!url){
    res.status(400);
    return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "title": "Song title is required",
            "url": "Audio is required"
        }
    });
   }
   if(updateSong.userId === req.user.id){
        updateSong.update({
            title, 
            description, 
            url, 
            previewImage: imageUrl
        });
        return res.json(updateSong)
    } else {
        return res.json({"message": "A song can only be updated by the song owner"});
    }
});


// Get details of a Song from an id >> WORKS
router.get('/:songId', async (req, res, next) => {
    const { songId } = req.params;
    const oneSong = await Song.findOne({
        where: { id: songId}, 
        include: [
            { model: Album, 
                attributes: ['id', 'title', 'previewImage']}, 
            { as: "Artist", model: User, 
                attributes: ['id', 'username', 'previewImage']}
        ],
    });

    if(!oneSong){
        res.status(404);
        return res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        });
    }

    return res.json(oneSong);
});

// Get all Songs >> WORKS
router.get('/',
    async (req, res, next) => {
        const allSongs = await Song.findAll();
        return res.json({"Songs": allSongs});
});

module.exports = router;