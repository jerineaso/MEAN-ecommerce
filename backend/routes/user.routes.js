const express = require('express');
const { createUser, loginUser, profileUser, updateUser } = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute.route('/register').post(createUser);
userRoute.route('/login').post(loginUser);
userRoute.route('/profile').get(profileUser);
userRoute.route('/update').put(updateUser);

module.exports = userRoute;