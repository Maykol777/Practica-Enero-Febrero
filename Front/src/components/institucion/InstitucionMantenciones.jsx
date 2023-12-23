import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import React from 'react'
import DataTable from 'react-data-table-component'

const urlMP = 'http://localhost:8000/api/getPreventivasEquipo'
const urlMC = 'http://localhost:8000/api/getMantencionCorrectivasEquipo'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

const columnsMP = [
  { name: 'Archivo', width: '80px', button: true, cell: (row) => <IconButton size='small' color='primary'><FilePresentIcon/></IconButton> },
  { name: 'Año', selector: row=>row.ano, width: '70px', sortable : true, grow: 1},
  { name: 'Enero', selector: row=>row.enero, sortable : true, grow: 1},
  { name: 'Febrero', selector: row=>row.febrero, sortable : true, grow: 1},
  { name: 'Marzo', selector: row=>row.marzo, sortable : true, grow: 1},
  { name: 'Abril', selector: row=>row.abril, sortable : true, grow: 1},
  { name: 'Mayo', selector: row=>row.mayo, sortable : true, grow: 1},
  { name: 'Junio', selector: row=>row.junio, sortable : true, grow: 1},
  { name: 'Julio', selector: row=>row.julio, sortable : true, grow: 1},
  { name: 'Agosto', selector: row=>row.agosto, sortable : true, grow: 1},
  { name: 'Septiembre', selector: row=>row.septiembre, width: '120px', sortable : true, grow: 1},
  { name: 'Octubre', selector: row=>row.octubre, sortable : true, grow: 1},
  { name: 'Noviembre', selector: row=>row.noviembre, sortable : true, width: '120px', grow: 1},
  { name: 'Diciembre', selector: row=>row.diciembre, sortable : true, width: '120px', grow: 1},
]

const columnsMC = [
  { name: 'Archivo', width: '80px', button: true, cell: (row) => <IconButton size='small' color='primary'><FilePresentIcon/></IconButton> },
  { name: 'Fecha', selector: row=>row.fecha, format: row=> moment(row.fecha).format('DD/MM/YYYY'),sortable : true, grow: 1},
  { name: 'Descripcion', selector: row=>row.descripcion, sortable : true, grow: 3},
  { name: 'Costo', selector: row=>row.costo, format: row=> Intl.NumberFormat().format(row.costo), sortable : true, grow: 1},
]

export default function InstitucionMantenciones({id, setOpen}) {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ tipo, setTipo ] = React.useState(0)
  const [ mp, setMP ] = React.useState()
  const [ mc, setMC ] = React.useState()
  const [ columns, setColumns ] = React.useState(columnsMP)
  const [ data, setData ] = React.useState()

  const getInfo = async () => {
    try {
      const resmp = await axios.get(urlMP + `?id=${id}`)
      setMP(resmp.data.data)
      setData(resmp.data.data)
    } catch (err) {
      console.log(err)
    }
    try {
      const resmc = await axios.get(urlMC + `?id=${id}`)
      setMC(resmc.data.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleSelect = (e) => {
    setTipo(e.target.value)
    if(!e.target.value) {
      setData(mp)
      setColumns(columnsMP)
    }
    else {
      setData(mc)
      setColumns(columnsMC)
    }
  }

  React.useEffect(() => {
    getInfo()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <Box m={1}>
      <Stack direction={'row'}>
        <Typography variant='h5' sx={{ my: 1.5 }}>Historial de Mantenciones</Typography>
        <Box sx={{ flexGrow: 1, minWidth: '50px' }}/>
        <FormControl sx={{ m: 1, minWidth: '150px' }}>
          <InputLabel id='tipo'>Tipo</InputLabel>
            <Select
              labelId='tipo'
              size='small'
              id='tipo'
              label="Tipo"
              value={tipo}
              name='tipo'
              onChange={handleSelect}
            >
              <MenuItem value={0}>Preventivas</MenuItem>
              <MenuItem value={1}>Correctivas</MenuItem>
            </Select>
        </FormControl>
      </Stack>
      <Stack>
        <DataTable
          columns={columns}
          data={data}
          direction='auto'
          pagination
          responsive
          dense
          noDataComponent={<Typography variant="h5" component="h2" sx={{my:2}} > No existen datos disponibles </Typography>}
          paginationComponentOptions={paginationComponentOptions}
        />
      </Stack>
      <Stack direction={'row-reverse'}>
        <Button variant='contained' onClick={() => setOpen(false)}>Cerrar</Button>
      </Stack>
    </Box>
  )
}
