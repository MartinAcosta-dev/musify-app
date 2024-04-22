var express = require('express');
var userRouter = require('./user.route');

var router = express.Router();

router.use(userRouter);

module.exports = router;