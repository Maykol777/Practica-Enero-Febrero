const mysql = require('mysql');
const dotenv = require('dotenv');
const regex = require("../utils/regex");
dotenv.config();

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PW,
    database: "practica"
})

/*
    crear mantencion correctiva
    url: http://localhost:8000/api/createMantencionCorrectiva
    body: { idEquipo, fecha, descripcion, costo }
*/

const createMantencionCorrectiva = (req, res) => {
    const mantencion = req.body;

    if(!mantencion) {
        return res.status(400).send({ error: true, message: 'Mantencion correctiva no ingresada.' });
    }
    if(!mantencion.descripcion || !mantencion.fecha || !mantencion.costo || !mantencion.idEquipo) {
        return res.status(400).send({ error: true, message: 'No se ingresaron todos los datos.' });
    }
    if(!regex.useRegexNumber(mantencion.costo)){
        return res.status(401).send({ message: 'Error al ingresar los datos.' });
    }
    con.query(`INSERT INTO mantencionCorrectiva (idEquipo, fecha, descripcion, costo) VALUES ("${mantencion.idEquipo}",
    "${mantencion.fecha}", "${mantencion.descripcion}", ${mantencion.costo})`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Mantencion correctiva creada correctamente.'});
    });
}

/*
    obtener mantencion correctiva
    url: http://localhost:3000/api/getMantencionCorrectiva?id={idMantencion}
    query: { idMantencion }
    return: mantencion preventiva
*/

const getMantencionCorrectiva = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de mantencion correctiva no ingresada.' });
    }
    con.query('SELECT * FROM mantencionCorrectiva WHERE idMantencion = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantencion correctiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Mantencion correctiva obtenida correctamente.' });
    });
}

/*
    obtener mantenciones correctivas
    url: http://localhost:8000/api/getMantencionCorrectivas
    return: lista de mantenciones correctivas
*/

const getMantencionCorrectivas = (req, res) => {
    con.query('SELECT * FROM mantencionCorrectiva WHERE eliminado = 0', (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de matenciones correctivas.'});
    });
}

/*
    obtener mantenciones correctivas de un equipo
    url: http://localhost:8000/api/getMantencionCorrectivasEquipo?id={idEquipo}
    query: { idEquipo }
    return: lista de mantenciones correctivas de un equipo
*/

const getMantencionCorrectivasEquipo = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM mantencionCorrectiva WHERE idEquipo = ? AND eliminado = 0', id, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Lista de matenciones correctivas.'});
    });
}

/*
    obtener total de mantenciones correctivas de un equipo
    url: http://localhost:8000/api/getMantencionCorrectivasEquipoCount?id={idEquipo}
    query: { idEquipo }
    return: total de mantenciones correctivas de un equipo
*/

const getMantencionCorrectivasEquipoCount = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT count(1) as total FROM mantencionCorrectiva WHERE idEquipo = ? AND eliminado = 0',id , (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Total de matenciones correctivas.'});
    });
}

/*
    obtener total de mantenciones correctivas por equipo equipo de una institucion
    url: http://localhost:8000/api/getMantencionCorrectivasEquiposInstitucionCount?id={idInstitucion}
    query: { idInstitucion }
    return: arreglo con el total de mantenciones correctivas por equipo de una institucion
*/

const getMantencionCorrectivasEquiposInstitucionCount = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query(`select count(1) as total, mc.idEquipo from mantencionCorrectiva mc, equipo e, institucion i
    where mc.idEquipo = e.idEquipo and e.idInstitucion = i.idInstitucion and i.IdInstitucion = ${id} and mc.eliminado = 0 group by mc.idEquipo`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Total de matenciones correctivas.'});
    });
}

/*
    obtener total de mantenciones correctivas de un equipo en el año actual
    url: http://localhost:8000/api/getMantencionCorrectivasEquipoCountActual?id={idEquipo}
    query: { idEquipo }
    return: total de mantenciones correctivas de un equipo en el año actual
*/

