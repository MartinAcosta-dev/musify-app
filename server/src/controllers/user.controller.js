'use strict'
var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function saveUser(req, res){
    try{
        var params = req.body;
        var saltRounds = 10;

        if(params.password){
            var hashedPassword = await bcrypt.hash(params.password, saltRounds);
        }

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            image: req.body.image
        });

        await user.save();
        res.status(200).send({
            message: 'Se guardó el usuario con éxito'
        })
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

async function getUsers(req, res){
    try{
        const user = await User.find();
        res.status(200).send(user);
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

async function getUserById(req, res){
    try{
        let user = await User.findById(req.params.id);
        res.status(200).send(user);
    }catch(err){
        res.status(500).json({
            status: err
        });
    }
}

async function updateUser(req, res){
    const { id } = req.params;

    var params = req.body;
    var saltRounds = 10;

    if(params.password){
        var hashedPassword = await bcrypt.hash(params.password, saltRounds);
    }
    

    const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        image: req.body.image
    };
    
    try{
        await User.findByIdAndUpdate(id, {$set: user}, {new: true});
        res.json({
            status: 'Updated success.'
        });
    }catch(err){
        res.status(500).json({
            status: err
        });
    }
}

async function deleteUser(req, res){
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Deleted success.'
        });
    }catch(err){
        res.status(500).json({
            status: err
        });
    }
}

async function loginUser(req, res){
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});

        // Si no existe mandar mensaje de error

        if(!user){
            return res.status(404).send({error: 'Usuario no encontrado'});
        }

        // Verificar contraseña

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send({error: 'Contraseña incorrecta'});
        }

        
        // Generar un token JWT para el usuario autentificado
        const token = jwt.sign({userId: user._id}, 'secreto', {expiresIn: '1h'});

        // Enviar el token como respuesta

        res.send({token});
        
    }catch(err){
        res.status(500).json({
            message: err
        });
    }
}

async function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'Imagen no subida...';
    if(req.files){
        var file_path = req.files.image.path;
        var file_name = file_path.split('\\')[3];
        var file_ext = file_name.split('.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            const userUpdated = await User.findByIdAndUpdate(userId, {image: file_name});
            if(userUpdated){
                res.status(200).send({image: file_name, user: userUpdated});
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
    var path_file = path.join(__dirname, '../uploads/users/', imageFile);

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
    saveUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    uploadImage,
    getImageFile
};