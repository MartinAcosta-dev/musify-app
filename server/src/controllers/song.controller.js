'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist.model');
var Album = require('../models/album.model');
var Song = require('../models/song.model');

var jwt = require('jsonwebtoken');

async function saveSong(req, res){
    const song = new Song({
        name: req.body.name,
        number: req.body.number,
        duration: req.body.duration,
        file: req.body.file,
        album: req.body.album
    });

    let saveSong = await song.save(); 

    if(!saveSong){
        res.status(500).send({message: 'Error al guardar la cancion'});
    }else{
        res.status(200).send({song})
    }
    
}


async function getSong(req, res){
    const songId = req.params.id;
    const song = await Song.findById(songId).populate({path: 'album'});
    if(!song){
        res.status(404).send({message: 'No se ha encontrado el album'});
    }else{
        res.status(200).send({song});
    }        
}

async function getSongs(req, res){
    const albumId = req.params.album;

    if(!albumId){
        // Dar todos los albums de la base de datos
        var find = await Song.find({}).populate({path: 'album'}).sort('album');
    }else{
        // Dar los albums de un artista en concreto de la BBDD
        var find = await Song.find({album: albumId}).populate({path: 'album'}).sort('number');
    }    
    
    if(!find){
        res.status(500).send({message: error});    
    }else{
        res.status(200).send(find);    
    }
}


async function updateSong(req, res){
    const songId = req.params.id;
    var update = req.body;

    const songToUpdate = await Song.findByIdAndUpdate(songId, update);

    if(songToUpdate){
        res.status(200).send(songToUpdate);
    }else{
        res.status(500).send({message: "Error al actualizar la cancion"});
    }
}

async function deleteSong(req, res){
    const songId = req.params.id;

    const songDeleted = await Song.findByIdAndDelete(songId);

    if(!songDeleted){
        res.status(500).send({message: 'No se ha podido eliminar la cancion'});
    }else{
        res.status(200).send({song: songDeleted});
    }

}

async function uploadFile(req, res){
    var songId = req.params.songId;
    var file_name = 'Cancion no subida...';

    if(req.files){
        var file_path = req.files.file.path;
        var file_name = file_path.split('\\')[3];
        var file_ext = file_name.split('.')[1];

        if(file_ext == 'mp3' || file_ext == 'wav' || file_ext == 'ogg'){
            const songUpdated = await Song.findByIdAndUpdate(songId, {file: file_name});
            if(songUpdated){
                res.status(200).send({song: songUpdated});
            }else{
                res.status(500).send({message: 'Error al actualizar la cancion'});
            }
        }else{
            res.status(200).send({message: 'Extension no valida.'})
        }

    }else{
        res.status(404).send({message: 'No se ha subido ningun archivo de audio'});
    }
}

async function getSongFile(req, res){
    var songFile = req.params.songFile;
    var path_file = path.join(__dirname, '../uploads/songs/', songFile);

    try {
        // Verificar si el archivo existe
        fs.accessSync(path_file, fs.constants.R_OK);
        // Si no hay errores al acceder al archivo, devolver la imagen como respuesta
        res.sendFile(path_file);

    } catch (err) {
        // Si ocurre un error al acceder al archivo, devolver un error 404
        res.status(404).send('No se encontró el archivo de audio');
    }
}

module.exports = {
    getSong,
    getSongs,
    updateSong,
    saveSong,
    deleteSong,
    getSongFile,
    uploadFile
};