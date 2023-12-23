const express = require('express');
const equipoController = require('../controllers/equipoController')
const api = express.Router();

api.post("/createEquipo", equipoController.createEquipo);
api.get("/getEquipo", equipoController.getEquipo);
api.get("/getEquipos", equipoController.getEquipos);
api.get("/getEquiposInstitucion", equipoController.getEquiposInstitucion);
api.get("/getEquiposInstitucionNoConvenio", equipoController.getEquiposInstitucionNoConvenio);
api.get("/getNumeroEquiposInstitucion", equipoController.getNumeroEquiposInstitucion)
api.get("/getEquiposInstitucionTipo", equipoController.getEquiposInstitucionTipo);
api.get("/getEquiposInstitucionCriticidad", equipoController.getEquiposInstitucionCriticidad)
api.get("/getEquiposConvenio", equipoController.getEquiposConvenio);
api.get("/getEquipoMantencion", equipoController.getEquipoMantencion);
api.get("/getEquiposInstitucionBajaVidaUtil", equipoController.getEquiposInstitucionBajaVidaUtil);
api.get("/getEquiposInstitucionBajaVidaUtilTipo", equipoController.getEquiposInstitucionBajaVidaUtilTipo);
api.get("/getAllEquiposInstitucionBajaVidaUtilTipo", equipoController.getAllEquiposInstitucionBajaVidaUtilTipo);
api.put("/updateEquipo", equipoController.updateEquipo);
api.put("/updateEquipoConvenio", equipoController.updateEquipoConvenio);
api.put("/updateEquipoConvenioDelete", equipoController.updateEquipoConvenioDelete);
api.delete("/deleteEquipo", equipoController.deleteEquipo);
api.delete("/deleteEquipoConvenio", equipoController.deleteEquipoConvenio);

module.exports = api;