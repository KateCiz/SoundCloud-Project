const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User, Song, Album, Playlist } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// Get all Playlists created by the Current User
router.get('/playlists',
    requireAuth,
    async (req, res, next) => {
        const myPlaylists = await Playlist.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.json({"Playlists": myPlaylists});
});

// Get all Albums created by the Current User
router.get('/albums',
    requireAuth,
    async (req, res, next) => {
        const myAlbums = await Album.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.json({"Albums": myAlbums});
});

// Get all Songs created by the Current User
router.get('/songs',
    requireAuth,
    async (req, res, next) => {
        const mySongs = await Song.findAll({
            where: {
                userId: req.user.id
            }
        });
        return res.json({"Songs": mySongs});
});


// Get the Current User
router.get('/',
    requireAuth,
    async (req, res, next) => {
        const me = await User.getCurrentUserById(req.user.id);

        // even though it's called setTokenCookie, since the user is logged in it doesn't matter
        const jwtToken = await setTokenCookie(res, me);

        if(jwtToken){
            me.dataValues.token = jwtToken;
        } else {
            me.dataValues.token = "";
        }
    
      return res.json(me);
});


module.exports = router;
