const express = require('express');
const { sendOtp, createUser, loginUser } = require('../controller/authController');

const Router = express.Router();

Router.post('/sendOtp', sendOtp);
Router.post('/signup', createUser);
Router.post('/login', loginUser);

module.exports = Router;