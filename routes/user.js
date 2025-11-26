const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/:id', checkAuthMiddleware.checkAuth, userController.show);
router.delete('/:id', checkAuthMiddleware.checkAuth, userController.destroy);
router.patch('/:id', checkAuthMiddleware.checkAuth, userController.updateUser);
router.get('/', checkAuthMiddleware.checkAuth, userController.index);

// -----------------------------------------------------------
// RUTA DE PRUEBA: USER POST
// -----------------------------------------------------------
router.post('/', async (req, res) => {
    // 1. Log para verificar si Express ha llegado a la ruta
    console.log("--- INICIO DE PROCESAMIENTO DE USUARIO ---");
    console.log("Cuerpo Recibido:", req.body);

    // 2. Aquí es donde pondrías tu lógica de BD (ej. User.create)
    try {
        // *** BLOQUE DE CÓDIGO TEMPORAL DE PRUEBA ***
        // Simplemente responde para ver si el Postman/Vercel desbloquea.
        // Si la conexión de BD es el problema, descomenta las líneas siguientes 
        // y comenta este return temporal.

        // Simulación de un registro exitoso
        return res.status(201).json({
            message: "Registro recibido correctamente (Simulación exitosa).",
            data: { name: req.body.name, email: req.body.email }
        });

        /*
        // *** TU CÓDIGO DE BASE DE DATOS DEBERÍA IR AQUÍ ***
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password // Asegúrate de hashear esto
        });
        
        console.log("--- USUARIO REGISTRADO EN BD ---");
        return res.status(201).json({ 
            message: "Usuario registrado exitosamente.",
            user: newUser
        });
        */

    } catch (error) {
        // 3. Log para capturar cualquier error interno
        console.error("Error en el registro de usuario:", error);
        // Si el error es de BD, debería saltar aquí
        return res.status(500).json({
            message: "Error interno del servidor.",
            details: error.message
        });
    }
});

module.exports = router;