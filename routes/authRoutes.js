const express = require('express');
const { sendOtp, createUser, loginUser, getUserDetails } = require('../controller/authController');
const { auth } = require('../middleware/authMiddlware');

const Router = express.Router();

Router.post('/sendOtp', sendOtp);
Router.post('/signup', createUser);
Router.post('/login', loginUser);
Router.get('/getUserDetail', auth, getUserDetails);

module.exports = Router;