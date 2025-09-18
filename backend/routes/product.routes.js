const express = require('express');
const { getAllCategories, createProduct, getProductList, getProductDetails } = require('../controllers/product.controller');
const productRoute = express.Router();
const authMiddleware = require('../middlewares/auth');

productRoute.route('/categories').get(getAllCategories);
productRoute.route('/create-product').post(authMiddleware, createProduct);
productRoute.route('/products-list').get(getProductList);
productRoute.route('/products-details/:id').get(getProductDetails);

module.exports = productRoute;