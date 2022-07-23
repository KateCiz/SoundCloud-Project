const express = require('express')
const router = express.Router();

const { Op } = require("sequelize");

const { User, Song, Album, Playlist } = require('../../db/models');


// Get details of an Artist from an id >> WORKS
router.get('/:artistId', async (req, res, next) => {
    const { artistId } = req.params;
    const oneArtist = await User.scope("artistDetails").findOne({
        where: { id: artistId}, 
        include: [{ model: Album }, { model: Song, attributes: ['previewImage'] }]
    });
    
    if(!oneArtist){
        res.status(404);
        return res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        });
    }
    
    console.log(oneArtist.dataValues.Albums)
    // this checks if the artist has any albums and counts them OR sets the total to 0 if none are found
    if(oneArtist.dataValues.Albums){
        oneArtist.dataValues.totalAlbums = oneArtist.dataValues.Albums.length;
    } else {
        oneArtist.dataValues.totalAlbums = 0;
    }
    delete oneArtist.dataValues.Albums;
    
    // this checks if the artist has any songs and counts them OR sets the total to 0 if none are found
    if(oneArtist.dataValues.Songs){
    oneArtist.dataValues.totalSongs = oneArtist.dataValues.Songs.length
    } else {
        oneArtist.dataValues.totalSongs = 0;
    }
    // delete oneArtist.dataValues.Songs

    return res.json(oneArtist);
});


// Get all Playlists of an Artist from an id >> WORKS
router.get('/:artistId/playlists',
    async (req, res, next) => {
        const { artistId } = req.params;
        const oneArtist = await User.findByPk(artistId);

        if(!oneArtist){
            res.status(404);
            return res.json({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }
        const artistPlaylists = await Playlist.findAll({
            where: {
                userId: artistId
            }
        });
        return res.json({"Playlists": artistPlaylists});
});


// Get all Albums of an Artist from an id >> WORKS
router.get('/:artistId/albums',
    async (req, res, next) => {
        const { artistId } = req.params;
        const oneArtist = await User.findByPk(artistId);

        if(!oneArtist){
            res.status(404);
            return res.json({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }
        const artistAlbums = await Album.findAll({
            where: {
                userId: artistId
            }
        });
        return res.json({"Albums": artistAlbums});
});

// Get all Songs of an Artist from an id >> WORKS
router.get('/:artistId/songs',
    async (req, res, next) => {
        const { artistId } = req.params;
        const oneArtist = await User.findByPk(artistId);

        if(!oneArtist){
            res.status(404);
            return res.json({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }
        const artistSongs = await Song.findAll({
            where: {
                userId: artistId
            }
        });
        return res.json({"Songs": artistSongs});
});

module.exports = router;