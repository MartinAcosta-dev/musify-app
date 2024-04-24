'use strict'

var express = require('express');
var albumRouter = express.Router();
var md_auth = require('../middlewares/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: 'src/uploads/albums'});

var AlbumController = require('../controllers/album.controller');


// GET
albumRouter.get('/album/:id', md_auth.ensureAuth , AlbumController.getAlbum);
albumRouter.get('/albums/:artist?', md_auth.ensureAuth , AlbumController.getAlbums);

// GET Imagenes
albumRouter.get('/get-image-album/:imageFile', AlbumController.getImageFile);


// POST
albumRouter.post('/album', md_auth.ensureAuth , AlbumController.saveAlbum);
albumRouter.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload ], AlbumController.uploadImage)

// POST
// albumRouter.post('/artist', md_auth.ensureAuth , AlbumController.saveArtist);
// POST Imagenes



// PUT
albumRouter.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);

// DELETE
albumRouter.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);


module.exports = albumRouter;