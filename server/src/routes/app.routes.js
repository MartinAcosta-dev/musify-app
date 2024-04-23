var express = require('express');
var userRouter = require('./user.routes');
var artistRouter = require('./artist.routes');

var router = express.Router();

router.use(userRouter);
router.use(artistRouter);

module.exports = router;