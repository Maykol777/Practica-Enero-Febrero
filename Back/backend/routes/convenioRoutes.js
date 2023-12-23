const express = require('express');
const convenioController = require('../controllers/convenioController');
const api = express.Router();

api.post("/createConvenio", convenioController.createConvenio);
api.get("/getConvenio", convenioController.getConvenio);
api.get("/getConvenios", convenioController.getConvenios);
api.get("/getConveniosInstitucion", convenioController.getConveniosInstitucion);
api.put("/updateConvenio", convenioController.updateConvenio);
api.put("/updateConvenioNumber", convenioController.updateConvenioNumber);
api.delete("/deleteConvenio", convenioController.deleteConvenio);
api.delete("/deleteConvenioNull", convenioController.deleteConvenioNull);

module.exports = api;