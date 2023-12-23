import { Box, createTheme, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Add } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import AgregarMantencionCorrectiva from './AgregarMantencionCorrectiva';
import VerMantencionCorrectiva from './VerMantencionCorrectiva';

const cookies = new Cookies()

const urlEquipos = `http://localhost:8000/api/getEquiposInstitucion?id=${cookies.get("idInstitucion")}`
const urlVerificador = `http://localhost:8000/api/getMantencionCorrectivasEquiposInstitucionCount?id=${cookies.get("idInstitucion")}`

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const theme = createTheme({
  palette: {
    neutral: {
      main: 'rgba(0, 0, 0, 0.54)'
    }
  }
})

export default function ListaMantencionCorrectiva() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ open, setOpen ] = useState(false)
  const [ openView, setOpenView ] = useState(false)

  const columnsMedico = [
    { name: 'Ver', width: '40px', button: true, cell: (row) => <ThemeProvider theme={theme}><IconButton size='small' color={row.total > 0 ? 'primary' :'neutral'} onClick={(e) => handleMoreInfo(e, row)}><InfoIcon/></IconButton></ThemeProvider> },
    { name: 'Agregar', width: '45px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleAdd(e, row)}><Add/></IconButton> },
    { name: 'Servicio Clinico', selector: row=>row.ubicacion, sortable : true, grow: 2 },
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
    { name: 'Ver', width: '40px', button: true, cell: (row) => <ThemeProvider theme={theme}><IconButton size='small' color={row.total > 0 ? 'primary' :'neutral'} onClick={(e) => handleMoreInfo(e, row)}><InfoIcon/></IconButton></ThemeProvider> },
    { name: 'Agregar', width: '45px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleAdd(e, row)}><Add/></IconButton> },
    { name: 'Nombre recinto', selector: row=>row.ubicacion, sortable : true, grow: 2 },
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
    { name: 'Ver', width: '40px', button: true, cell: (row) => <ThemeProvider theme={theme}><IconButton size='small' color={row.total > 0 ? 'primary' :'neutral'} onClick={(e) => handleMoreInfo(e, row)}><InfoIcon/></IconButton></ThemeProvider> },
    { name: 'Agregar', width: '45px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleAdd(e, row)}><Add/></IconButton> },
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

  const [ equipos, setEquipos ] = useState([])
  const [ idAux, setIdAux ] = useState(null)

  const getEquipos = async () => {
    let auxEquipos
    try {
      const res = await axios.get(urlEquipos)
      auxEquipos= res.data.data
    } catch (err) {
      console.log(err)
    }
    try {
      const resc = await axios.get(urlVerificador)
      const auxCheck = resc.data.data
      let auxE = []
      auxEquipos.map(equipo => {
        let aux = equipo
        auxCheck.map(check => {
          if(equipo.idEquipo === check.idEquipo) {
            if(check.total) aux = {...aux, total: check.total}
            else aux = {...aux, total: 0}
          }
        })
        auxE.push(aux)
      })
      setEquipos(auxE)
    } catch (err) {
      console.log(err)
      setEquipos(auxEquipos)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getEquipos()
  }, [])

  const [ tipoE, setTipoE ] = useState({ tipo: 'medico' })

  const handleChangeSelect = (e) => {
    setTipoE({
      ...tipoE,
      [ e.target.name ]: e.target.value
    })
  }

  const handleMoreInfo = async (e, row) => {
    e.preventDefault()
    setIdAux(row.idEquipo)
    setOpenView(true)
  }

  const handleAdd = async (e, row) => {
    e.preventDefault()
    setIdAux(row.idEquipo)
    setOpen(true)
  }

  const handleClose = () => {
    setIdAux(null)
    setOpen(false)
  }

  const handleCloseView = () => {
    setIdAux(null)
    setOpenView(false)
  }

  const columnSelect = () => {
    if(tipoE.tipo === 'medico') return columnsMedico
    if(tipoE.tipo === 'industrial') return columnsIndustrial
    if(tipoE.tipo === 'vehiculo') return columnsAmbulancia
    return null
  }

  const [buscar,setBuscar] = useState(null)

  const busqueda = (nombre, buscar) =>{
    if(buscar){
      if(nombre.tipoEquipo === 'medico' || nombre.tipoEquipo === 'industrial') return nombre.nombre.toLowerCase().includes(buscar.toLowerCase())
      if(nombre.tipoEquipo === 'vehiculo') return nombre.patente.toLowerCase().includes(buscar.toLowerCase())
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

  const titulo = () => {
    return(
      <Stack direction={'row'}>
        <TextField
          size='small'
          placeholder={tipoE.tipo !== 'vehiculo' ? "Buscar por Nombre" : "Buscar por Patente"}
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
            <MenuItem value={'vehiculo'}>Vehiculo</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    )
  }

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <div>
      <Box variant='outlined' sx={{ m: 1 }}>
        <DataTable
          columns={columnSelect()}
          data = {filtrado(equipos,buscar)}
          direction = "auto"
          title = {titulo()}
          pagination
          fixedHeader
          responsive
          dense
          noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
          paginationComponentOptions = {paginationComponentOptions}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <AgregarMantencionCorrectiva setOpen={setOpen} id={idAux} getEquipos={getEquipos}/>
      </Dialog>
      <Dialog maxWidth='md' open={openView} onClose={handleCloseView}>
        <VerMantencionCorrectiva setOpenView={setOpenView} id={idAux} getEquipos={getEquipos}/>
      </Dialog>
    </div>
  )
}
