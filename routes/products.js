const express = require('express');
const productsController = require('../controllers/products.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();


router.post("/", checkAuthMiddleware.checkAuth, productsController.create);
router.get("/", productsController.list);
router.get("/:id", productsController.detail);
router.patch("/:id", checkAuthMiddleware.checkAuth, productsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, productsController.remove);


module.exports = router;