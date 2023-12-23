const express = require('express');
const institucionController = require('../controllers/institucionController');
const api = express.Router();

api.post("/createInstitucion", institucionController.createInstitucion);
api.get("/getInstitucion", institucionController.getInstitucion);
api.get("/getInstituciones", institucionController.getInstituciones);
api.get("/getAllInstituciones", institucionController.getAllInstituciones);
api.put("/updateInstitucion", institucionController.updateInstitucion);
api.delete("/deleteInstitucion", institucionController.deleteInstitucion);

module.exports = api;