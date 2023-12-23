import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable, { createTheme } from 'react-data-table-component';
import { Box, Button, Grid, InputLabel, FormControl, MenuItem, Paper, Select, TextField,Typography, Avatar, Tooltip, ThemeProvider, ButtonBase, IconButton } from '@mui/material'
import { Stack } from '@mui/material'
import OpenDialog from './OpenDialog'
import OpenDialogVehiculo from './OpenDialogVehiculo';
import OpenDialogIndustrial from './OpenDialogIndustrial';
import ErrorIcon from '@mui/icons-material/Error'
import ErrorOutLineIcon from '@mui/icons-material/ErrorOutline'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const url ="http://localhost:8000/api/getEquiposInstitucion";
const urlCheck = "http://localhost:8000/api/getPreventivaEquipoCountActual"
const urlCheckVehiculo ='http://localhost:8000/api/getPreventivaVehiculoCountActual'
const urlprv = "http://localhost:8000/api/getPreventivaLast"

const theme = createTheme({
  palette:{
    neutral:{
      main:'rgba(0,0,0,0.54)'
    }
  }
})

const opciones = [
  { value:'-'  ,label: '-'},
  { value:'enero'  ,label: 'Enero'},
  { value:'febrero'  ,label: 'Febrero'},
  { value:'marzo'  ,label: 'Marzo'},
  { value:'abril'  ,label: 'Abril'},
  { value:'mayo'  ,label: 'Mayo'},
  { value:'junio'  ,label: 'Junio'},
  { value:'julio'  ,label: 'Julio'},
  { value:'agosto'  ,label: 'Agosto'},
  { value:'septiembre'  ,label: 'Septiembre'},
  { value:'octubre'  ,label: 'Octubre'},
  { value:'noviembre'  ,label: 'Noviembre'},
  { value:'diciembre'  ,label: 'Diciembre'},
];


const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

