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

const createConvenio = (req, res) => {
    const convenio = req.body;

    if(!convenio) {
        return res.status(400).send({ error: true, message: 'Convenio no ingresado.' });
    }
    if(!convenio.nombre || !convenio.idInstitucion || !convenio.idOrdenCompra || !convenio.proveedor || !convenio.resolucion
    || !convenio.vigencia || !convenio.costo || !convenio.subasignacion) {
        return res.status(400).send({ error: true, message: 'No se ingresaron todos los datos.' });
    }
    if(!regex.useRegexChar(convenio.nombre) || !regex.useRegexChar(convenio.proveedor) || !regex.useRegexNumber(convenio.costo)) {
        return res.status(401).send({ message: 'Error al ingresar los datos.' });
    }
    con.query(`INSERT INTO convenio (idInstitucion, nombre, idOrdenCompra, proveedor, resolucion, vigencia, costo, subasignacion) VALUES
    ("${convenio.idInstitucion}", "${convenio.nombre}", "${convenio.idOrdenCompra}", "${convenio.proveedor}", "${convenio.resolucion}",
    "${convenio.vigencia}", "${convenio.costo}", "${convenio.subasignacion}")`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Convenio creado correctamente.'});
    });
}

const getConvenio = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de convenio no ingresada.' });
    }
    con.query('SELECT * FROM convenio WHERE idConvenio = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Convenio no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Convenio obtenido correctamente.' });
    });
}

const getConvenios = (req, res) => {
    con.query('SELECT * FROM convenio WHERE eliminado = 0', (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Convenios no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de convenios.'});
    });
}

const getConveniosInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de institucion no ingresada.' });
    }
    con.query('SELECT * FROM convenio WHERE idInstitucion = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Convenios no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de convenios.'});
    });
}

const updateConvenio = (req, res) => {
    const id = req.query.id;
    const convenio = req.body;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de convenio no igresada.' });
    }
    if(!regex.useRegexChar(convenio.nombre) || !regex.useRegexChar(convenio.proveedor) || !regex.useRegexNumber(convenio.costo)) {
        return res.status(401).send({ message: 'Error al ingresar los datos.' });
    }
    con.query(`UPDATE convenio SET idInstitucion = "${convenio.idInstitucion}", nombre = "${convenio.nombre}",
    idOrdenCompra = "${convenio.idOrdenCompra}", proveedor = "${convenio.proveedor}", resolucion = "${convenio.resolucion}",
    vigencia = "${convenio.vigencia}", costo = ${convenio.costo}, subasignacion = "${convenio.subasignacion}"
    WHERE idConvenio = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Convenio no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Convenio actualizado correctamente.'});
    });
}

const updateConvenioNumber = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`SELECT COUNT(idEquipo) AS convenioCount FROM equipo WHERE idConvenio = ${id}`, (error, results) => {
        if(error) return res.status(400).send(error);
        con.query(`UPDATE convenio SET numeroEquipos = ${results[0].convenioCount} WHERE idConvenio = ${id}`, (error, results) => {
            if(error) return res.status(400).send(error);
            return res.status(201).send({ error: false, message: 'Numero de equipos de convenio actualizado correctamente.' });
        })
    })
}

const deleteConvenio = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de convenio no ingresada.' });
    }
    con.query(`UPDATE convenio SET eliminado = 1 WHERE idConvenio = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Convenio no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Convenio eliminado correctamente.' })
    });
}

const deleteConvenioNull = (req, res) => {
    con.query(`DELETE FROM convenio WHERE numeroEquipos = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Convenio no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Convenio eliminado correctamente.' })
    });
}

module.exports = {
    createConvenio,
    getConvenio,
    getConvenios,
    getConveniosInstitucion,
    updateConvenio,
    updateConvenioNumber,
    deleteConvenio,
    deleteConvenioNull,
}