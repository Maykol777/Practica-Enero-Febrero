const conv = require('./convenioController');
const mysql = require('mysql');
const dotenv = require('dotenv');
const regex = require('../utils/regex');
dotenv.config();

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PW,
    database: "practica"
})

const createEquipo = (req, res)=>{
    const equipo = req.body;

    if(!equipo){
        return res.status(400).send({error:true, message:"Error al ingresar equipo"});
    }
    if(equipo.tipoEquipo === 'medico'){
        if(!equipo.ubicacion && !equipo.clase && !equipo.subclase && !equipo.nombre && !equipo.marca && !equipo.modelo && !equipo.serie && !equipo.numeroInventario && !equipo.ano && !equipo.vidaUtil && !equipo.propietario && !equipo.estado && !equipo.criticidad){
            return res.status(401).send({error:true, message:"Datos no ingresados"});
        }
    }
    if(equipo.tipoEquipo === 'industrial'){
        if(!equipo.ubicacion && !equipo.clase && !equipo.subclase && !equipo.nombre && !equipo.marca && !equipo.modelo && !equipo.estado && !equipo.ano){
            return res.status(401).send({error:true, message:"Datos no ingresados"});
        }
    }
    if(equipo.tipoEquipo === 'vehiculo'){
        if(!equipo.ubicacion && !equipo.carroceria && !equipo.tipoAmbulancia && !equipo.clase && !equipo.samu && !equipo.funcion && !equipo.numeroInventario && !equipo.marca && !equipo.modelo && !equipo.patente && !equipo.numeroMotor && !equipo.ano && !equipo.kilometraje && !equipo.estado && !equipo.propietario){
            return res.status(401).send({error:true, message:"Datos no ingresados"});
        }
    }

    con.query(`INSERT INTO equipo(idConvenio, idInstitucion, tipoEquipo, ubicacion, subUbicacion, clase, subclase, nombre, marca, modelo,
        serie, numeroInventario, valor, ano, vidaUtil, propietario, estado, criticidad, garantia, vencimientoGarantia, planMantencion, normativa,
        cantidad, carroceria, tipoAmbulancia, samu, funcion, patente, numeroMotor, kilometraje) VALUES
        ("${equipo.idConvenio}", "${equipo.idInstitucion}", "${equipo.tipoEquipo}", "${equipo.ubicacion}", "${equipo.subUbicacion}",
        "${equipo.clase}", "${equipo.subclase}","${equipo.nombre}", "${equipo.marca}","${equipo.modelo}","${equipo.serie}",
        "${equipo.numeroInventario}", "${equipo.valor}", "${equipo.ano}","${equipo.vidaUtil}", "${equipo.propietario}",
        "${equipo.estado}","${equipo.criticidad}","${equipo.garantia}","${equipo.vencimientoGarantia}","${equipo.planMantencion}",
        "${equipo.normativa}","${equipo.cantidad}","${equipo.carroceria}","${equipo.tipoAmbulancia}","${equipo.samu}","${equipo.funcion}",
        "${equipo.patente}","${equipo.numeroMotor}","${equipo.kilometraje}")`, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Equipo creado'});
    });
}

const getEquipo = (req,res) =>{
    const id=req.query.id;

    if(!id){
        return res.status(400).send({error: true, message:'Id no ingresada'})
    }
    con.query('SELECT * FROM equipo WHERE idEquipo = ? AND eliminado = 0', id,(error,results, fields)=>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        return res.status(201).send({error: false, data: results, message:"Equipo obtenido"});
    });
}

const getEquipoMantencion = (req,res) =>{
    const id=req.query.id;

    if(!id){
        return res.status(400).send({error: true, message:'Id no ingresada'})
    }

    con.query(`SELECT * FROM equipo e, mantencionpreventiva m WHERE e.idEquipo = m.idEquipo AND e.idEquipo = ${id}
    AND m.anoPr = (SELECT MAX(anoPr) FROM mantencionpreventiva WHERE idEquipo = ${id}) AND NOT e.tipoEquipo = 'vehiculo' AND e.eliminado = 0 AND m.eliminado = 0`,(error,results, fields)=>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        return res.status(201).send({error: false, data: results, message:"Equipo obtenido"});
    });
}

const getEquipos = (req, res) => {
    con.query('SELECT * FROM equipo WHERE eliminado = 0', (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM equipo WHERE idInstitucion = ? AND eliminado = 0', id, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getNumeroEquiposInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT count(1)  AS total FROM equipo WHERE idInstitucion = ? AND eliminado = 0', id, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query(`SELECT count(1)  AS total FROM equipo WHERE idInstitucion = ${id} AND eliminado = 0 AND criticidad = "${tipo}"`, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposInstitucionNoConvenio = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM equipo WHERE idInstitucion = ? AND idConvenio = 0 AND eliminado = 0', id, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposInstitucionTipo = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    if(!tipo) {
        return res.status(400).send({ error: true, message: 'Tipo de equipo no ingresada.' });
    }
    con.query(`SELECT * FROM equipo WHERE idInstitucion = ${id} and tipoEquipo = "${tipo}" AND eliminado = 0`, (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposConvenio = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM equipo WHERE idConvenio = ? AND eliminado = 0',id , (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de equipos'});
    });
}

const getEquiposInstitucionBajaVidaUtil = (req, res) => {
    const id = req.query.id;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as total from equipo e, institucion i  where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion
    and (e.ano + e.vidaUtil) - year(now()) < 3  AND e.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Cantidad de equipos con baja vida util'});
    })
}

