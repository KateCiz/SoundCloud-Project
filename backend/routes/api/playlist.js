const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth.js');
const { User, Song, Album, Playlist, Playlist_Song } = require('../../db/models');

// Delete a Playlist >> WORKS
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
    const { playlistId } = req.params;
    const onePlaylist = await Playlist.findByPk(playlistId);

    if(!onePlaylist){
        res.status(404);
        return res.json({ "message": "Playlist couldn't be found", "statusCode": 404 });
    }

    if(onePlaylist.userId === req.user.id){
        await onePlaylist.destroy();
        return res.json({ "message": "Successfully deleted", "statusCode": 200 });
    } else {
        return res.json({"message": "A playlist can only be deleted by the playlist owner"});
    }
});


// Edit a Playlist >> WORKS
router.put('/:playlistId', requireAuth, async (req, res, next) => {
    const { name, imageUrl } = req.body;
    const { playlistId } = req.params;
    const updatePlaylist = await Playlist.findByPk(playlistId);

    if(!updatePlaylist){
        res.status(404);
        return res.json({ "message": "Playlist couldn't be found", "statusCode": 404 });
    }

   if(!name){
    res.status(400);
    return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "title": "Playlist name is required"
        }
    });
   }

   if(updatePlaylist.userId === req.user.id){
        updatePlaylist.update({
            name,
            previewImage: imageUrl
        });
        return res.json(updatePlaylist);
    } else {
        return res.json({"message": "A playlist can only be edited by the playlist owner"});
    }
});

// Get details of a Playlist from an id >> WORKS
router.get('/:playlistId', async (req, res, next) => {
    const { playlistId } = req.params;
    const onePlaylist = await Playlist.findOne({
        where: { id: playlistId}, 
        include: [{ model: Song, through: {
            attributes: []} 
        }]
    });

    if(!onePlaylist){
        res.status(404);
        return res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        });
    }

    return res.json(onePlaylist);
});


// Add a Song to a Playlist based on the Playlists's id >> WORKS
router.post('/:playlistId', 
    requireAuth,
    async (req, res, next) => {
        const { songId } = req.body;
        const { playlistId } = req.params;
        const oneSong = await Song.findByPk(songId);
        const onePlaylist = await Playlist.findByPk(playlistId);

        if(!oneSong){
            res.status(404);
            return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
        }
        if(!onePlaylist){
            res.status(404);
            return res.json({ "message": "Playlist couldn't be found", "statusCode": 404 });
        }

        if(onePlaylist.userId === req.user.id){
            await onePlaylist.addSong(oneSong);

            const newEntry = await Playlist_Song.findOne({
                where: { songId },
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'playlistId', 'songId']
            });

            res.status(200); //WHY IS THIS 200, SHOULDN'T IT BE 201??
            return res.json(newEntry);
        } else {
            return res.json({"message": "You can only add a song to a playlist if you are the playlist owner"});
        }
});


// Create a Playlist >> WORKS
router.post('/', 
    requireAuth,
    async (req, res, next) => {
        const { name, imageUrl } = req.body;


        if(!name){
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "name": "Playlist name is required"
                }
            });
        }

        const newPlaylist = await Playlist.create({
            userId: req.user.id,
            name, 
            previewImage: imageUrl
        });

        res.status(201);
        return res.json(newPlaylist);
});


module.exports = router;