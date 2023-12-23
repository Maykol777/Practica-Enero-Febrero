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

const createInstitucion = (req, res) => {
    const institucion = req.body;

    if(!institucion) {
        return res.status(400).send({ error: true, message: 'Institucion no ingresada.' });
    }
    if(!institucion.nombre || !institucion.ciudad || !institucion.region) {
        return res.status(400).send({ error: true, message: 'No se ingresaron todos los datos.'});
    }
    if(!regex.useRegexChar(institucion.nombre) || !regex.useRegexChar(institucion.ciudad)) {
        return res.status(401).send({ message: 'Error al ingresar datos.' });
    }
    con.query(`INSERT INTO institucion (nombre, ciudad, region) VALUES ("${institucion.nombre}", "${institucion.ciudad}",
    "${institucion.region}")`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Institucion creada correctamente.'});
    });
}

const getInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de institucion no igresada.' });
    }
    con.query('SELECT * FROM institucion WHERE idInstitucion = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Institucion no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Institucion obtenida correctamente.'});
    });
}

const getInstituciones = (req, res) => {
    con.query('SELECT * FROM institucion WHERE eliminado = 0 and idInstitucion > 0', (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Instituciones no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de instituciones.'});
    });
}

const getAllInstituciones = (req, res) => {
    con.query('SELECT * FROM institucion WHERE eliminado = 0', (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Instituciones no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de instituciones.'});
    });
}

const updateInstitucion = (req, res) => {
    const id = req.query.id;
    const institucion = req.body;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de institucion no igresada.' });
    }
    if(!regex.useRegexChar(institucion.nombre) || !regex.useRegexChar(institucion.ciudad)) {
        return res.status(400).send({ message: 'Error al ingresar datos.' });
    }
    con.query(`UPDATE institucion SET nombre = "${institucion.nombre}", ciudad = "${institucion.ciudad}",
    region = "${institucion.region}" WHERE idInstitucion = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Institucion no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Institucion actualizada correctamente.'});
    });
}

const deleteInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de institucion no igresada.' });
    }
    con.query(`UPDATE institucion SET eliminado = 1 WHERE idInstitucion = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Institucion no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Institucion eliminada correctamente.'});
    });
}

module.exports = {
    createInstitucion,
    getInstitucion,
    getInstituciones,
    getAllInstituciones,
    updateInstitucion,
    deleteInstitucion,
}