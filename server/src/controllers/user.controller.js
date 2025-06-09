'use strict'
var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');

async function saveUser(req, res){
    try{
        var params = req.body;
        var saltRounds = 10;

        // Verifico si el usuario ya existe
        const existingUser = await User.findOne({name: params.name})
        if (existingUser){
            return res.status(400).send({
                error: "Nombre de usuario ya existe."
            })
        }

        // Si no existe ningun otro usuario en la base, lo creamos con rol de administrador
        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'ROLE_ADMIN' : 'ROLE_USER';

        if(params.password){
            var hashedPassword = await bcrypt.hash(params.password, saltRounds);
        }

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            role: role,
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

    // En el caso de que el ID que viene en la request (Del usuario que quiere editar sus datos)
    // sea distinto al ID que viene de la decodificacion del token en el middleware
    // entonces lo rechazamos
    if(id != req.user.sub){
        res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
    }else{

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
            let userUpdated = await User.findByIdAndUpdate(id, {$set: user}, {new: true});
            res.status(200).send(userUpdated);
        }catch(err){
            res.status(500).json({
                status: err
            });
        }
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

        if(req.body.gethash){
            res.status(200).send({
                token: jwt.createToken(user)
            });
        }else{
            res.send({user});
        }
        
    }catch(err){
        res.status(500).json({
            message: err
        });
    }
}

async function uploadImage(req, res){
    // 
    var userId = req.params.id;
    var file_name = 'Imagen no subida...';
    if(req.files){
        var file_path = req.files.image.path;
        var file_name = file_path.split('\\')[3];
        var file_ext = file_name.split('.')[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            const userUpdated = await User.findByIdAndUpdate(userId, {image: file_name}, {new: true});
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