'use strict'

// Este archivo crea funcion de aseguramiento de autentifiacion y lo exporta para ser utilizado como middleware en las rutas
// Si el token viene en la cabecera de la peticion entonces deja continuar con la ejecucion de un controlador ejecutando next() 

var jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = 'secreto';

function ensureAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'})
    }

    // Tomo el token que viene en la cabecera y me aseguro de quitarle las comillas de inicio y final
    var token = req.headers.authorization.replace(/['"]/g, '');

    // Decodifico el token
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'Token ha expirado'});
        }
    } catch (error) {
        return res.status(404).send({message: 'Token no válido'});
    }

    req.user = payload;

    next();
}

module.exports = {
    ensureAuth
};