let equipos = []
export default function ListaPlanificacionEM() {

  const [equipos, setequipos] = useState([])
  const [tipoE, setTipoE] = useState({tipo:'medico'})
  const [ selectedRows, setSelectedRows ] = useState([])
  const [buscar,setBuscar] = useState(null)
  const [query, setQuery] = useState("")
  const [querynombre, setQuerynombre] = useState("")
  const fecha = new Date();
  const anoActual = fecha.getFullYear()
  
  const color = (row)=>{
    if(row.total>0){
      return '#3277d5'
    }else{
      return '#d4d4d4'
    }
  }
  const columnsMedico = [
    { name:'Actualizar MP', cell: (row) => (<Avatar sx={{ width:'22px', height:'22px', bgcolor: color(row)}}><OpenDialog row={row} getequipos={getequipos}/></Avatar>), compact:true, center:true },
    { name: '', cell: (row)=>(critico(row)), width:'10px', compact:true,  right : true},
    { name: 'Servicio Clinico', selector: row=>row.ubicacion, minWidth: '230px', left: true, sortable : true},
    { name: 'Nombre Equipo', selector: row=>row.nombre, minWidth: '250px', compact : true, sortable : true},
    { name: 'Clase', selector: row=>row.clase, minWidth: '150px', compact : true, sortable : true, grow: 1},
    { name: 'Criticidad', cell: row=>row.criticidad, minWidth: '100px', compact : true, sortable : true},
    { name: 'Marca', selector: row=>row.marca, minWidth: '130px', compact : true, sortable : true },
    { name: 'Modelo', selector: row=>row.modelo, minWidth: '160px', compact : true, sortable : true },
    { name: 'Serie', selector: row=>row.serie, minWidth:'130px', compact : true, sortable : true },
    { name: 'Propietario', selector: row=>row.propietario, minWidth: '80px', compact : true, sortable : true },
    { name: 'N° Inventario', selector: row=>row.numeroInventario, minWidth: '100px', center:true, compact : true, sortable : true },
    { name: 'Vida útil', selector: row=>row.vidaUtil, minWidth: '100px',center:true, compact : true, sortable : true },
    { name: 'Vida Residual', selector: (row)=>(<>{(row.ano + row.vidaUtil) - anoActual}</>), compact:true, center:true, sortable : true },
    { name: 'N° resolución', selector: row=>row.idConvenio, minWidth: '150px', center:true, compact : true, sortable : true}
    ]
  
  const columnsIndustrial =[
    { name: 'Actualizar MP', selector: (row) => (<Avatar sx={{ width:'22px', height:'22px', bgcolor: color(row)}}><OpenDialogIndustrial row={row} getequipos={getequipos}/></Avatar>), maxWidth: '10px', center:true, compact : true },
    { name: 'Clase', selector: row=>row.clase, minWidth: '190px', compact : true, sortable : true, grow: 1},
    { name: 'SubClase', selector: row=>row.subclase, minWidth: '130px', compact : true, sortable : true},
    { name: 'Nombre Equipo', selector: row=>row.nombre, minWidth: '230px',  compact : true, sortable : true},
    { name: 'Cantidad', selector: row=>row.cantidad, compact : true, center:true, sortable : true},
    { name: 'Marca', selector: row=>row.marca, minWidth: '250px', compact : true, sortable : true },
    { name: 'Modelo', selector: row=>row.modelo, minWidth: '250px', compact : true, sortable : true },
    { name: 'Estado',selector: row=>row.estado, minWidth: '250px', compact : true, sortable : true },
    { name: 'Serie', selector: row=>row.serie, minWidth: '250px', compact : true, sortable : true },
    { name: 'N° Inventario', selector: row=>row.numeroinventario, minWidth: '250px', compact : true, sortable : true },
    { name: 'Propietario', selector: row=>row.propietario, minWidth: '250px', compact : true, sortable : true },
    { name: 'N° resolución', selector: row=>row.idConvenio, minWidth: '250px', compact : true, sortable : true}
  ]
  
  const columnsVehiculos =[
  { name:'Actualizar MP', selector: (row) => (<Avatar sx={{ width:'22px', height:'22px', bgcolor: color(row)}}><OpenDialogVehiculo row={row} getequipos={filtrado}/></Avatar>), maxWidth: '10px', center:true, compact : true},
  { name: '', cell: (row)=>(critico(row)), width:'10px', compact:true,  right : true},
  { name: 'Sub Ubicación', selector: row=>row.subUbicacion, minWidth: '250px', left : true, sortable : true, grow: 1},
  { name: 'Carroceria', selector: row=>row.carroceria, minWidth: '150px', compact : true, sortable : true, grow: 1},
  { name: 'Tipo de Ambulancia', selector: row=>row.tipoAmbulancia, minWidth: '150px', compact : true, sortable : true, grow: 1},
  { name: 'Clase', selector: row=>row.clase, compact : true, sortable : true},
  { name: 'Criticidad', cell: row=>row.criticidad, minWidth: '100px', compact : true, sortable : true},
  { name: 'Samu', selector: (row)=>(samu(row)), minWidth: '20px', center:true, compact : true, sortable : true },
  { name: 'Función', selector: row=>row.funcion, minWidth: '250px', compact : true, sortable : true },
  { name: 'Marca', selector: row=>row.marca, minWidth: '150px', compact : true, sortable : true },
  { name: 'Modelo', selector: row=>row.modelo, minWidth: '100px', compact : true, sortable : true },
  { name: 'Patente', selector: row=>row.patente, minWidth: '100px', compact : true, sortable : true },
  { name: 'N° motor', selector: row=>row.numeroMotor, minWidth: '155px', compact : true, sortable : true},
  { name: 'Año adquision', selector: row=>row.ano, minWidth: '100px', center:true, compact : true, sortable : true },
  { name: 'Vida Residual', selector: (row)=>(<>{(row.ano + row.vidaUtil) - anoActual}</>), compact:true, center:true, sortable : true },
  { name: 'Kilometraje', selector: row=>row.kilometraje, minWidth: '100px', compact : true, sortable : true },
  { name: 'Propietario', selector: row=>row.propietario, minWidth: '100px', compact : true, sortable : true },
  { name: 'Estado', selector: row=>row.estado, minWidth: '100px', compact : true, sortable : true }
  ]
  /*CUSTOM TABLE*/
  const critico =(row)=>{
    if(!row.criticidad){
      return
    }else{
      if(row.criticidad.toLowerCase() === 'critico'){
        return <Tooltip title='Equipo Crítico' placement='right-end'><ErrorIcon/></Tooltip>
      }
      if(row.criticidad.toLowerCase() === 'relevante'){
        return <Tooltip title='Equipo Relevante' placement='right-end'><ErrorOutLineIcon /></Tooltip>
      }
      if(row.criticidad.toLowerCase() === 'no aplica'){
        return ""
      }
      if(row.criticidad === null){
        return ""
      }
    }
    
  }
  const samu =(row)=>{
    if(!row.samu){
      return "No"
    }else{
      if(row.samu === 0){
        return "No"
      }else{
        return "Si"
      }
    }
  }
  const rowStyles = [
    {
      when: (row)=>((row.ano + row.vidaUtil)-anoActual)<=3,
      style:{
        backgroundColor: 'rgba(255, 99, 71, 0.8)',
        color: 'white',
      '&:hover':{
          cursor: 'pointer'
        }
      },
    },
    {
      when: (row)=>(((row.ano + row.vidaUtil)-anoActual)>3),
      style:{
        backgroundColor: 'rgba(255, 168, 0, 0.7)',
        color: 'grey',
      '&:hover':{
          cursor: 'pointer'
        }
      },
    },
    {
      when: (row)=>(((row.ano + row.vidaUtil)-anoActual)>=5),
      style:{
        backgroundColor: 'rgba(60, 179, 118, 0.7)',
        color: 'white',
      '&:hover':{
          cursor: 'pointer'
        }
      },
    },
  ]

    //Obtener Equipos
    const getequipos = async () =>{
      const res = await axios.get(url + `?id=${cookies.get("idInstitucion")}`)
      const response = res.data.data
      let auxCheck
      try {
        const resc = await axios.get(urlCheck)
      auxCheck = resc.data.data
      } catch (err) {
        console.log(err)
      }
      let auxCheckV
      try {
        const rescVehiculo = await axios.get(urlCheckVehiculo)
        auxCheckV = rescVehiculo.data.data
      } catch (err) {
        console.log(err)
      }
      let auxE=[]
      response.map(equipo=>{
        let aux = equipo
        if(equipo.tipoEquipo !== 'vehiculo'){
          if(auxCheck)
          auxCheck.map(check=>{
            if(equipo.idEquipo === check.idEquipo) aux = {...aux, total: check.total}
          })
        } else {
          if(auxCheckV)
          auxCheckV.map(check=>{
            if(equipo.idEquipo === check.idEquipo) aux = {...aux, total: check.total}
          })
        }
        auxE.push(aux)
      })
      setequipos(auxE)
    }
    useEffect(()=>{
      getequipos()
    }, [])
    const handleChangeSelect = (e) =>{
      getequipos();
      setTipoE({
        ...tipoE,
        [e.target.name]: e.target.value
      })
    }
    const columnSelect = () =>{
      if(tipoE.tipo === 'medico') return columnsMedico
      if(tipoE.tipo === 'industrial') return columnsIndustrial
      if(tipoE.tipo === 'vehiculo') return columnsVehiculos
      return null
    }

    const busqueda = (nombre, buscar) =>{
      if(buscar){
        return nombre.nombre.toLowerCase().includes(buscar.toLowerCase())
      }else return nombre;
    } 

    const busquedaTipo = (tipo, buscar) =>{
      if(buscar){
        return tipo.tipoEquipo.toLowerCase().includes(buscar.toLowerCase())
      }else return tipo;
    }

    const filtrado = (equipos, buscar)=>{
      const aux = equipos.filter(equipos => busqueda(equipos, buscar))
      return aux.filter(aux => busquedaTipo(aux, tipoE.tipo))
    }

    function search(data){
      return data.filter(
        (item)=>  
        item.clase.toLowerCase().includes(query) || 
        item.ubicacion.toLowerCase().includes(query)
      )
    }

    const handleChangeRows = (state) => {
        setSelectedRows(state.selectedRows)
    }

      
    const titulo = () =>{
      return(        
        <FormControl size='small' sx={{m:1}} style={{minWidth: 140}}>
          <InputLabel id='tipoE'>Tipo</InputLabel>
          <Select
            labelId='tipoE'
            id='tipoE'
            label="Tipo"
            onChange={handleChangeSelect}
            name='tipo'
            value={tipoE.tipo}
          >
            <MenuItem value={'medico'}>Medico</MenuItem>
            <MenuItem value={'industrial'}>Industrial</MenuItem>
            <MenuItem value={'vehiculo'}>Ambulancia</MenuItem>
          </Select>
        </FormControl>
      )
    }

  return (
    <Box>
      <Box sx={{my:1}}>
      <Paper variant='outlined'>
      <Typography variant='h4' sx={{ml:1, mt:1}}>
        Busqueda
      </Typography>
        <Stack 
          direction="row"
          spacing={2}
          sx = {{marginY:2, marginX:1}}
        >
          <TextField
            id = "servClinico"
            type = "text"
            label = "Servicio Clinico"
            variant='outlined'
            size = 'small'
            fullWidth
            onChange = {(e)=>setQuery(e.target.value)}
          />
          <TextField
            id = "clase"
            type = "text"
            label = "Clase"
            variant='outlined'
            size = 'small'
            fullWidth
            onChange = {(e)=>setQuery(e.target.value)}
          />
          <TextField
            id = "marca"
            type = "text"
            label = "Marca"
            variant='outlined'
            size = 'small'
            fullWidth
            onChange = {(e)=>setQuery(e.target.value)}
          />
          <TextField
            id = "serie"
            type = "text"
            label = "Serie"
            variant='outlined'
            size = 'small'
            fullWidth
            onChange = {(e)=>setQuery(e.target.value)}
          />
          </Stack>
        <Stack
            direction="row"
            spacing={2}
            sx = {{marginY:2, marginX:1}}
          >
            <TextField
              id = "modelo"
              type = "text"
              label = "Modelo"
              variant='outlined'
              size = 'small'
              fullWidth
              onChange = {(e)=>setQuery(e.target.value)}
            />
            <TextField
              id = "nombre"
              type = "text"
              label = "Nombre"
              variant='outlined'
              size = 'small'
              fullWidth
              onChange = {(e)=>setQuerynombre(e.target.value)}
            />
            <Grid>
            <FormControl size='small' style={{minWidth: 180}}>
            <InputLabel >Filtrar MP por mes</InputLabel> 
       
              <Select
                  id='Mes'
                  name='mes'
                  type='text'
                  fullWidth
                  label = 'Filtrar por mes'
                  >  
                  {opciones.map(opcion => (  
                    <MenuItem key={opcion.value} value={opcion.value} >
                      {opcion.label}
                    </MenuItem>
                    ))}                
                </Select>    
              </FormControl>
              </Grid>
          </Stack>
      </Paper>
    </Box>

    <Paper >
        <DataTable
        columns={columnSelect()}
        data = {filtrado(search(equipos, buscar))}
        direction = "auto"
        title={titulo()}
        pagination
        fixedHeader
        responsive
        dense
        highlightOnHover
        conditionalRowStyles={rowStyles}
        onSelectedRowsChange={handleChangeRows}
        noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
        paginationComponentOptions = {paginationComponentOptions}
        />
    </Paper>
    </Box>
  )
}

