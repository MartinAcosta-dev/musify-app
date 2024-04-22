'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/app.routes');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
// Rutas ------------------------------------------

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api", router);

module.exports = app;