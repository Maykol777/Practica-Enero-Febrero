const mysql = require('mysql');
const regex = require('../utils/regex');
const dotenv = require('dotenv');
const vRut = require('../utils/rutValidation');
dotenv.config();

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PW,
    database: "practica"
})

/*
    crear usuario
    url: http://localhost:8000/api/createUsuario
    body: { rut, idInstitucion, nombre, clave, cargo }
*/

const createUsuario = (req, res) => {
    const usuario = req.body;

    if(!usuario) {
        return res.status(400).send({ error: true, message: 'Usuario no ingresado.' });
    }
    if(!regex.useRegexChar(usuario.nombre)) {
        return res.status(401).send({ message: 'Error con los caracteres.' });
    }
    if(!vRut.validaRut(usuario.rut)) {
        return res.status(402).send({ message: 'Rut no valido.' });
    }

    con.query(`INSERT INTO usuario (rut, idInstitucion, nombre, clave, cargo) VALUES
    ("${usuario.rut}", "${usuario.idInstitucion}", "${usuario.nombre}", "${usuario.clave}", "${usuario.cargo}")`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Usuario creado correctamente.'});
    });
}

/*
    obtener usuario
    url: http://localhost:3000/api/getUsuario?rut={rut}
    query: { rut }
    return: usuario
*/

const getUsuario = (req, res) => {
    const rut = req.query.rut;

    if(!rut) {
        return res.status(400).send({ error: true, message: 'Rut no ingresado.' });
    }
    con.query('SELECT * FROM usuario WHERE rut = ? AND eliminado = 0', rut, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Usuario no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Usuario obtenido correctamente.'});
    });
}

/*
    obtener usuarios
    url: http://localhost:3000/api/getUsuarios
    return: lista de usuarios
*/

const getUsuarios = (req, res) => {
    con.query('SELECT * FROM usuario WHERE eliminado = 0', (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Usuarios no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de usuarios.'});
    });
}

/*
    obtener usuarios de una institucion
    url: http://localhost:3000/api/getUsuariosInstitucion?id={idInstitucion}
    query: { idInstitucion }
    return: lista de usuarios de una institucion
*/

const getUsuariosInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de institucion no ingresada.' })
    }
    con.query('SELECT * FROM usuario WHERE idInstitucion = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Usuarios no encontrados.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de usuarios.'});
    });
}

/*
    obtener usuarios junto al nombre de la institucion a la que pertenecen
    url: http://localhost:8000/api/getUsuariosWithNameInstitucion
    return: lista de usuarios junto al nombre de su institucion
*/

const getUsuariosWithNameInstitucion = (req, res) => {
    con.query('SELECT * FROM usuario WHERE eliminado = 0', (error, results, fields) =>{
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Usuarios no encontrados.' });
        let usuarios = results;
        con.query('SELECT * FROM institucion WHERE eliminado = 0', (error, resultsm, fields) => {
            if(error) return res.status(400).send(error);
            if(resultsm.length < 1) return res.status(404).send({ error: true, message: 'Instituciones no encontradas.' });
            let instituciones = resultsm;
            let usuario = [];
            usuarios.map(user => {
                let aux;
                instituciones.map(institucion => {
                    if(user.idInstitucion == institucion.idInstitucion) {
                        aux = { ...user, institucion: institucion.nombre };
                    }
                })
                usuario.push(aux);
            })
            return res.status(201).send(usuario);
        });
    });
}

/*
    actualizar usuario
    url: http://localhost:8000/api/updateUsuario?rut={rut}
    query: { rut }
    body: { idInstitucion, nombre, clave, cargo }
*/

const updateUsuario = (req, res) => {
    const rut = req.query.rut;
    const usuario = req.body;

    if(!rut) {
        return res.status(400).send({ error: true, message: 'Rut no ingresado.' });
    }
    if(!regex.useRegexChar(usuario.nombre)) {
        return res.status(400).send({ message: 'Error con los caracteres.' });
    }
    con.query(`UPDATE usuario SET idInstitucion = "${usuario.idInstitucion}", nombre = "${usuario.nombre}",
    clave = "${usuario.clave}", cargo = "${usuario.cargo}" WHERE rut = "${rut}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Usuario no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Usuario actualizado correctamente.'});
    });
}

/*
    eliminar usuario (actualiza parametro "eliminado" de 0 a 1)
    url: http://localhost:3000/api/deleteUsuario?rut={rut}
    query: { rut }
*/

const deleteUsuario = (req, res) => {
    const rut = req.query.rut;

    if(!rut) {
        return res.status(400).send({ error: true, message: 'Rut no ingresado.' });
    }
    con.query(`UPDATE usuario SET eliminado = 1 WHERE rut = "${rut}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Usuario no encontrado.' });
        return res.status(201).send({ error: false, data: results, message: 'Usuario eliminado correctamente.'});
    });
}

module.exports = {
    createUsuario,
    getUsuario,
    getUsuarios,
    getUsuariosInstitucion,
    getUsuariosWithNameInstitucion,
    updateUsuario,
    deleteUsuario,

}