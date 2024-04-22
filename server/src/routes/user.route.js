'use strict'

var express = require('express');
var UserController = require('../controllers/user.controller');

var userRouter = express.Router();

// CREATE
userRouter.post('/users', UserController.saveUser);

// READ
userRouter.get('/users/', UserController.getUsers);
userRouter.get('/users/:id', UserController.getUserById);

// UPDATE
userRouter.put('/users/:id', UserController.updateUser);

// DELETE
userRouter.delete('/users/:id', UserController.deleteUser);

module.exports = userRouter;