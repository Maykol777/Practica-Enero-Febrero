const express = require('express');
const preventivoController = require('../controllers/ManPreventivoController');
const api = express.Router();

api.post("/createPreventiva", preventivoController.createPreventiva );
api.post("/createPreventivaVehiculo", preventivoController.createPreventivaVehiculo)
api.get("/getPreventiva",preventivoController.getPreventiva);
api.get("/getPreventivaVehiculo", preventivoController.getPreventivaVehiculo)
api.get("/getPreventivas", preventivoController.getPreventivas);
api.get("/getPreventivasEquipo", preventivoController.getPreventivasEquipo);
api.get("/getPreventivasVehiculos", preventivoController.getPreventivasVehiculo)
api.get("/getPreventivasEquipoAno", preventivoController.getPreventivasEquipoAno);
api.get("/getPreventivasVehiculoAno", preventivoController.getPreventivasVehiculoAno);
api.get("/getPreventivaEquipoCount", preventivoController.getPreventivaEquipoCount);
api.get("/getPreventivaEquipoCountActual", preventivoController.getPreventivaEquipoCountActual);
api.get("/getPreventivasPromedioMesInstitucionVehiculo", preventivoController.getPreventivasPromedioMesInstitucionVehiculo);
api.get("/getPreventivaVehiculoCountActual", preventivoController.getPreventivaVehiculoCountActual);
api.get("/getPreventivasTotalInstitucion", preventivoController.getPreventivasTotalInstitucion);
api.get("/getPreventivasTotalRealizadaInstitucion", preventivoController.getPreventivasTotalRealizadaInstitucion);
api.get("/getPreventivasPromedioTotalInstituciones", preventivoController.getPreventivasPromedioTotalInstituciones);
api.get("/getPreventivasPromedioTotalInstitucion", preventivoController.getPreventivasPromedioTotalInstitucion);
api.get("/getPreventivasPromedioTotalEquipoInstitucion", preventivoController.getPreventivasPromedioTotalEquipoInstitucion);
api.get("/getPreventivasPromedioTotalInstitucionCriticidad", preventivoController.getPreventivasPromedioTotalInstitucionCriticidad);
api.get("/getPreventivasPromedioTotalEquipoInstitucionCriticidad", preventivoController.getPreventivasPromedioTotalEquipoInstitucionCriticidad);
api.get("/getPreventivasPromedioEquipoInstituciones", preventivoController.getPreventivasPromedioEquipoInstituciones);
api.get("/getPreventivasPromedioActualInstitucion", preventivoController.getPreventivasPromedioActualInstitucion);
api.get("/getPreventivasPromedioActualEquipoInstitucion", preventivoController.getPreventivasPromedioActualEquipoInstitucion);
api.get("/getPreventivasPromedioActualInstitucionCriticidad", preventivoController.getPreventivasPromedioActualInstitucionCriticidad);
api.get("/getPreventivasPromedioActualEquipoInstitucionCriticidad", preventivoController.getPreventivasPromedioActualEquipoInstitucionCriticidad);
api.get("/getPreventivasPromedioMesInstitucion", preventivoController.getPreventivasPromedioMesInstitucion);
api.get("/getPreventivasPromedioActualInstitucionEquipo", preventivoController.getPreventivasPromedioActualInstitucionEquipo);
api.get("/getPreventivasPromedioMesInstitucionEquipo", preventivoController.getPreventivasPromedioMesInstitucionEquipo);
api.get("/getPreventivasPromedioVehiculoInstitucion", preventivoController.getPreventivasPromedioVehiculoInstitucion);
api.get("/getPreventivasPromedioVehiculoInstitucionCriticidad", preventivoController.getPreventivasPromedioVehiculoInstitucionCriticidad);
api.get("/getPreventivasPromedioActualVehiculoInstitucionCriticidad", preventivoController.getPreventivasPromedioActualVehiculoInstitucionCriticidad);
api.get("/getPreventivasPromedioActualVehiculoInstitucion", preventivoController.getPreventivasPromedioActualVehiculoInstitucion);
api.get("/getPreventivaLast", preventivoController.getPreventivaEquipoLast);
api.get("/getPreventivaVehiculoLast", preventivoController.getPreventivaVehiculoLast);
api.put("/updatePreventiva", preventivoController.updatePreventiva);
api.put("/updatePreventivaVehiculo", preventivoController.updatePreventivaVehiculo)
api.delete("/deletePreventiva",preventivoController.deletePreventiva);

module.exports = api;