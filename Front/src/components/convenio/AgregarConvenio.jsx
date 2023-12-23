import { Box, Button, Card, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const urlGet = `http://localhost:8000/api/getEquiposInstitucion?id=${cookies.get("idInstitucion")}`
const urlAdd = 'http://localhost:8000/api/createConvenio'
const urlPut = 'http://localhost:8000/api/updateEquipoConvenio'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const selectProps = { indeterminate: isIndeterminate => isIndeterminate }

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
]

let equipos = []

export default function AgregarConvenio() {
    const [ data, setData ] = useState([])

    const getEquipos = async () => {
        const res = await axios.get(urlGet)
        setData(res.data.data)
        equipos = res.data.data
    }

    useEffect(() => {
        getEquipos()
    }, [])

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

    const [ tipoE, setTipoE ] = useState({ tipo: 'medico' })

    const handleChangeSelect = (e) => {
        setTipoE({
            ...tipoE,
            [ e.target.name ]: e.target.value
        })
    }

    const columnSelect = () => {
        if(tipoE.tipo === 'medico') return columnsMedico
        if(tipoE.tipo === 'industrial') return columnsIndustrial
        if(tipoE.tipo === 'vehiculo') return columnsAmbulancia
        return null
    }

    const navigate = useNavigate()

    const refreshPage = () => {
        navigate(0)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(values)
            const responseConvenio = await axios.post(urlAdd, values)
            console.log(responseConvenio)
            const responseEquipos = await axios.put(urlPut + `?id=${responseConvenio.data.data.insertId}`, selectedRows)
            console.log(responseEquipos)
            refreshPage()
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
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

    const [ selectedRows, setSelectedRows ] = useState([])

    const handleChangeRows = (state) => {
        setSelectedRows(state.selectedRows)
    }

    const titulo = () => {
        return(
            <Stack direction={'row'}>
                <TextField
                    size='small'
                    placeholder={"Buscar por Nombre"}
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
                    <Typography variant='h6' sx={{ mt: 1, ml: 1 }}>Ingresar Convenio</Typography>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='nombre' label='Nombre' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='idOrdenCompra' label='Id/Orden de Compra' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='proveedor' label='Proveedor' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='resolucion' variant='outlined' size='small' type='date' label='Resolucion' InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange}/>
                        <TextField id='vigencia' variant='outlined' size='small' type='date' label='Vigencia' InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange}/>
                        <TextField id='costo' label='Costo' variant='outlined' size='small' type='number' fullWidth onChange={handleChange}/>
                        <TextField id='subasignacion' label='Subasignacion' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row-reverse'} justifyContent='flex-start' margin={1}>
                        <Button variant='contained' size='large' type='submit' sx={{ my: 1 }} onClick={onSubmit} startIcon={<AddCircleOutlineIcon/>}>Agregar</Button>
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
                    responsive
                    selectableRows
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={selectProps}
                    onSelectedRowsChange={handleChangeRows}
                    dense
                    noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
                    paginationComponentOptions = {paginationComponentOptions}
                />
            </Card>
        </div>
    )
}
