import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import React from 'react'
import DataTable from 'react-data-table-component'

const urlEquipos = 'http://localhost:8000/api/getEquiposConvenio'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

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

export default function ConvenioEquipoAdmin({id, setOpen}) {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ equipos, setEquipos ] = React.useState()
  const [ columns, setColumns ] = React.useState(columnsMedico)
  const [ tipo, setTipo ] = React.useState('medico')

  const getEquipos = async () => {
    try {
      const res = await axios.get(urlEquipos + `?id=${id}`)
      setEquipos(res.data.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleChangeSelect = (e) => {
    e.preventDefault()
    setTipo(e.target.value)
    if(e.target.value == 'medico') setColumns(columnsMedico)
    if(e.target.value == 'industrial') setColumns(columnsIndustrial)
    if(e.target.value == 'vehiculo') setColumns(columnsAmbulancia)
  }

  React.useEffect(() => {
    getEquipos()
  }, [])

  const [ buscar, setBuscar ] = React.useState(null)

  const busqueda = (equipo, buscar) =>{
    if(buscar){
      if(equipo.tipoEquipo == 'medico' || equipo.tipoEquipo == 'industrial') return equipo.nombre.toLowerCase().includes(buscar.toLowerCase())
      if(equipo.tipoEquipo == 'vehiculo') return equipo.patente.toLowerCase().includes(buscar.toLowerCase())
    } else return equipo;
  }

  const busquedaTipo = (tipo, buscar) =>{
    if(buscar){
      return tipo.tipoEquipo.toLowerCase().includes(buscar.toLowerCase())
    } else return tipo;
  }

  const filtrado = (equipos, buscar)=>{
    const aux = equipos.filter(equipos => busquedaTipo(equipos, tipo))
    return aux.filter(aux => busqueda(aux, buscar))
  }

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Box sx={{ m: 1 }}>
      <TextField
        size='small'
        placeholder={tipo != 'vehiculo' ? "Buscar por Nombre" : "Buscar por Patente"}
        onChange = {(e) => setBuscar(e.target.value)}
        sx={{ m: 1 }}
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
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
          labelId="tipo"
          id="tipo"
          value={tipo}
          label="Tipo"
          onChange={handleChangeSelect}
          name='tipo'
        >
          <MenuItem value={'medico'}>Medico</MenuItem>
          <MenuItem value={'industrial'}>Industrial</MenuItem>
          <MenuItem value={'vehiculo'}>Ambulancia</MenuItem>
        </Select>
      </FormControl>
      <DataTable
        columns={columns}
        data={filtrado(equipos, buscar)}
        direction = "auto"
        pagination
        fixedHeader
        responsive
        dense
        noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
        paginationComponentOptions = {paginationComponentOptions}
      />
      <Stack direction={'row-reverse'}>
        <Button variant='contained' onClick={() => setOpen(false)}>Cerrar</Button>
      </Stack>
    </Box>
  )
}
