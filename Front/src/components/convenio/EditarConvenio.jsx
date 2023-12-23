import { Box, Button, Card, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import  SaveIcon  from '@mui/icons-material/Save'
import DataTable from 'react-data-table-component'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment';

const urlGetEquiposConvenio = 'http://localhost:8000/api/getEquiposConvenio'
const urlPutConvenio = 'http://localhost:8000/api/updateConvenio'
const urlDeleteEquipo = 'http://localhost:8000/api/updateEquipoConvenioDelete'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function EditarConvenio() {

    const columnsMedico = [
        { name: 'Servicio Clinico', selector: row=>row.ubicacion, sortable : true, grow: 1 },
        { name: 'Recinto', selector: row=>row.subUbicacion, sortable : true, grow: 1 },
        { name: 'Clase', selector: row=>row.clase, sortable : true },
        { name: 'Subclase', selector: row=>row.subclase, sortable : true, grow: 1 },
        { name: 'Nombre', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Marca', selector: row=>row.marca, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, sortable : true, grow: 2 },
        { name: 'Serie', selector: row=>row.serie, sortable : true, grow: 2 },
        { name: 'N° Inventario', selector: row=>row.numeroInventario, sortable : true },
        { name: 'Adquisición', selector: row=>row.ano, sortable : true },
        { name: 'Vida útil', selector: row=>row.vidaUtil, sortable : true },
        { name: 'Propietario', selector: row=>row.propietario, sortable : true },
        { name: 'Estado', selector: row=>row.estado, sortable : true },
        { name: 'Criticidad', selector: row=>row.criticidad, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', sortable : true },
        { name: 'Año de vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true },
        { name: 'Quitar', width: '50px', button: true, cell: (row) => <IconButton size='small' color='secondary' onClick={(e) => handleDelete(e, row)}><ClearIcon/></IconButton> },
    ]

    const columnsIndustrial = [
        { name: 'Nombre recinto', selector: row=>row.ubicacion, sortable : true, grow: 1 },
        { name: 'Ubicacion', selector: row=>row.subUbicacion, sortable : true, grow: 1 },
        { name: 'Clase', selector: row=>row.clase, sortable : true },
        { name: 'SubClase', selector: row=>row.subclase, sortable : true },
        { name: 'Nombre', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Marca', selector: row=>row.marca, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, sortable : true },
        { name: 'Cantidad', selector: row=>row.cantidad, sortable : true },
        { name: 'Estado', selector: row=>row.estado, sortable : true },
        { name: 'Normativa', selector: row=>row.normativa, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', sortable : true },
        { name: 'Año de vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true },
        { name: 'Quitar', width: '50px', button: true, cell: (row) => <IconButton size='small' color='secondary' onClick={(e) => handleDelete(e, row)}><ClearIcon/></IconButton> },
    ]

    const columnsAmbulancia = [
        { name: 'Region', selector: row=>row.ubicacion, sortable : true, grow: 1},
        { name: 'Establecimiento', selector: row=>row.subUbicacion, sortable : true, grow: 2},
        { name: 'Tipo de Carroceria', selector: row=>row.carroceria, sortable : true },
        { name: 'Tipo de Ambulancia', selector: row=>row.tipoAmbulancia, sortable : true },
        { name: 'Clase Ambulancia', selector: row=>row.clase, sortable : true},
        { name: 'Samu', selector: row=>row.samu, format: row=>row.samu ? 'SI': 'NO', sortable : true },
        { name: 'Funcion', selector: row=>row.funcion, sortable : true },
        { name: 'Marca', selector: row=>row.marca, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, sortable : true },
        { name: 'Patente', selector: row=>row.patente, sortable : true },
        { name: 'N° Motor', selector: row=>row.numeroMotor, sortable : true },
        { name: 'Año de Adquisicion', selector: row=>row.ano, sortable : true },
        { name: 'Vida útil', selector: row=>row.vidaUtil, sortable : true },
        { name: 'Kilometraje', selector: row=>row.kilometraje, format: row=> Intl.NumberFormat().format(row.kilometraje), sortable : true },
        { name: 'Estado Situacion', selector: row=>row.propietario, sortable : true },
        { name: 'Estado de Conservacion', selector: row=>row.estado, sortable : true },
        { name: 'Criticidad', selector: row=>row.criticidad, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', sortable : true },
        { name: 'Año de vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true },
        { name: 'Quitar', width: '50px', button: true, cell: (row) => <IconButton size='small' color='secondary' onClick={(e) => handleDelete(e, row)}><ClearIcon/></IconButton> },
    ]


    const navigate = useNavigate()

    const comeBack = () => {
        navigate(-1)
    }

    const addEquipoConvenioRouter = () => {
        navigate('equipo', { state: location.state.idConvenio })
    }

    const [ values, setValues ] = useState({
        idInstitucion: 1,
        nombre: "",
        idOrdenCompra: "",
        numeroEquipos: 0,
        proveedor: "",
        resolucion: "",
        vigencia: "",
        costo: 0,
        subasignacion: ""
    })

    const [ equipos, setEquipos ] = useState([])

    const location = useLocation()

    const getEquiposConvenio = async () => {
        const res = await axios.get(urlGetEquiposConvenio + `?id=${location.state.idConvenio}`)
        setEquipos(res.data.data)
    }

    useEffect(() => {
        getEquiposConvenio()
        setValues(location.state)
    }, [])

    const [ tipoE, setTipoE ] = useState({ tipo: 'medico' })

    const handleChangeSelect = (e) => {
        setTipoE({
            ...tipoE,
            [ e.target.name ]: e.target.value
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        console.log('agregar equipo')
        try {
            addEquipoConvenioRouter()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (e, row) => {
        e.preventDefault()
        console.log('eliminar ' + row.idEquipo)
        console.log(row)
        try {
            if(window.confirm('Estas seguro que deseas quitar este equipo del convenio?')) {
                const response = await axios.put(urlDeleteEquipo + `?id=${location.state.idConvenio}`, row)
                console.log(response)
                getEquiposConvenio()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const columnSelect = () => {
        if(tipoE.tipo === 'medico') return columnsMedico
        if(tipoE.tipo === 'industrial') return columnsIndustrial
        if(tipoE.tipo === 'vehiculo') return columnsAmbulancia
        return null
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const aux = {
            idInstitucion: values.idInstitucion,
            idOrdenCompra: values.idOrdenCompra,
            nombre: values.nombre,
            proveedor: values.proveedor,
            resolucion: moment(values.resolucion).format('yyyy-MM-DD'),
            vigencia: moment(values.vigencia).format('yyyy-MM-DD'),
            costo: values.costo,
            subasignacion: values.subasignacion,
            numeroEquipos: values.numeroEquipos
        }
        try {
            const responseEquipos = await axios.put(urlPutConvenio + `?id=${location.state.idConvenio}`, aux)
            console.log(responseEquipos)
            comeBack()
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
        console.log(values)
    }

    const [buscar,setBuscar] = useState(null)

    const busqueda = (nombre, buscar) =>{
        if(buscar){
            if(nombre.tipoEquipo == 'medico' || nombre.tipoEquipo == 'industrial') return nombre.nombre.toLowerCase().includes(buscar.toLowerCase())
            if(nombre.tipoEquipo == 'vehiculo') return nombre.patente.toLowerCase().includes(buscar.toLowerCase())
        }else return nombre;
    }

    const busquedaTipo = (tipo, buscar) =>{
        if(buscar){
            return tipo.tipoEquipo.toLowerCase().includes(buscar.toLowerCase())
        }else return tipo;
    }

    const filtrado = (equipos, buscar)=>{
        const aux = equipos.filter(equipos => busquedaTipo(equipos, tipoE.tipo))
        return aux.filter(aux => busqueda(aux, buscar))
    }

    const actions = (
        <Button variant='contained' color='primary' onClick={handleAdd} startIcon={<AddCircleOutlineIcon/>}>
            Agregar
        </Button>
    )

    const titulo = () => {
        return(
            <Stack direction={'row'}>
                <TextField
                    size='small'
                    placeholder={tipoE.tipo != 'vehiculo' ? "Buscar por Nombre" : "Buscar por Patente"}
                    onChange = {(e) => setBuscar(e.target.value)}
                    sx={{m:1}}
                    InputProps={{
                        endAdornment:(
                        <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>
                        )
                    }}
                >
                </TextField>
                <FormControl size='small' sx={{ m: 1 }}>
                    <InputLabel id="tipoE">Tipo</InputLabel>
                    <Select
                        labelId="tipoE"
                        id="tipoE"
                        value={tipoE.tipo}
                        label="Tipo"
                        onChange={handleChangeSelect}
                        name='tipo'
                    >
                        <MenuItem value={'medico'}>Medico</MenuItem>
                        <MenuItem value={'industrial'}>Industrial</MenuItem>
                        <MenuItem value={'vehiculo'}>Ambulancia</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        )
    }

    return (
        <div>
            <Card variant='outlined' sx={{ m: 1 }}>
                <Box component={'form'} my={1}>
                    <Typography variant='h6' sx={{ mt: 1, ml: 1 }}>Editar Convenio</Typography>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='nombre' defaultValue={location.state.nombre} label='Nombre' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='idOrdenCompra' defaultValue={location.state.idOrdenCompra} label='Id/Orden de compra' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='proveedor' label='Proveedor' defaultValue={location.state.proveedor} variant='outlined' size='small' fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='resolucion' defaultValue={moment(location.state.resolucion).format('yyyy-MM-DD')} label='Resolucion' InputLabelProps={{ shrink: true }} variant='outlined' size='small' type='date' fullWidth onChange={handleChange}/>
                        <TextField id='vigencia' defaultValue={moment(location.state.vigencia).format('yyyy-MM-DD')} label='Vigencia' InputLabelProps={{ shrink: true }} variant='outlined' size='small' type='date' fullWidth onChange={handleChange}/>
                        <TextField id='costo' label='Costo' defaultValue={location.state.costo} variant='outlined' size='small' type='number' fullWidth onChange={handleChange}/>
                        <TextField id='subasignacion' label='Subasignacion' defaultValue={location.state.subasignacion} variant='outlined' size='small' fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row-reverse'} margin={1} spacing={1}>
                        <Button variant='contained' color='error' size='large' onClick={() => navigate(-1)}>Volver</Button>
                        <Button variant='contained' size='large' type='submit' color='primary' onClick={onSubmit} startIcon={<SaveIcon/>}>Guardar</Button>
                    </Stack>
                </Box>
            </Card>
            <Card variant='outlined' sx={{ m: 1 }}>
                <DataTable
                    columns={columnSelect()}
                    data = {filtrado(equipos,buscar)}
                    direction = "auto"
                    title = {titulo()}
                    pagination
                    fixedHeader
                    actions={actions}
                    responsive
                    dense
                    noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
                    paginationComponentOptions = {paginationComponentOptions}
                />
            </Card>
        </div>
    )
}
