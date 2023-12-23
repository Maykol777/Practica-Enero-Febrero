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

/*
    crear mantencion preventiva
    url: http://localhost:8000/api/createPreventiva
    body: { idEquipo, anoPr, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre }
*/

const createPreventiva = (req, res) => {
    const preventiva = req.body;

    if (!preventiva) {
        return res.status(400).send({ error: true, message: "Error al ingresar mantencion preventiva" });
    }
    if (!preventiva.enero && !preventiva.febrero && !preventiva.marzo && !preventiva.abril && !preventiva.mayo && !preventiva.junio && !preventiva.julio && !preventiva.agosto && !preventiva.septiembre && !preventiva.octubre && !preventiva.noviembre && !preventiva.diciembre) {
        return res.status(401).send({ error: true, message: "Ingreso Vacio" });
    }
    con.query(`INSERT INTO mantencionPreventiva (idEquipo, anoPr, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre)
    VALUES ("${preventiva.idEquipo}", "${preventiva.anoPr}", "${preventiva.enero}", "${preventiva.febrero}", "${preventiva.marzo}", "${preventiva.abril}",
    "${preventiva.mayo}", "${preventiva.junio}", "${preventiva.julio}", "${preventiva.agosto}", "${preventiva.septiembre}",
    "${preventiva.octubre}", "${preventiva.noviembre}", "${preventiva.diciembre}")`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Mantencion preventiva creada' });
    })
}

/*
    crear mantencion preventiva de tipo vehiculo
    url: http://localhost:8000/api/createPreventivaVehiculo
    body: { anoPrKm, kilometraje1, kilometraje2, kilometraje3, kilometraje4, kilometraje5, kilometraje6, kilometraje7, kilometraje8, kilometraje9, kilometraje10, kilometraje11, kilometraje12, idEquipo }
*/

const createPreventivaVehiculo = (req, res) => {
    const preventiva = req.body;

    if (!preventiva) {
        return res.status(400).send({ error: true, message: "Error al ingresar mantencion preventiva" });
    }
    if (!preventiva.kilometraje1 && !preventiva.kilometraje2 && !preventiva.kilometraje3 && !preventiva.kilometraje4 && !preventiva.kilometraje5 && !preventiva.kilometraje6 && !preventiva.kilometraje7 && !preventiva.kilometraje8 && !preventiva.kilometraje9 && !preventiva.kilometraje10 && !preventiva.kilometraje11 && !preventiva.kilometraje12) {
        return res.status(401).send({ error: true, message: "Ingreso Vacio" });
    }
    con.query(`INSERT INTO mantencionpreventivavehiculos (anoPrKm, kilometraje1, kilometraje2, kilometraje3, kilometraje4, kilometraje5, kilometraje6, kilometraje7, kilometraje8, kilometraje9, kilometraje10, kilometraje11, kilometraje12, idEquipo)
    VALUES ("${preventiva.anoPrKm}", "${preventiva.kilometraje1}", "${preventiva.kilometraje2}", "${preventiva.kilometraje3}", "${preventiva.kilometraje4}",
    "${preventiva.kilometraje5}", "${preventiva.kilometraje6}", "${preventiva.kilometraje7}", "${preventiva.kilometraje8}", "${preventiva.kilometraje9}",
    "${preventiva.kilometraje10}", "${preventiva.kilometraje11}", "${preventiva.kilometraje12}","${preventiva.idEquipo}")`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        return res.status(201).send({ error: false, data: results, message: 'Mantencion preventiva vehiculo creada' });
    })
}

/*
    obtener mantencion preventiva
    url: http://localhost:3000/api/getPreventiva?id={idMantencion}
    query: { idMantencion }
    return: mantencion preventiva
*/

const getPreventiva = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status({ error: true, message: 'Id no ingresada' });
    }
    con.query(`SELECT * FROM mantencionPreventiva WHERE idMantencion = ${id} AND eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Mantencion obtenida" });
    });
}

/*
    obtener mantencion preventiva de tipo vehiculo
    url: http://localhost:3000/api/getPreventivaVehiculo?id={idMantencion}
    query: { idMantencion }
    return: mantencion preventiva de tipo vehiculo
*/

const getPreventivaVehiculo = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status({ error: true, message: 'Id no ingresada' });
    }
    con.query(`SELECT * FROM mantencionpreventivavehiculos WHERE idMantencion = ${id} AND eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Mantencion obtenida" });
    });
}

