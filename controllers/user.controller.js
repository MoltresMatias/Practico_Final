const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const Validator = require("fastest-validator");

function signUp(req, res) {

    //validacion con fastest-validator
    const schema = {
        name: { type: "string", optional: false, min: 1, max: 100 },
        email: { type: "string", optional: false, min: 5, max: 500 },
        password: { type: "string", optional: false, min: 6 }
    }

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "La validacion fallo",
            error: validationResponse
        });
    }
    //fin de la validacion

    models.Usuarios.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "El email ya existe!",
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, function (err, hash) {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }



                    models.Usuarios.create(user).then(result => {
                        res.status(201).json({
                            message: "Usuario creado correctamente",
                        });
                    }).catch(error => {
                        console.error(error);
                        res.status(500).json({
                            message: "Algo salio mal!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({
            message: "Algo salio mal!",
        });
    });

}

function login(req, res) {
    models.Usuarios.findOne({ where: { email: req.body.email } }).then(user => {
        if (user == null) {
            res.status(401).json({
                message: "Credencial invalida!",
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function (err, token) {
                        res.status(200).json({
                            message: "Auntenticacion aprobada",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Credencial invalida!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
        });
    })
}

function show(req, res) {
    const id = req.params.id;

    models.Usuarios.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!"
        });
    });
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Usuarios.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Usuario eliminado"
        })
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    });
}

function updateUser(req, res) {
    const id = req.params.id;
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    // validando las actualizaciones 
    const schema = {
        name: { type: "string", optional: true, min: 1, max: 100 },
        email: { type: "string", optional: true, min: 5, max: 500 },
        password: { type: "string", optional: true, min: 6 }
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedUser, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "La validacion fallo",
            error: validationResponse
        });
    }
    //fin de la validacion


    //Si hay contraseña , la encriptamos antes de guardar
    if (updatedUser.password) {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(updatedUser.password, salt, (err, hash) => {
                updatedUser.password = hash;

                models.Usuarios.update(updatedUser, { where: { id: id } })
                    .then(result => {
                        if (result[0] === 0) {
                            return res.status(404).json({ message: "Usuario no encontrado" });
                        }
                        res.status(200).json({
                            message: "Usuario actualizado correctamente",
                            user: updatedUser
                        });
                    })
                    .catch(error => {
                        res.status(500).json({ message: "Algo salió mal!", error });
                    });
            });
        });
    } else {
        // si no hay password, actualizamos directamente
        models.Usuarios.update(updatedUser, { where: { id: id } })
            .then(result => {
                if (result[0] === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                res.status(200).json({
                    message: "Usuario actualizado correctamente",
                    user: updatedUser
                });
            })
            .catch(error => {
                res.status(500).json({ message: "Algo salió mal!", error });
            });

    }
}

function index(req, res) {
    models.Usuarios.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!"
        });
    });
}


module.exports = {
    signUp: signUp,
    login: login,
    show: show,
    destroy: destroy,
    updateUser: updateUser,
    index: index
}