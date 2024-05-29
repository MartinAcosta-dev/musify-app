'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist.model');
var Album = require('../models/album.model');
var Song = require('../models/song.model');

var jwt = require('jsonwebtoken');

async function getArtists(req, res){
    try{
        var page = req.params.page || 1;
        var itemsPerPage = 3;
        var artists = await Artist.find().sort('name').paginate(page, itemsPerPage);
        
        res.status(200).send({artists});

    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

async function getArtistById(req, res){
    try{
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);
        res.status(200).send(artist);
    }catch(err){
        res.status(500).json({
            status: err
        });
    }
}


async function saveArtist(req, res){
    try{
        const artist = new Artist({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });

        await artist.save();
        res.status(200).send({
            artist: artist
        })
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

async function updateArtist(req, res){
    const { id } = req.params;

    var params = req.body;

    const artist = {
        name: params.name,
        description: params.description,
        image: params.image
    };
    
    try{
        await Artist.findByIdAndUpdate(id, {$set: artist}, {new: true});
        res.json({
            status: 'Updated success.'
        });
    }catch(err){
        res.status(500).json({
            status: err
        });
    }
}

// DELETE Para eliminar al artista debemos eliminar en cadena sus relaciones

async function deleteArtist(req, res){
    try {
        const artistId = req.params.id;

        const artistDeleted = await Artist.findByIdAndDelete(artistId);

        if(!artistDeleted){
            res.status(500).send({message: 'No se ha podido eliminar al artista'});
        }else{
            const albumDeleted = await Album.deleteMany({artist: artistDeleted._id});
            if(!albumDeleted){
                res.status(500).send({message: 'No se ha podido eliminar al album'});
            }else{
                const songDeleted = await Song.deleteMany({album: albumDeleted._id});
                if(!songDeleted){
                    res.status(500).send({message: 'No se ha podido eliminar alguna cancion:' + songDeleted._id});
                }else{
                    res.status(200).send({message: 'Se ha eliminado al artista y sus obras asociadas (Albums y Canciones)'});
                }
            }
        }
    } catch (error) {
        res.status(500).send({error: error});
    }
}

async function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'Imagen no subida...';
    if(req.files){
        var file_path = req.files.image.path;
        var file_name = file_path.split('\\')[3];
        var file_ext = file_name.split('.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            const artistUpdated = await Artist.findByIdAndUpdate(artistId, {image: file_name});
            if(artistUpdated){
                res.status(200).send({message: 'Se ha actualizado la imagen del usuario'});
            }else{
                res.status(500).send({message: 'Error al actualizar el usuario'});
            }
        }else{
            res.status(200).send({message: 'Extension no valida.'})
        }

    }else{
        res.status(404).send({message: 'No se ha subido ninguna imagen'});
    }
}

async function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = path.join(__dirname, '../uploads/artists/', imageFile);

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
    saveArtist,
    getArtists,
    getArtistById,
    updateArtist,
    uploadImage,
    getImageFile,
    deleteArtist
};