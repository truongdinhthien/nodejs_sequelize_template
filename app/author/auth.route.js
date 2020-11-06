const { Router } = require('express');
const authorization = require('../common/middlewares/authorization');
const authController = require('./auth.controller');
const route = Router();

route.post('/login', authController.login);
route.post('/register', authController.register);
route.get('/getMe',  authorization , authController.getMe);

module.exports = route;