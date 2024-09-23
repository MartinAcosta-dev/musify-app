'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist.model');
var Album = require('../models/album.model');
var Song = require('../models/song.model');

var jwt = require('jsonwebtoken');

async function getAlbum(req, res){
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId).populate({path: 'artist'});

        if(!album){
            res.status(404).send({message: 'No se ha encontrado el album'});
        }else{
            res.status(200).send({album});
        }        
    } catch (error) {
        res.status(500).send({message: error});    
    }
}

async function getAlbums(req, res){
    try {
        const artistId = req.params.artist;

        if(!artistId){
            // Dar todos los albums de la base de datos
            var find = await Album.find({}).populate({path: 'artist'}).sort('year');
        }else{
            // Dar los albums de un artista en concreto de la BBDD
            var find = await Album.find({artist: artistId}).populate({path: 'artist'}).sort('year');
        }        
        
        if(!find){
            res.status(500).send({message: error});    
        }else{
            res.status(200).send(find);    
        }

    } catch (error) {
        res.status(500).send({error: error});    
    }
}

async function saveAlbum(req, res){
    try{
        var params = req.body;
        const album = new Album({
            title: params.title,
            description: params.description,
            year: params.year,
            image: params.image,
            artist: params.artist
        });

        let albumSaved = await album.save();
        res.status(200).send({
            success: true,
            message: 'Se guardó el album con éxito',
            data: albumSaved
        })
    }catch(err){
        res.status(500).send({
            success: false,
            message: err
        })
    }
}

async function updateAlbum(req, res){
    try {
        const albumId = req.params.id;
        var update = req.body;

        const albumToUpdate = await Album.findByIdAndUpdate(albumId, update);

        if(albumToUpdate){
            let albumUpdated = await Album.findById(albumId);
            res.status(200).send({success: true, message: "Se actualizo el album", albumUpdated: albumUpdated});
        }else{
            res.status(500).send({success: false, message: "Error al actualizar el album"});
        }

    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

async function deleteAlbum(req, res){
    try {
        const albumId = req.params.id;

        const albumDeleted = await Album.findByIdAndDelete(albumId);

        if(!albumDeleted){
            res.status(500).send({message: 'No se ha podido eliminar al artista'});
        }else{
            const songDeleted = await Song.deleteMany({album: albumDeleted._id});
            if(!songDeleted){
                res.status(500).send({message: 'No se ha podido eliminar cancion '+ songDeleted});
            }else{
                res.status(200).send({success: true, message: "Se ha eliminado el album y las canciones que contenia", album: albumDeleted});
            }
        }
    } catch (error) {
        res.status(500).send({error: error});
    }
}

async function uploadImage(req, res){
    var albumId = req.params.id;
    var file_name = 'Imagen no subida...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_name = file_path.split('\\')[3];
        var file_ext = file_name.split('.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            let albumUpdated = await Album.findByIdAndUpdate(albumId, {image: file_name}, {new: true});
            if(albumUpdated){
                res.status(200).send({message: "hola desde uploadImage" ,album: albumUpdated});
            }else{
                res.status(500).send({message: 'Error al actualizar el album'});
            }
        }else{
            res.status(400).send({message: 'Extension no valida. Extensiones aceptadas: png, jpg, gif.'})
        }

    }else{
        res.status(404).send({message: 'No se ha subido ninguna imagen'});
    }
}

async function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = path.join(__dirname, '../uploads/albums/', imageFile);

    try {
        // Verificar si el archivo existe
        fs.accessSync(path_file, fs.constants.R_OK);
        // Si no hay errores al acceder al archivo, devolver la imagen como respuesta
        res.sendFile(path_file);

    } catch (err) {
        // Si ocurre un error al acceder al archivo, devolver un error 404
        res.status(404).send('No se encontró la imagen');
    }
}

module.exports = {
    getAlbum,
    getAlbums,
    updateAlbum,
    saveAlbum,
    deleteAlbum,
    getImageFile,
    uploadImage
};