/*
    obtener mantenciones preventivas
    url: http://localhost:3000/api/getPreventivas
    return: lista de mantenciones preventivas
*/

const getPreventivas = (req, res) => {
    con.query('SELECT * FROM mantencionPreventiva WHERE eliminado = 0', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

/*
    obtener mantenciones preventivas de un equipo
    url: http://localhost:8000/api/getPreventivasEquipo?id={idEquipo}
    query: { idEquipo }
    return: mantenciones preventivas de un equipo
*/

const getPreventivasEquipo = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM mantencionPreventiva WHERE idEquipo = ? AND eliminado = 0', id, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

/*
    obtener mantenciones preventivas de un equipo tipo vehiculo
    url: http://localhost:8000/api/getPreventivasEquipo?id={idEquipo}
    query: { idEquipo }
    return: mantenciones preventivas de un equipo tipo vehiculo
*/

const getPreventivasVehiculo = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Id de equipo no ingresada.' });
    }
    con.query('SELECT * FROM mantencionpreventivavehiculos WHERE idEquipo = ? AND eliminado = 0', id, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

/*
    obtener total mantenciones preventivas de un tipo de equipo en el año actual
    url: http://localhost:8000/api/getPreventivasEquipoAno?tipo={tipoEquipo}
    query: { tipoEquipo }
    return: total mantenciones preventivas de un tipo de equipo en el año actual
*/

const getPreventivasEquipoAno = (req, res) => {
    const tipo = req.query.tipo;

    if (!tipo) {
        return res.status(400).send({ error: true, message: 'Debe ingresar tipo.' });
    }
    con.query(`SELECT COUNT(1) AS total FROM equipo e, mantencionPreventiva m WHERE m.anoPr = year(now()) AND e.tipoEquipo = "${tipo}" AND m.eliminado = 0 AND m.idEquipo=e.idEquipo`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

/*
    obtener total mantenciones preventivas de un equipo tipo vehiculo en el año actual
    url: http://localhost:8000/api/getPreventivasVehiculoAno
    return: total mantenciones preventivas de un equipo tipo vehiculo en el año actual
*/

const getPreventivasVehiculoAno = (req, res) => {
    con.query(`SELECT COUNT(1) AS total FROM equipo e, mantencionpreventivavehiculos m WHERE m.anoPrkm = year(now()) AND e.tipoEquipo = 'vehiculo' AND m.eliminado = 0 AND m.idEquipo=e.idEquipo;`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

/*
    obtener total mantenciones preventivas de equipo
    url: http://localhost:8000/api/getPreventivaEquipoCount?id={idEquipo}
    query: { idEquipo }
    return: total mantenciones preventivas de equipo
*/

const getPreventivaEquipoCount = (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'id no encontrada' })
    }
    con.query('SELECT count(1) AS total FROM mantencionPreventiva WHERE idEquipo = ? AND eliminado = 0', id, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Not found' });
        return res.status(201).send({ error: false, data: results, message: 'Total mantenciones' });
    });
}

const getPreventivaVehiculoCount = (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'id no encontrada' })
    }
    con.query('SELECT count(1) AS total FROM mantencionpreventivavehiculos WHERE idEquipo = ? AND eliminado = 0', id, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Not found' });
        return res.status(201).send({ error: false, data: results, message: 'Total mantenciones' });
    });
}

const getPreventivaEquipoCountActual = (req, res) => {

    con.query('SELECT count(1) AS total, mp.idEquipo from mantencionpreventiva mp, equipo e WHERE mp.idEquipo = e.idEquipo AND e.eliminado = 0 AND mp.eliminado = 0 AND mp.anoPr = year(now()) GROUP BY mp.idEquipo ', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Not found' });
        return res.status(201).send({ error: false, data: results, message: 'Total mantenciones' });
    });
}

const getPreventivaVehiculoCountActual = (req, res) => {
    con.query('SELECT count(1) AS total, mp.idEquipo from mantencionpreventivavehiculos mp, equipo e WHERE mp.idEquipo = e.idEquipo AND e.eliminado = 0 AND mp.eliminado = 0 AND mp.anoPrKm = year(now()) GROUP BY mp.idEquipo', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Not found' });
        return res.status(201).send({ error: false, data: results, message: 'Total mantenciones' });
    });
}

