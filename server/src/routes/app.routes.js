var express = require('express');
var userRouter = require('./user.routes');
var artistRouter = require('./artist.routes');
var albumRouter = require('./album.routes');
var songRouter = require('./song.routes');

var router = express.Router();

router.use(userRouter);
router.use(artistRouter);
router.use(albumRouter);
router.use(songRouter);

module.exports = router;