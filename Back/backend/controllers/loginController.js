const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PW,
    database: "practica"
})

const getLogin = (req, res) =>{
    const rut= req.query.rut;
    const clave = req.query.clave
    const usuario = req.body
    
    if(!usuario){
        return res.status(400).send({error:true, message:"Datos no ingresados"})
    }
    con.query(`SELECT * FROM usuario WHERE rut = "${usuario.rut}" AND clave=${usuario.clave}`, (error,results, fields)=>{
        if(error) return res.status(400).send(error);
        if(results.lenght<1) return res.status(404).send({error: true, message:'no encontrado'});
        return res.status(201).send({error: false, data: results, message:"exito"})
    }) 
}

module.exports = {
    getLogin,
}