const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/:id', checkAuthMiddleware.checkAuth, userController.detail);
router.delete('/:id', checkAuthMiddleware.checkAuth, userController.remove);
router.patch('/:id', checkAuthMiddleware.checkAuth, userController.updateUser);
router.get('/', checkAuthMiddleware.checkAuth, userController.list);


module.exports = router;