const getMantencionCorrectivasEquipoCountActual = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT count(1) as total FROM mantencionCorrectiva WHERE year(fecha) = year(now()) and idEquipo = ? AND eliminado = 0',id , (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Total de matenciones correctivas.'});
    });
}

/*
    obtener total de mantenciones correctivas de las instituciones
    url: http://localhost:8000/api/getMantencionCorrectivasInstituciones
    return: arreglo con el total de mantenciones correctivas por institucion
*/

const getMantencionCorrectivasInstituciones = (req, res) => {
    con.query(`select count(1) as mc, i.idInstitucion from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and year(mc.fecha) = year(now()) AND mc.eliminado = 0
    group by i.idInstitucion`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas de equipos criticos por institucion
    url: http://localhost:8000/api/getMantencionCorrectivasCriticoInstituciones
    return: arreglo con el total de mantenciones correctivas de equipos criticos por institucion
*/

const getMantencionCorrectivasCriticoInstituciones = (req, res) => {
    con.query(`select count(1) as mcc, i.idInstitucion from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and year(mc.fecha) = year(now()) and e.criticidad = "critico" AND mc.eliminado = 0
    group by i.idInstitucion`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas de equipos relevantes por institucion
    url: http://localhost:8000/api/getMantencionCorrectivasRelevanteInstituciones
    return: arreglo con el total de mantenciones correctivas de equipos relevantes por institucion
*/

const getMantencionCorrectivasRelevanteInstituciones = (req, res) => {
    con.query(`select count(1) as mcr, i.idInstitucion from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and year(mc.fecha) = year(now()) and e.criticidad = "relevante" AND mc.eliminado = 0
    group by i.idInstitucion`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas de una institucion
    url: http://localhost:8000/api/getMantencionCorrectivasInstitucion?id={idInstitucion}
    query: { idInstitucion }
    return: total de mantenciones correctivas de una institucion
*/

const getMantencionCorrectivasInstitucion = (req, res) => {
    const id = req.query.id;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as mc from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and
    year(mc.fecha) = year(now()) AND mc.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas a equipos por criticidad de una institucion
    url: http://localhost:8000/api/getMantencionCorrectivasCriticidadInstitucion?id={idInstitucion}&criticidad={criticidad}
    query: { idInstitucion, criticidad }
    return: total de mantenciones correctivas a equipos por criticidad de una institucion
*/

const getMantencionCorrectivasCriticidadInstitucion = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as mcc from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and year(mc.fecha) = year(now())
    and e.criticidad = "${criticidad}" AND mc.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas a equipos por tipo de una institucion
    url: http://localhost:8000/api/getMantencionCorrectivasEquipoInstitucion?id={idInstitucion}&tipo={tipoEquipo}
    query: { idInstitucion, tipoEquipo }
    return: total de mantenciones correctivas a equipos por tipo de una institucion
*/

const getMantencionCorrectivasEquipoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as mc from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and
    year(mc.fecha) = year(now()) and e.tipoEquipo = "${tipo}" AND mc.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener total de mantenciones correctivas a equipos por tipo y criticidad de una institucion
    url: http://localhost:8000/api/getMantencionCorrectivasEquipoInstitucion?id={idInstitucion}&tipo={tipoEquipo}&criticidad={criticidad}
    query: { idInstitucion, tipoEquipo, criticidad }
    return: total de mantenciones correctivas a equipos por tipo y criticidad de una institucion
*/

const getMantencionCorrectivasCriticidadEquipoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;
    const criticidad = req.query.criticidad;

    if(!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as mcc from mantencionCorrectiva mc, equipo e, institucion i
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mc.idEquipo and year(mc.fecha) = year(now())
    and e.criticidad = "${criticidad}" and e.tipoEquipo = "${tipo}" AND mc.eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send(results)
    })
}

/*
    obtener año de la primera mantencion correctiva de un equipo
    url: http://localhost:8000/api/getMantencionCorrectivaEquipoAnoPrimera?id={idEquipo}
    query: { idEquipo }
    return: año de la primera mantencion correctiva de un equipo
*/

const getMantencionCorrectivaEquipoAnoPrimera = (req, res) => {
    const id = req.query.id;

    if(!id) return res.status(400).send({ erros: true, message: 'Id no ingresada.'});
    con.query(`SELECT min(year(fecha)) as ano FROM mantencionCorrectiva WHERE idEquipo = ${id} AND eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Año de la primera mantencion correctiva encontrado correctamente.' });
    })
}

/*
    obtener año de la ultima mantencion correctiva de un equipo
    url: http://localhost:8000/api/getMantencionCorrectivaEquipoAnoUltima?id={idEquipo}
    query: { idEquipo }
    return: año de la ultima mantencion correctiva de un equipo
*/

const getMantencionCorrectivaEquipoAnoUltima = (req, res) => {
    const id = req.query.id;

    if(!id) return res.status(400).send({ erros: true, message: 'Id no ingresada.'});
    con.query(`SELECT max(year(fecha)) as ano FROM mantencionCorrectiva WHERE idEquipo = ${id} AND eliminado = 0`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones correctivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: 'Año de la primera mantencion correctiva encontrado correctamente.' });
    })
}

/*
    actualizar mantencion correctiva
    url: http://localhost:3000/api/updateMantencionCorrectiva?id={idMantencion}
    query: { idMantencion }
*/

const updateMantencionCorrectiva = (req, res) => {
    const id = req.query.id;
    const mantencion = req.body;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de mantencion correctiva no igresada.' });
    }
    if(!mantencion.descripcion || !mantencion.fecha || !mantencion.costo || !mantencion.idEquipo) {
        return res.status(400).send({ error: true, message: 'No se ingresaron todos los datos.' });
    }
    if(!regex.useRegexNumber(mantencion.costo)){
        return res.status(400).send({ message: 'Error al ingresar los datos.' });
    }
    con.query(`UPDATE mantencionCorrectiva SET idEquipo = "${mantencion.idEquipo}", fecha = "${mantencion.fecha}",
    descripcion = "${mantencion.descripcion}", costo = ${mantencion.costo} WHERE idMantencion = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Mantencion correctiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Mantencion correctiva actualizado correctamente.'});
    });
}

/*
    eliminar mantencion correctiva (actualiza parametro "eliminado" de 0 a 1)
    url: http://localhost:3000/api/deleteMantencionCorrectiva?id={idMantencion}
    query: { idMantencion }
*/

const deleteMantencionCorrectiva = (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send({ error: true, message: 'Id de mantencion correctiva no ingresada.' });
    }
    con.query(`UPDATE mantencionCorrectiva SET eliminado = 1 WHERE idMantencion = "${id}"`, (error, results, fields) => {
        if(error) return res.status(400).send(error);
        if(results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Mantencion correctiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Mantencion correctiva eliminada correctamente.' })
    });
}

module.exports = {
    createMantencionCorrectiva,
    getMantencionCorrectiva,
    getMantencionCorrectivas,
    getMantencionCorrectivasEquipo,
    getMantencionCorrectivasEquipoCount,
    getMantencionCorrectivasEquipoCountActual,
    getMantencionCorrectivasEquiposInstitucionCount,
    getMantencionCorrectivasInstituciones,
    getMantencionCorrectivasCriticoInstituciones,
    getMantencionCorrectivasRelevanteInstituciones,
    getMantencionCorrectivasInstitucion,
    getMantencionCorrectivasCriticidadInstitucion,
    getMantencionCorrectivasEquipoInstitucion,
    getMantencionCorrectivasCriticidadEquipoInstitucion,
    getMantencionCorrectivaEquipoAnoPrimera,
    getMantencionCorrectivaEquipoAnoUltima,
    updateMantencionCorrectiva,
    deleteMantencionCorrectiva,
}