const Validator = require('fastest-validator');
const models = require('../models')


//Funcion para guardar informacion en las tablas.
function save(req, res) {

    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1
    }

    //validacion con fastest-validator
    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "La validacion fallo",
            error: validationResponse
        });
    }
    //fin de la validacion

    models.Publicacion.create(post).then(result => {
        res.status(201).json({
            message: "Publicacion creada correctamente",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    });
}

//Funcion para mostar lo que contiene la tabla segun el Id.
function show(req, res) {
    const id = req.params.id;

    models.Publicacion.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!"
        });
    });
}

//Funcion para mostrar los que contiene toda la tabla.
function index(req, res) {
    models.Publicacion.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!"
        });
    });
}

//Funcion para actulizar informacion segun el Id.
function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }

    const userId = 1;
    // validando las actualizaciones 
    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        categoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "La validacion fallo",
            error: validationResponse
        });
    }
    //fin de la validacion

    models.Publicacion.update(updatedPost, { where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: "Post actualizado exitosamente",
            post: updatedPost
        })
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    })
}

//Funcion para borrar toda la informacion de un Id.
function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Publicacion.destroy({ where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: "Post borrado exitosamente"
        })
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    });
}


//Exportado de los modulos
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}