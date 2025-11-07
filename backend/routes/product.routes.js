const express = require('express');
const { getAllCategories, createProduct, getProductList, getProductDetails, deleteProduct, getFlashSaleProducts, createCartItems, getCartProducts, createWishListItems, getWishListProducts, getCountWishListCartItems, updateCartItems } = require('../controllers/product.controller');
const productRoute = express.Router();
const authMiddleware = require('../middlewares/auth');
const { createOrder } = require('../controllers/order.controller');

productRoute.route('/categories').get(getAllCategories);
productRoute.route('/create-product').post(authMiddleware, createProduct);
productRoute.route('/products-list').get(getProductList);
productRoute.route('/flash-sale-products').get(getFlashSaleProducts);
productRoute.route('/create-cart-items').post(authMiddleware, createCartItems);
productRoute.route('/get-cart-items').get(authMiddleware, getCartProducts);
productRoute.route('/create-wishlist-items').post(authMiddleware, createWishListItems);
productRoute.route('/get-wishlist-items').get(authMiddleware, getWishListProducts);
productRoute.route('/count-items').get(authMiddleware, getCountWishListCartItems);
productRoute.route('/update-cart-items').put(authMiddleware, updateCartItems);
productRoute.route('/create-order').post(authMiddleware, createOrder);

// Use dynamic route at last
productRoute.route('/product/:id').get(getProductDetails).delete(authMiddleware, deleteProduct);


module.exports = productRoute;