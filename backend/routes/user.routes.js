const express = require('express');
const { createUser, loginUser, profileUser, updateUser, logoutUser, getAddress } = require('../controllers/user.controller');
const { getOrders } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth');
const userRoute = express.Router();

userRoute.route('/register').post(createUser);
userRoute.route('/login').post(loginUser);
userRoute.route('/profile/:id').get(authMiddleware, profileUser);
userRoute.route('/update/:id').put(authMiddleware, updateUser);
userRoute.route('/logout').post(logoutUser);
userRoute.route('/address').get(authMiddleware, getAddress);
userRoute.route('/orders').get(authMiddleware, getOrders);

module.exports = userRoute;