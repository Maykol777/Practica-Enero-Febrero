const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();

api.post("/createUsuario", usuarioController.createUsuario);
api.get("/getUsuario", usuarioController.getUsuario);
api.get("/getUsuarios", usuarioController.getUsuarios);
api.get("/getUsuariosInstitucion", usuarioController.getUsuariosInstitucion);
api.get("/getUsuariosWithNameInstitucion", usuarioController.getUsuariosWithNameInstitucion);
api.put("/updateUsuario", usuarioController.updateUsuario);
api.delete("/deleteUsuario", usuarioController.deleteUsuario);

module.exports = api;