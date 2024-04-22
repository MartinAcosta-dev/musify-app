'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// CArgar rutas

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras http

// Rutas base

app.get("/inicio", function(req,res){
    res.status(200).send({message: "Bienvenido a Musify"});
})

module.exports = app;