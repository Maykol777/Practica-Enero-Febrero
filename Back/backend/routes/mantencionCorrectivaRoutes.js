const express = require('express');
const mantencionCorrectivaController = require('../controllers/mantencionCorrectivaController');
const api = express.Router();

api.post("/createMantencionCorrectiva", mantencionCorrectivaController.createMantencionCorrectiva);
api.get("/getMantencionCorrectiva", mantencionCorrectivaController.getMantencionCorrectiva);
api.get("/getMantencionCorrectivas", mantencionCorrectivaController.getMantencionCorrectivas);
api.get("/getMantencionCorrectivasEquipo", mantencionCorrectivaController.getMantencionCorrectivasEquipo);
api.get("/getMantencionCorrectivasEquipoCount", mantencionCorrectivaController.getMantencionCorrectivasEquipoCount);
api.get("/getMantencionCorrectivasEquipoCountActual", mantencionCorrectivaController.getMantencionCorrectivasEquipoCountActual);
api.get("/getMantencionCorrectivasEquiposInstitucionCount", mantencionCorrectivaController.getMantencionCorrectivasEquiposInstitucionCount);
api.get("/getMantencionCorrectivasInstituciones", mantencionCorrectivaController.getMantencionCorrectivasInstituciones);
api.get("/getMantencionCorrectivasCriticoInstituciones", mantencionCorrectivaController.getMantencionCorrectivasCriticoInstituciones);
api.get("/getMantencionCorrectivasRelevanteInstituciones", mantencionCorrectivaController.getMantencionCorrectivasRelevanteInstituciones);
api.get("/getMantencionCorrectivasInstitucion", mantencionCorrectivaController.getMantencionCorrectivasInstitucion);
api.get("/getMantencionCorrectivasCriticidadInstitucion", mantencionCorrectivaController.getMantencionCorrectivasCriticidadInstitucion);
api.get("/getMantencionCorrectivasEquipoInstitucion", mantencionCorrectivaController.getMantencionCorrectivasEquipoInstitucion);
api.get("/getMantencionCorrectivasCriticidadEquipoInstitucion", mantencionCorrectivaController.getMantencionCorrectivasCriticidadEquipoInstitucion);
api.get("/getMantencionCorrectivaEquipoAnoPrimera", mantencionCorrectivaController.getMantencionCorrectivaEquipoAnoPrimera);
api.get("/getMantencionCorrectivaEquipoAnoUltima", mantencionCorrectivaController.getMantencionCorrectivaEquipoAnoUltima);
api.put("/updateMantencionCorrectiva", mantencionCorrectivaController.updateMantencionCorrectiva);
api.delete("/deleteMantencionCorrectiva", mantencionCorrectivaController.deleteMantencionCorrectiva);

module.exports = api;