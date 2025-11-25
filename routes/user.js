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

module.exports = router;