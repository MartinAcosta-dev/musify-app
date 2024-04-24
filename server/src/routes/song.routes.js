'use strict'

var express = require('express');
var songRouter = express.Router();
var md_auth = require('../middlewares/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: 'src/uploads/songs'});

var SongController = require('../controllers/song.controller');

// POST
songRouter.post('/song', md_auth.ensureAuth , SongController.saveSong);

songRouter.post('/upload-song/:songId', [md_auth.ensureAuth, md_upload ], SongController.uploadFile)

// GET
songRouter.get('/song/:id', md_auth.ensureAuth , SongController.getSong);
songRouter.get('/songs/:album?', md_auth.ensureAuth , SongController.getSongs);

// // PUT
songRouter.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);

// // DELETE
songRouter.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);

// // GET Songs Files
songRouter.get('/get-song-file/:songFile', SongController.getSongFile);

module.exports = songRouter;