const getPreventivasTotalInstitucion = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`SELECT COUNT(1) AS total FROM mantencionPreventiva mp, institucion i, equipo e
    WHERE mp.anoPr = year(now()) AND i.idInstitucion = ${id} AND i.idInstitucion = e.idInstitucion AND e.idEquipo = mp.idEquipo AND (enero != "" OR febrero != "" OR marzo != ""
    OR abril != "" OR mayo != "" OR junio != "" OR julio != "" OR agosto != "" OR septiembre != "" OR octubre != "" OR noviembre != ""
    OR diciembre != "") AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send(results);
    })
}

const getPreventivasTotalRealizadaInstitucion = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`SELECT COUNT(1) AS total FROM mantencionPreventiva mp, institucion i, equipo e
    WHERE i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
    or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
    or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
    and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
    and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
    and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
    noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        return res.status(201).send(results);
    })
}

const getPreventivasPromedioTotalInstituciones = (req, res) => {
    con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
    where i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) AND mp.eliminado = 0 group by i.idInstitucion`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
        where i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) AND mp.eliminado = 0 group by i.idInstitucion`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = []
            results.map(total => {
                resultsm.map(actual => {
                    if (total.idInstitucion == actual.idInstitucion) {
                        promedio.push({
                            promedio: actual.total / total.total * 100,
                            idInstitucion: actual.idInstitucion
                        })
                    }
                })
            })
            return res.status(201).send(promedio);
        })
    })
}

const getPreventivasPromedioTotalInstitucion = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
        where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) AND mp.eliminado = 0`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = resultsm[0].total / results[0].total * 100
            return res.status(201).send({ promedio });
        })
    })
}

const getPreventivasPromedioTotalEquipoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if (!id || !tipo) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
        where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = resultsm[0].total / results[0].total * 100
            return res.status(201).send({ promedio });
        })
    })
}

const getPreventivasPromedioTotalInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;

    if (!id || !criticidad) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`select count(1) as total from mantencionPreventiva mp, institucion i, equipo e
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total from mantencionPreventiva mp, institucion i, equipo e
        where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" AND mp.eliminado = 0`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = resultsm[0].total / results[0].total * 100
            return res.status(201).send({ promedio });
        })
    })
}

const getPreventivasPromedioTotalEquipoInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;
    const tipo = req.query.tipo;

    if (!id || !criticidad || !tipo) {
        return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    }
    con.query(`select count(1) as total from mantencionPreventiva mp, institucion i, equipo e
    where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total from mantencionPreventiva mp, institucion i, equipo e
        where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = resultsm[0].total / results[0].total * 100
            return res.status(201).send({ promedio });
        })
    })
}

const getPreventivasPromedioEquipoInstituciones = (req, res) => {
    const tipo = req.query.tipo;

    con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
    where e.tipoEquipo = "${tipo}" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero != "" or febrero != "" or marzo != ""
    or abril != "" or mayo != "" or junio != "" or julio != "" or agosto != "" or septiembre != "" or octubre != "" or noviembre != ""
    or diciembre != "") and mp.anoPr = year(now()) AND mp.eliminado = 0 group by i.idInstitucion`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionPreventiva mp, institucion i, equipo e
        where e.tipoEquipo = "${tipo}" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (enero = "Realizado" or febrero = "Realizado" or marzo = "Realizado"
        or abril = "Realizado" or mayo = "Realizado" or junio = "Realizado" or julio = "Realizado" or agosto = "Realizado" or septiembre = "Realizado" or octubre = "Realizado" or noviembre = "Realizado"
        or diciembre = "Realizado") and (enero != "Programado" and febrero != "Programado" and marzo != "Programado"
        and abril != "Programado" and mayo != "Programado" and junio != "Programado" and julio != "Programado" and agosto != "Programado" and septiembre != "Programado" and octubre != "Programado" and noviembre != "Programado"
        and diciembre != "Programado") and (enero != "Reprogramado" and febrero != "Reprogramado" and marzo != "Reprogramado"
        and abril != "Reprogramado" and mayo != "Reprogramado" and junio != "Reprogramado" and julio != "Reprogramado" and agosto != "Reprogramado" and septiembre != "Reprogramado" and octubre != "Reprogramado" and
        noviembre != "Reprogramado" and diciembre != "Reprogramado") and mp.anoPr = year(now()) AND mp.eliminado = 0 group by i.idInstitucion`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            let promedio = []
            results.map(total => {
                resultsm.map(actual => {
                    if (total.idInstitucion == actual.idInstitucion) {
                        if (tipo == 'medico') {
                            promedio.push({
                                medico: actual.total / total.total * 100,
                                idInstitucion: actual.idInstitucion
                            })
                        }
                        if (tipo == 'industrial') {
                            promedio.push({
                                industrial: actual.total / total.total * 100,
                                idInstitucion: actual.idInstitucion
                            })
                        }
                        if (tipo == 'vehiculo') {
                            promedio.push({
                                vehiculo: actual.total / total.total * 100,
                                idInstitucion: actual.idInstitucion
                            })
                        }
                    }
                })
            })
            return res.status(201).send(promedio);
        })
    })
}

const getPreventivasPromedioVehiculoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    con.query(`select count(1) as total, i.idInstitucion from mantencionpreventivavehiculos mp, institucion i, equipo e
    where e.tipoEquipo = "vehiculo" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (kilometraje1 != "" or kilometraje2 != "" or kilometraje3 != ""
    or kilometraje4 != "" or kilometraje5 != "" or kilometraje6 != "" or kilometraje7 != "" or kilometraje8 != "" or kilometraje9 != "" or kilometraje10 != "" or kilometraje11 != ""
    or kilometraje12 != "") and mp.anoPrKm = year(now()) AND mp.eliminado = 0 and e.idInstitucion = ${id}`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionpreventivavehiculos mp, institucion i, equipo e
        where e.tipoEquipo = "vehiculo" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (kilometraje1 = "Realizado" or kilometraje2 = "Realizado" or kilometraje3 = "Realizado"
        or kilometraje4 = "Realizado" or kilometraje5 = "Realizado" or kilometraje6 = "Realizado" or kilometraje7 = "Realizado" or kilometraje8 = "Realizado" or kilometraje9 = "Realizado" or kilometraje10 = "Realizado" or kilometraje11 = "Realizado"
        or kilometraje12 = "Realizado") and (kilometraje1 != "Programado" and kilometraje2 != "Programado" and kilometraje3 != "Programado"
        and kilometraje4 != "Programado" and kilometraje5 != "Programado" and kilometraje6 != "Programado" and kilometraje7 != "Programado" and kilometraje8 != "Programado" and kilometraje9 != "Programado" and kilometraje10 != "Programado" and kilometraje11 != "Programado"
        and kilometraje12 != "Programado") and (kilometraje1 != "Reprogramado" and kilometraje2 != "Reprogramado" and kilometraje3 != "Reprogramado"
        and kilometraje4 != "Reprogramado" and kilometraje5 != "Reprogramado" and kilometraje6 != "Reprogramado" and kilometraje7 != "Reprogramado" and kilometraje8 != "Reprogramado" and kilometraje9 != "Reprogramado" and kilometraje10 != "Reprogramado" and
        kilometraje11 != "Reprogramado" and kilometraje12 != "Reprogramado") and mp.anoPrKm = year(now()) AND mp.eliminado = 0 and e.idInstitucion = ${id}`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas V no encontradas.' });
            let promedio = resultsm[0].total / results[0].total * 100;
            return res.status(201).send({ promedio });
        })
    })
}

const getPreventivasPromedioVehiculoInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;
    const criticidad = req.query.criticidad;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    con.query(`select count(1) as total, i.idInstitucion from mantencionpreventivavehiculos mp, institucion i, equipo e
    where e.tipoEquipo = "vehiculo" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (kilometraje1 != "" or kilometraje2 != "" or kilometraje3 != ""
    or kilometraje4 != "" or kilometraje5 != "" or kilometraje6 != "" or kilometraje7 != "" or kilometraje8 != "" or kilometraje9 != "" or kilometraje10 != "" or kilometraje11 != ""
    or kilometraje12 != "") and mp.anoPrKm = year(now()) AND mp.eliminado = 0 and e.criticidad = "${criticidad}" and e.idInstitucion = ${id}`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(`select count(1) as total, i.idInstitucion from mantencionpreventivavehiculos mp, institucion i, equipo e
        where e.tipoEquipo = "vehiculo" and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo and (kilometraje1 = "Realizado" or kilometraje2 = "Realizado" or kilometraje3 = "Realizado"
        or kilometraje4 = "Realizado" or kilometraje5 = "Realizado" or kilometraje6 = "Realizado" or kilometraje7 = "Realizado" or kilometraje8 = "Realizado" or kilometraje9 = "Realizado" or kilometraje10 = "Realizado" or kilometraje11 = "Realizado"
        or kilometraje12 = "Realizado") and (kilometraje1 != "Programado" and kilometraje2 != "Programado" and kilometraje3 != "Programado"
        and kilometraje4 != "Programado" and kilometraje5 != "Programado" and kilometraje6 != "Programado" and kilometraje7 != "Programado" and kilometraje8 != "Programado" and kilometraje9 != "Programado" and kilometraje10 != "Programado" and kilometraje11 != "Programado"
        and kilometraje12 != "Programado") and (kilometraje1 != "Reprogramado" and kilometraje2 != "Reprogramado" and kilometraje3 != "Reprogramado"
        and kilometraje4 != "Reprogramado" and kilometraje5 != "Reprogramado" and kilometraje6 != "Reprogramado" and kilometraje7 != "Reprogramado" and kilometraje8 != "Reprogramado" and kilometraje9 != "Reprogramado" and kilometraje10 != "Reprogramado" and
        kilometraje11 != "Reprogramado" and kilometraje12 != "Reprogramado") and mp.anoPrKm = year(now()) AND mp.eliminado = 0 and e.criticidad = "${criticidad}" and e.idInstitucion = ${id}`, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas V no encontradas.' });
            let promedio = []
            results.map(total => {
                resultsm.map(actual => {
                    if (total.idInstitucion == actual.idInstitucion) {
                        promedio.push({
                            vehiculo: actual.total / total.total * 100,
                            idInstitucion: actual.idInstitucion
                        })
                    }
                })
            })
            return res.status(201).send(promedio);
        })
    })
}

const getPreventivasPromedioActualVehiculoInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;
    const tipo = req.query.tipo;

    if (!id || !criticidad) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventivavehiculos mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventivavehiculos mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['kilometraje1', 'kilometraje2', 'kilometraje3', 'kilometraje4', 'kilometraje5', 'kilometraje6', 'kilometraje7', 'kilometraje8', 'kilometraje9', 'kilometraje10', 'kilometraje11', 'kilometraje12'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += `) and mp.anoPrKm = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "vehiculo" AND mp.eliminado = 0`;

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ` and mp.anoPrKm = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "vehiculo" AND mp.eliminado = 0`;

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioActualVehiculoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventivavehiculos mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventivavehiculos mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['kilometraje1', 'kilometraje2', 'kilometraje3', 'kilometraje4', 'kilometraje5', 'kilometraje6', 'kilometraje7', 'kilometraje8', 'kilometraje9', 'kilometraje10', 'kilometraje11', 'kilometraje12'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += `) and mp.anoPrKm = year(now()) and e.tipoEquipo = "vehiculo" AND mp.eliminado = 0`;

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ` and mp.anoPrKm = year(now()) and e.tipoEquipo = "vehiculo" AND mp.eliminado = 0`;

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioActualInstitucion = (req, res) => {
    const id = req.query.id;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += ') and mp.anoPr = year(now()) AND mp.eliminado = 0';

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ' and mp.anoPr = year(now()) AND mp.eliminado = 0';

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioActualEquipoInstitucion = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += `) and mp.anoPr = year(now()) and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`;

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ` and mp.anoPr = year(now()) and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`;

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioActualInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;

    if (!id || !criticidad) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += `) and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" AND mp.eliminado = 0`;

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ` and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" AND mp.eliminado = 0`;

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioActualEquipoInstitucionCriticidad = (req, res) => {
    const id = req.query.id;
    const criticidad = req.query.criticidad;
    const tipo = req.query.tipo;

    if (!id || !criticidad || !tipo) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += `) and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`;

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ` and mp.anoPr = year(now()) and e.criticidad = "${criticidad}" and e.tipoEquipo = "${tipo}" AND mp.eliminado = 0`;

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioMesInstitucion = (req, res) => {
    const id = req.query.id;
    const mes = req.query.mes;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    if (!mes || mes > 12 || mes < 1) return res.status(400).send({ error: true, message: 'Error al ingresar el mes.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    urlTotal += ' and (';
    for (let i = 0; i < 12; i++) {
        if (i == 0) urlTotal += meses[i] + ' != ""';
        else urlTotal += ' or ' + meses[i] + ' != ""';
    }
    urlTotal += ') and mp.anoPr = year(now()) AND mp.eliminado = 0';

    for (let i = 0; i < 3; i++) {
        urlNum += ' and (';
        for (let j = 0; j < mes; j++) {
            if (i == 0) {
                if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                else urlNum += ' or ' + meses[j] + ' = "Realizado"';
            }
            if (i == 1) {
                if (j == 0) urlNum += meses[j] + ' != "Programado"';
                else urlNum += ' and ' + meses[j] + ' != "Programado"';
            }
            if (i == 2) {
                if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
            }
        }
        urlNum += ')';
    }
    urlNum += ' and mp.anoPr = year(now()) AND mp.eliminado = 0';

    con.query(urlTotal, (error, resultsm, fields) => {
        if (error) return res.status(400).send(error);
        if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(urlNum, (error, resultsmm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            const promedio = {
                promedio: resultsmm[0].num / resultsm[0].total * 100,
                total: urlTotal,
                num: urlNum
            }
            return res.status(201).send(promedio);
        })
    })
}

const getPreventivasPromedioActualInstitucionEquipo = (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where e.tipoEquipo = "${tipo}" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where e.tipoEquipo = "${tipo}" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    con.query('select month(now()) as month;', (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'No se encontro el mes actual.' });

        urlTotal += ' and (';
        for (let i = 0; i < 12; i++) {
            if (i == 0) urlTotal += meses[i] + ' != ""';
            else urlTotal += ' or ' + meses[i] + ' != ""';
        }
        urlTotal += ') and mp.anoPr = year(now()) AND mp.eliminado = 0';

        for (let i = 0; i < 3; i++) {
            urlNum += ' and (';
            for (let j = 0; j < results[0].month; j++) {
                if (i == 0) {
                    if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                    else urlNum += ' or ' + meses[j] + ' = "Realizado"';
                }
                if (i == 1) {
                    if (j == 0) urlNum += meses[j] + ' != "Programado"';
                    else urlNum += ' and ' + meses[j] + ' != "Programado"';
                }
                if (i == 2) {
                    if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                    else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
                }
            }
            urlNum += ')';
        }
        urlNum += ' and mp.anoPr = year(now()) AND mp.eliminado = 0';

        con.query(urlTotal, (error, resultsm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            con.query(urlNum, (error, resultsmm, fields) => {
                if (error) return res.status(400).send(error);
                if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
                const promedio = {
                    promedio: resultsmm[0].num / resultsm[0].total * 100,
                    total: urlTotal,
                    num: urlNum
                }
                return res.status(201).send(promedio);
            })
        })
    })
}

const getPreventivasPromedioMesInstitucionEquipo = (req, res) => {
    const id = req.query.id;
    const mes = req.query.mes;
    const tipo = req.query.tipo;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    if (!mes || mes > 12 || mes < 1) return res.status(400).send({ error: true, message: 'Error al ingresar el mes.' });

    let urlTotal = `select count(1) as total from mantencionPreventiva mp, institucion i, equipo e where e.tipoEquipo = "${tipo}" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionPreventiva mp, institucion i, equipo e where e.tipoEquipo = "${tipo}" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    urlTotal += ' and (';
    for (let i = 0; i < 12; i++) {
        if (i == 0) urlTotal += meses[i] + ' != ""';
        else urlTotal += ' or ' + meses[i] + ' != ""';
    }
    urlTotal += ') and mp.anoPr = year(now()) AND mp.eliminado = 0';

    for (let i = 0; i < 3; i++) {
        urlNum += ' and (';
        for (let j = 0; j < mes; j++) {
            if (i == 0) {
                if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                else urlNum += ' or ' + meses[j] + ' = "Realizado"';
            }
            if (i == 1) {
                if (j == 0) urlNum += meses[j] + ' != "Programado"';
                else urlNum += ' and ' + meses[j] + ' != "Programado"';
            }
            if (i == 2) {
                if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
            }
        }
        urlNum += ')';
    }
    urlNum += ' and mp.anoPr = year(now()) AND mp.eliminado = 0';

    con.query(urlTotal, (error, resultsm, fields) => {
        if (error) return res.status(400).send(error);
        if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(urlNum, (error, resultsmm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            const promedio = {
                promedio: resultsmm[0].num / resultsm[0].total * 100,
                total: urlTotal,
                num: urlNum
            }
            return res.status(201).send(promedio);
        })
    })
}

const getPreventivasPromedioMesInstitucionVehiculo = (req, res) => {
    const id = req.query.id;
    const mes = req.query.mes;

    if (!id) return res.status(400).send({ error: true, message: 'Id no ingresada.' });
    if (!mes || mes > 12 || mes < 1) return res.status(400).send({ error: true, message: 'Error al ingresar el mes.' });

    let urlTotal = `select count(1) as total from mantencionpreventivavehiculos mp, institucion i, equipo e where e.tipoEquipo = "vehiculo" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    let urlNum = `select count(1) as num from mantencionpreventivavehiculos mp, institucion i, equipo e where e.tipoEquipo = "vehiculo" and i.idInstitucion = ${id} and i.idInstitucion = e.idInstitucion and e.idEquipo = mp.idEquipo`;
    const mese = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const meses = ['kilometraje1', 'kilometraje2', 'kilometraje3', 'kilometraje4', 'kilometraje5', 'kilometraje6', 'kilometraje7', 'kilometraje8', 'kilometraje9', 'kilometraje10', 'kilometraje11', 'kilometraje12'];

    urlTotal += ' and (';
    for (let i = 0; i < 12; i++) {
        if (i == 0) urlTotal += meses[i] + ' != ""';
        else urlTotal += ' or ' + meses[i] + ' != ""';
    }
    urlTotal += ') and mp.anoPrKm = year(now()) AND mp.eliminado = 0';

    for (let i = 0; i < 3; i++) {
        urlNum += ' and (';
        for (let j = 0; j < mes; j++) {
            if (i == 0) {
                if (j == 0) urlNum += meses[j] + ' = "Realizado"';
                else urlNum += ' or ' + meses[j] + ' = "Realizado"';
            }
            if (i == 1) {
                if (j == 0) urlNum += meses[j] + ' != "Programado"';
                else urlNum += ' and ' + meses[j] + ' != "Programado"';
            }
            if (i == 2) {
                if (j == 0) urlNum += meses[j] + ' != "Reprogramado"';
                else urlNum += ' and ' + meses[j] + ' != "Reprogramado"';
            }
        }
        urlNum += ')';
    }
    urlNum += ' and mp.anoPrKm = year(now()) AND mp.eliminado = 0';

    con.query(urlTotal, (error, resultsm, fields) => {
        if (error) return res.status(400).send(error);
        if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
        con.query(urlNum, (error, resultsmm, fields) => {
            if (error) return res.status(400).send(error);
            if (resultsm.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventivas no encontradas.' });
            const promedio = {
                promedio: resultsmm[0].num / resultsm[0].total * 100,
                total: urlTotal,
                num: urlNum
            }
            return res.status(201).send(promedio);
        })
    })
}



const getPreventivaEquipoLast = (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'No encontrada' });
    }
    con.query(`SELECT * FROM mantencionPreventiva WHERE anoPr = (SELECT MAX(anoPr) FROM mantencionpreventiva WHERE idEquipo = ${id}) AND idEquipo =${id} AND eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventiva no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });
}

const getPreventivaVehiculoLast = (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'No encontrada' });
    }
    con.query(`SELECT * FROM mantencionpreventivavehiculos WHERE anoPrKm = (SELECT MAX(anoPrKm) from mantencionpreventivavehiculos
    WHERE idEquipo = ${id}) AND idEquipo =${id} AND eliminado = 0`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.length < 1) return res.status(404).send({ error: true, message: 'Mantenciones preventiva no encontradas.' });
        return res.status(201).send({ error: false, data: results, message: "Lista de mantenciones preventivas" });
    });

}

const updatePreventiva = (req, res) => {
    const id = req.query.id;
    const preventiva = req.body;

    if (!id) {
        return res.status(400).send({ error: true, message: "Id no ingresada" });
    }
    con.query(`UPDATE mantencionPreventiva SET idEquipo = "${preventiva.idEquipo}", anoPr = "${preventiva.anoPr}", enero = "${preventiva.enero}",
    febrero = "${preventiva.febrero}", marzo = "${preventiva.marzo}", abril = "${preventiva.abril}", mayo = "${preventiva.mayo}",
    junio = "${preventiva.junio}", julio = "${preventiva.julio}", agosto = "${preventiva.agosto}", septiembre = "${preventiva.septiembre}",
    octubre = "${preventiva.octubre}", noviembre = "${preventiva.noviembre}", diciembre = "${preventiva.diciembre}"
    WHERE idMantencion = ${id}`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Mantencion preventiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: "Mantencion preventiva actualizada" });
    })
}

const updatePreventivaVehiculo = (req, res) => {
    const id = req.query.id;
    const preventiva = req.body;

    if (!id) {
        return res.status(400).send({ error: true, message: "Id no ingresada" });
    }
    con.query(`UPDATE mantencionpreventivavehiculos SET anoPrKm = "${preventiva.anoPrKm}", kilometraje1 = "${preventiva.kilometraje1}", kilometraje2 = "${preventiva.kilometraje2}", kilometraje3 = "${preventiva.kilometraje3}", kilometraje4 = "${preventiva.kilometraje4}", kilometraje5 = "${preventiva.kilometraje5}", kilometraje6 = "${preventiva.kilometraje6}", kilometraje7 = "${preventiva.kilometraje7}", 
    kilometraje8 = "${preventiva.kilometraje8}", kilometraje9 = "${preventiva.kilometraje9}", kilometraje10 = "${preventiva.kilometraje10}", kilometraje11 = "${preventiva.kilometraje11}", kilometraje12 = "${preventiva.kilometraje12}", idEquipo = ${preventiva.idEquipo}
    WHERE idMantencion = ${id}`, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Mantencion preventiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: "Mantencion preventiva actualizada" });
    })
}


const deletePreventiva = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Id no ingresada" });
    }
    con.query(`UPDATE mantencionPreventiva SET eliminado = 1 Where idMantencion = ?`, id, (error, results, fields) => {
        if (error) return res.status(400).send(error);
        if (results.affectedRows < 1) return res.status(404).send({ error: true, message: 'Mantencion preventiva no encontrada.' });
        return res.status(201).send({ error: false, data: results, message: 'Mantencion preventiva eliminada' });
    })
}
module.exports = {
    createPreventiva,
    createPreventivaVehiculo,
    getPreventiva,
    getPreventivaVehiculo,
    getPreventivas,
    getPreventivasEquipo,
    getPreventivasVehiculo,
    getPreventivasEquipoAno,
    getPreventivasVehiculoAno,
    getPreventivaEquipoLast,
    getPreventivaVehiculoLast,
    getPreventivaEquipoCount,
    getPreventivaVehiculoCount,
    getPreventivaEquipoCountActual,
    getPreventivaVehiculoCountActual,
    getPreventivasTotalInstitucion,
    getPreventivasTotalRealizadaInstitucion,
    getPreventivasPromedioTotalInstituciones,
    getPreventivasPromedioTotalInstitucion,
    getPreventivasPromedioTotalEquipoInstitucion,
    getPreventivasPromedioMesInstitucionVehiculo,
    getPreventivasPromedioTotalInstitucionCriticidad,
    getPreventivasPromedioTotalEquipoInstitucionCriticidad,
    getPreventivasPromedioEquipoInstituciones,
    getPreventivasPromedioActualInstitucion,
    getPreventivasPromedioActualEquipoInstitucion,
    getPreventivasPromedioActualInstitucionCriticidad,
    getPreventivasPromedioActualEquipoInstitucionCriticidad,
    getPreventivasPromedioMesInstitucion,
    getPreventivasPromedioActualInstitucionEquipo,
    getPreventivasPromedioMesInstitucionEquipo,
    getPreventivasPromedioVehiculoInstitucion,
    getPreventivasPromedioVehiculoInstitucionCriticidad,
    getPreventivasPromedioActualVehiculoInstitucionCriticidad,
    getPreventivasPromedioActualVehiculoInstitucion,
    updatePreventiva,
    updatePreventivaVehiculo,
    deletePreventiva,
}