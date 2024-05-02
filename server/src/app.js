'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/app.routes');
var morgan = require('morgan');
var cors = require('cors');

var app = express();

app.use(cors());

app.use(morgan('dev'));
// Rutas ------------------------------------------

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuro cabeceras http
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,  X-API-KEY, Origin, X-Requested-With, Content-Type, Accept. Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/api", router);

module.exports = app;