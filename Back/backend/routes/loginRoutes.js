const express = require('express');
const loginController = require('../controllers/loginController')
const api = express.Router();

api.post("/login", loginController.getLogin);

module.exports = api;