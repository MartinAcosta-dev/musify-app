'use strict'
var User = require('../models/user.model');

async function saveUser(req, res){
    try{
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
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

        console.log("No se encuentra");
    }
}

async function updateUser(req, res){
    const { id } = req.params;
    const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
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

module.exports = {
    saveUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};