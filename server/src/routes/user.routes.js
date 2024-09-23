'use strict'

var express = require('express');
var md_auth = require('../middlewares/auth');
var UserController = require('../controllers/user.controller');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: 'src/uploads/users'});

var userRouter = express.Router();

// POST
userRouter.post('/register', UserController.saveUser);
// POST Imagenes
userRouter.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload ], UserController.uploadImage)
userRouter.post('/login', UserController.loginUser)

// GET
userRouter.get('/users/', UserController.getUsers);
userRouter.get('/users/:id', UserController.getUserById);

// GET Imagenes
userRouter.get('/get-image-user/:imageFile', UserController.getImageFile);

// PUT
userRouter.put('/users/:id', md_auth.ensureAuth, UserController.updateUser);

// DELETE
userRouter.delete('/users/:id', UserController.deleteUser);


module.exports = userRouter;