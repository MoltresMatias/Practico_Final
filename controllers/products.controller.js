const Validator = require('fastest-validator');
const models = require('../models')


//Funcion para guardar informacion en las tablas.
function create(req, res) {

    const product = {
        title: req.body.title,
        content: req.body.content,
        cant: req.body.cant,
        categoryId: req.body.category_id,
        userId: 1
    }

    //validacion con fastest-validator
    const schema = {
        title: { type: "string", optional: false, max: 100 },
        content: { type: "string", optional: false, max: 500 },
        cant: { type: "number", optional: false, max: 500 },
        categoryId: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(product, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "La validacion fallo",
            error: validationResponse
        });
    }
    //fin de la validacion

    models.Productos.create(product).then(result => {
        res.status(201).json({
            message: "Productos creados correctamente",
            product: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    });
}

//Funcion para mostar lo que contiene la tabla segun el Id.
function detail(req, res) {
    const id = req.params.id;

    models.Productos.findByPk(id).then(result => {
        if (!result) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!"
        });
    });
}

//Funcion para mostrar los que contiene toda la tabla.
function list(req, res) {
    models.Productos.findAll().then(result => {
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
        cant: req.body.cant,
        categoryId: req.body.category_id,
    }

    const userId = 1;
    // validando las actualizaciones 
    const schema = {
        title: { type: "string", optional: false, max: 100 },
        content: { type: "string", optional: false, max: 500 },
        cant: { type: "number", optional: false, max: 500 },
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

    models.Productos.update(updatedPost, { where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: "Producto actualizado exitosamente",
            product: updatedPost
        })
    }).catch(error => {
        res.status(500).json({
            message: "Algo salio mal!",
            error: error
        });
    })
}

//Funcion para borrar toda la informacion de un Id.
function remove(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Productos.destroy({ where: { id: id, userId: userId } }).then(result => {
        res.status(200).json({
            message: "Producto borrado exitosamente"
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
    create: create,
    detail: detail,
    list: list,
    update: update,
    remove: remove
}