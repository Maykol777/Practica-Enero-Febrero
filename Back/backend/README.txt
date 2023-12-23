DATABASE TABLES

CREATE TABLE institucion(
    idInstitucion int NOT NULL AUTO_INCREMENT,
    nombre varchar(100),
    ciudad varchar(100),
    region varchar(100),
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idInstitucion)
);

CREATE TABLE usuario(
    rut varchar(13) NOT NULL,
    nombre varchar(100),
    clave varchar(100),
    cargo varchar(100),
    idInstitucion int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (rut),
    FOREIGN KEY (idInstitucion) REFERENCES institucion(idInstitucion)
);

CREATE TABLE convenio(
    idConvenio int NOT NULL AUTO_INCREMENT,
    nombre varchar(100),
    idOrdenCompra varchar(100),
    proveedor varchar(100),
    numeroEquipos int,
    resolucion date,
    vigencia date,
    costo float,
    subasignacion varchar(50),
    idInstitucion int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idConvenio),
    FOREIGN KEY (idInstitucion) REFERENCES institucion(idInstitucion)
);

CREATE TABLE seguimiento(
    idSeguimiento int NOT NULL AUTO_INCREMENT,
    ano int,
    mes varchar(20),
    monto int,
    ordenCompra varchar(50),
    idConvenio int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idSeguimiento),
    FOREIGN KEY (idConvenio) REFERENCES convenio(idConvenio)
);

CREATE TABLE equipo(
    idEquipo int NOT NULL AUTO_INCREMENT,
    tipoEquipo varchar(20),
    ubicacion varchar(100),
    subUbicacion varchar(100),
    clase varchar(100),
    subclase varchar(100),
    nombre varchar(100),
    marca varchar(100),
    modelo varchar(100),
    serie varchar(100),
    numeroInventario varchar(100),
    valor float,
    ano int,
    vidaUtil int,
    propietario varchar(100),
    estado varchar(20),
    criticidad varchar(20),
    garantia boolean,
    vencimientoGarantia int,
    planMantencion boolean,
    normativa varchar(30),
    cantidad int,
    carroceria varchar(50),
    tipoAmbulancia varchar(100),
    samu boolean,
    funcion varchar(100),
    patente varchar(10),
    numeroMotor varchar(100),
    kilometraje int,
    idInstitucion int,
    idConvenio int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idEquipo),
    FOREIGN KEY (idInstitucion) REFERENCES institucion(idInstitucion)
);

CREATE TABLE mantencionPreventiva(
    idMantencion int NOT NULL AUTO_INCREMENT,
    anoPr int,
    enero varchar(30),
    febrero varchar(30),
    marzo varchar(30),
    abril varchar(30),
    mayo varchar(30),
    junio varchar(30),
    julio varchar(30),
    agosto varchar(30),
    septiembre varchar(30),
    octubre varchar(30),
    noviembre varchar(30),
    diciembre varchar(30),
    idEquipo int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idMantencion),
    FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
);

CREATE TABLE mantencionPreventivaVehiculos(
    idMantencion int NOT NULL AUTO_INCREMENT,
    anoPrKm int,
    kilometraje1 varchar(20),
    kilometraje2 varchar(20),
    kilometraje3 varchar(20),
    kilometraje4 varchar(20),
    kilometraje5 varchar(20),
    kilometraje6 varchar(20),
    kilometraje7 varchar(20),
    kilometraje8 varchar(20),
    kilometraje9 varchar(20),
    kilometraje10 varchar(20),
    kilometraje11 varchar(20),
    kilometraje12 varchar(20),
    idEquipo int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idMantencion),
    FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
);

CREATE TABLE mantencionCorrectiva(
    idMantencion int NOT NULL AUTO_INCREMENT,
    fecha date,
    descripcion varchar(250),
    costo int,
    idEquipo int,
    eliminado boolean DEFAULT 0,
    PRIMARY KEY (idMantencion),
    FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
);

