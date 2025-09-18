const express = require('express');
const { createUser, loginUser } = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute.route('/register').post(createUser);
userRoute.route('/login').post(loginUser);

module.exports = userRoute;