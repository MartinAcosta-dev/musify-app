'use strict'

var express = require('express');
var artistRouter = express.Router();
var md_auth = require('../middlewares/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: 'src/uploads/artists'});

var ArtistController = require('../controllers/artist.controller');


// GET
artistRouter.get('/artists/:page?', md_auth.ensureAuth , ArtistController.getArtists);
artistRouter.get('/artist/:id', md_auth.ensureAuth , ArtistController.getArtistById);

// GET Imagenes
artistRouter.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

// POST
artistRouter.post('/artist', md_auth.ensureAuth , ArtistController.saveArtist);
// POST Imagenes
artistRouter.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload ], ArtistController.uploadImage)


// PUT
artistRouter.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);

// DELETE
artistRouter.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);


module.exports = artistRouter;