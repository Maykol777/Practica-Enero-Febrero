const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());
app.options("*", cors());

const usuarioRoutes = require('./routes/usuarioRoutes');
const institucionRoutes = require('./routes/institucionRoutes');
const convenioRoutes = require('./routes/convenioRoutes');
const mantencionCorrectivaRoutes = require("./routes/mantencionCorrectivaRoutes");
const equipoRoutes = require('./routes/equipoRoutes');
const manPreventiva = require('./routes/ManPrevetivoRoutes')
const login = require('./routes/loginRoutes')

app.use("/api", usuarioRoutes);
app.use("/api", institucionRoutes);
app.use("/api", convenioRoutes);
app.use("/api", mantencionCorrectivaRoutes);
app.use("/api", equipoRoutes);
app.use("/api", manPreventiva);
app.use("/api", login);

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PW,
    database: "practica"
})

con.connect((err) => {
    if(err) throw err;
    console.log("Connected to database");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})