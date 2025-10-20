const express = require('express');
const { createUser, loginUser, profileUser, updateUser, logoutUser, getAddress } = require('../controllers/user.controller');
const { getOrders } = require('../controllers/order.controller');
const userRoute = express.Router();

userRoute.route('/register').post(createUser);
userRoute.route('/login').post(loginUser);
userRoute.route('/profile/:id').get(profileUser);
userRoute.route('/update').put(updateUser);
userRoute.route('/logout').post(logoutUser);
userRoute.route('/address').get(getAddress);
userRoute.route('/orders').get(getOrders);

module.exports = userRoute;