const getEquiposInstitucionBajaVidaUtilTipo = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as total from equipo e, institucion i  where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion
    and (e.ano + e.vidaUtil) - year(now()) < 3 and e.tipoEquipo = "${tipo}" AND e.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Cantidad de equipos con baja vida util'});
    })
}

const getAllEquiposInstitucionBajaVidaUtilTipo = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select e.* from equipo e, institucion i  where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion
    and (e.ano + e.vidaUtil) - year(now()) < 3 and e.tipoEquipo = "${tipo}" AND e.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Equipos no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Cantidad de equipos con baja vida util'});
    })
}

const updateEquipo = (req, res)=>{
    const id = req.query.id;
    const equipo = req.body;

    if(!id){
        return res.status(400).send({error:true, message:"Id no ingresada"});
    }
    con.query(`UPDATE equipo SET idConvenio = ${equipo.idConvenio}, idInstitucion = ${equipo.idInstitucion},
    tipoEquipo = "${equipo.tipoEquipo}", ubicacion = "${equipo.ubicacion}", subUbicacion = "${equipo.subUbicacion}",
    clase = "${equipo.clase}", subclase = "${equipo.subclase}", nombre = "${equipo.nombre}", marca = "${equipo.marca}",
    modelo = "${equipo.modelo}", serie = "${equipo.serie}", numeroInventario = "${equipo.numeroInventario}", valor = "${equipo.valor}",
    ano = "${equipo.ano}", vidaUtil = "${equipo.vidaUtil}", propietario = "${equipo.propietario}", estado = "${equipo.estado}",
    criticidad = "${equipo.criticidad}", garantia = "${equipo.garantia}", vencimientoGarantia = "${equipo.vencimientoGarantia}",
    planMantencion = "${equipo.planMantencion}", normativa = "${equipo.normativa}", cantidad = "${equipo.cantidad}",
    carroceria = "${equipo.carroceria}", tipoAmbulancia = "${equipo.tipoAmbulancia}", samu = "${equipo.samu}", funcion = "${equipo.funcion}",
    patente = "${equipo.patente}", numeroMotor = "${equipo.numeroMotor}", kilometraje = "${equipo.kilometraje}"
    WHERE idEquipo = ${id}`, (error, results, fields)=>{
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Equipo actualizado'});
    });
}

const updateEquipoConvenio = (req, res) => {
    const idConvenio = req.query.id;
    const equipo = req.body;

    if(!idConvenio || !equipo) {
        return res.status(401).send({ error: true, message: 'Datos no ingresados.' });
    }
    equipo.map(equipos => {
        con.query(`UPDATE equipo SET idConvenio = ${idConvenio} WHERE idEquipo = ${equipos.idEquipo}`, (error, results, fields) => {
            if(error) return res.status(400).send(error);
            if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        })
    })
    con.query(`SELECT COUNT(idEquipo) AS convenioCount FROM equipo WHERE idConvenio = ${idConvenio}`, (error, results) => {
        if(error) return res.status(400).send(error);
        con.query(`UPDATE convenio SET numeroEquipos = ${results[0].convenioCount} WHERE idConvenio = ${idConvenio}`, (error, results) => {
            if(error) return res.status(400).send(error);
            return res.status(201).send({ error: false, message: 'Numero de equipos de convenio actualizado correctamente.' });
        })
    })
}

const updateEquipoConvenioDelete = (req, res) => {
    const idConvenio = req.query.id;
    const equipo = req.body;

    if(!idConvenio || !equipo) {
        return res.status(401).send({ error: true, message: 'Datos no ingresados.' });
    }
    con.query(`UPDATE equipo SET idConvenio = 0 WHERE idEquipo = ${equipo.idEquipo}`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        con.query(`SELECT COUNT(idEquipo) AS convenioCount FROM equipo WHERE idConvenio = ${idConvenio}`, (error, results) => {
            if(error) return res.status(400).send(error);
            con.query(`UPDATE convenio SET numeroEquipos = ${results[0].convenioCount} WHERE idConvenio = ${idConvenio}`, (error, results) => {
                if(error) return res.status(400).send(error);
                return res.status(201).send({ error: false, message: 'Numero de equipos de convenio actualizado correctamente.' });
            })
        })
    })
}

const deleteEquipo = (req,res)=>{
    const id = req.query.id;

    if(!id){
        return res.status(400).send({error:true, message:'Id no ingresada'});
    }
    con.query('UPDATE equipo SET eliminado = 1 WHERE idEquipo = ?', id,(error, results, fields)=>{
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Equipo no encontrado.' });
        return res.status(201).send({error:false, data:results, message:'Equipo eliminado'});
    });
}

const deleteEquipoConvenio = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query('UPDATE equipo SET idConvenio = 0 WHERE idConvenio = ?', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, message: 'Equipos eliminados de convenio correctamente.' });
    })
}

module.exports ={
    createEquipo,
    getEquipo,
    getEquipos,
    getEquiposInstitucion,
    getEquiposInstitucionNoConvenio,
    getEquiposInstitucionTipo,
    getEquiposConvenio,
    getEquipoMantencion,
    getNumeroEquiposInstitucion,
    getEquiposInstitucionCriticidad,
    getEquiposInstitucionBajaVidaUtil,
    getEquiposInstitucionBajaVidaUtilTipo,
    getAllEquiposInstitucionBajaVidaUtilTipo,
    updateEquipo,
    updateEquipoConvenio,
    updateEquipoConvenioDelete,
    deleteEquipo,
    deleteEquipoConvenio,
}