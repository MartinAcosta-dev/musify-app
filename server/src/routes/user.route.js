'use strict'

var express = require('express');
var md_auth = require('../middlewares/auth');
var UserController = require('../controllers/user.controller');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: 'src/uploads/users'});

var userRouter = express.Router();

// CREATE
userRouter.post('/register', UserController.saveUser);

// READ
userRouter.get('/users/', UserController.getUsers);
userRouter.get('/users/:id', UserController.getUserById);

// UPDATE
userRouter.put('/users/:id', md_auth.ensureAuth, UserController.updateUser);

// DELETE
userRouter.delete('/users/:id', UserController.deleteUser);

userRouter.post('/login', UserController.loginUser)

// Imagenes

userRouter.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload ], UserController.uploadImage)

userRouter.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = userRouter;