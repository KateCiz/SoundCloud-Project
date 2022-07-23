const express = require('express')
const router = express.Router();

const { User, Song, Album } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');


// Create a Song for an Album based on the Album's id >> WORKS
router.post('/:albumId/songs', 
requireAuth,
async (req, res, next) => {
    const { albumId } = req.params;
        const { title, description, url, imageUrl } = req.body;
        const album = await Album.findByPk(albumId);
        
        if(!album){
            res.status(404);
            return res.json({
                "message": "Album couldn't be found",
                "statusCode": 404
            });
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
            if(album.userId === req.user.id){
                const newSong = await Song.create({
                    userId: req.user.id,
                    albumId,
                    title, 
                    description, 
                    url, 
                    previewImage: imageUrl
                });
                
                res.status(201); //is this line needed???
                return res.json(newSong);
            } else {
                return res.json({"message": "A song can only be added by the album owner"});
            }
        });

        // Delete an Album >> WORKS
        router.delete('/:albumId', 
            requireAuth,
                async (req, res, next) => {
                    const { albumId } = req.params;
                    const oneAlbum = await Album.findByPk(albumId);
        
                    if(!oneAlbum){
                        res.status(404);
                        return res.json({ "message": "Album couldn't be found",  "statusCode": 404 });
                    }
                    if(oneAlbum.userId === req.user.id){
                        await oneAlbum.destroy();
                        return res.json({ "message": "Successfully deleted",  "statusCode": 200 });
                    }  else {
                        return res.json({"message": "An album can only be deleted by the album owner"});
                    }
        });
        
        // Edit an Album >> WORKS
        router.put('/:albumId', requireAuth, async (req, res, next) => {
            const { title, description, imageUrl } = req.body;
            const { albumId } = req.params;
            const updateAlbum = await Album.findByPk(albumId);
            
            if(!updateAlbum){
                res.status(404);
                return res.json({ "message": "Album couldn't be found",  "statusCode": 404 });
            }
            
            if(!title){
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Album title is required"
                }
            });
           }
           if(updateAlbum.userId === req.user.id){
             updateAlbum.update({
                title, 
                description,
                previewImage: imageUrl
            }); 
            return res.json(updateAlbum);
            }  else {
                return res.json({"message": "An album can only be edited by the album owner"});
            }
         
        });

    // Get details of an Album from an id >> WORKS
    router.get('/:albumId', async (req, res, next) => {
        const { albumId } = req.params;
        
        const oneAlbum = await Album.findOne({
            where: { id: albumId}, 
            include: [
                { as: "Artist", model: User,
                attributes: ['id', 'username', 'previewImage']
                },
                { model: Song}
            ]
        });
    
        if(!oneAlbum){
            res.status(404);
            return res.json({
                "message": "Album couldn't be found",
                "statusCode": 404
            });
        }
    
        return res.json(oneAlbum);
    });
    
    // Create an Album >> WORKS
    router.post('/', 
        requireAuth,
        async (req, res, next) => {
            const { title, description, imageUrl } = req.body;
    
            if(!title){
                res.status(400);
                return res.json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "title": "Album title is required"
                    }
                });
            }
    
            const newAlbum = await Album.create({
                userId: req.user.id,
                title, 
                description, 
                previewImage: imageUrl
            });
    
            res.status(201); //is this line needed???
            return res.json(newAlbum);
    });

// Get all Albums >> WORKS
router.get('/',
    async (req, res, next) => {
        const allAlbums = await Album.findAll();
        return res.json({"Albums": allAlbums});
    });      

module.exports = router;