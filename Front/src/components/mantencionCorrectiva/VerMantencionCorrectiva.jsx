import { Box, Button, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import moment from 'moment';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import EditarMantencionCorrectiva from './EditarMantencionCorrectiva';

const urlMantencion = 'http://localhost:8000/api/getMantencionCorrectivasEquipo'
const urlAno = 'http://localhost:8000/api/getMantencionCorrectivaEquipoAnoUltima'
const urlDelete = 'http://localhost:8000/api/deleteMantencionCorrectiva'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function VerMantencionCorrectiva({id, setOpenView, getEquipos}) {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ mantenciones, setMantenciones ] = React.useState()
  const [ ano, setAno ] = React.useState()
  const [ open, setOpen ] = React.useState(false)
  const [ data, setData ] = React.useState(null)

  const columns = [
    { name: 'Descripcion', wrap: true, selector: row=>row.descripcion, sortable : true, grow: 2 },
    { name: 'Fecha', selector: row=>row.fecha, format: row=> moment(row.fecha).format('DD/MM/YYYY'), sortable : true },
    { name: 'Costo', selector: row=>row.costo, format: row=> Intl.NumberFormat().format(row.costo), sortable : true },
    { name: 'Editar', width: '40px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleEdit(e, row)}><EditIcon/></IconButton> },
    { name: 'Eliminar', width: '45px', button: true, cell: (row) => <IconButton size='small' color='secondary' onClick={(e) => handleDelete(e, row.idMantencion)}><DeleteIcon/></IconButton> },
  ]

  const getMantenciones = async () => {
    try {
      const res = await axios.get(urlMantencion + `?id=${id}`)
      setMantenciones(res.data.data)
      try {
        const res = await axios.get(urlAno + `?id=${id}`)
        setAno(res.data.data[0].ano)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    setAno(e.target.value)
  }

  const handleEdit = (e, row) => {
    e.preventDefault()
    try {
      setData(row)
      setOpen(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    try {
      if(window.confirm('Estas seguro que deseas eliminar esta mantencion?')) {
        const res = await axios.delete(urlDelete + `?id=${id}`)
        console.log(res)
        getEquipos()
        getMantenciones()
        if(mantenciones.length === 1) setOpenView(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = () => {
    getEquipos()
    setOpen(false)
  }

  React.useEffect(() => {
    getMantenciones()
  }, [])

  const busqueda = (mantencion, buscar) =>{
    if(buscar) return mantencion.fecha.includes(buscar)
    else return mantencion
  }

  const filtrado = (mantencion, buscar)=>{
    if(mantencion) return mantencion.filter(mantencion => busqueda(mantencion, buscar));
    else return mantencion
  }

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <Box sx={{ m: 1 }}>
      <Dialog open={open} onClose={handleClose}>
        <EditarMantencionCorrectiva setOpen={setOpen} data={data} getMantenciones={getMantenciones}/>
      </Dialog>
      <Stack alignItems={'center'} sx={{ my: 1 }}>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>Lista de Mantenciones correctivas</Typography>
      </Stack>
      <Stack>
        <Stack direction={'row-reverse'} sx={{ mb: 1 }}>
          <TextField id='ano' label='Año' type='number' defaultValue={ano} onChange={handleChange} size='small' sx={{ width: '85px' }}/>
        </Stack>
        <DataTable
          columns={columns}
          data = {filtrado(mantenciones, ano)}
          direction = "auto"
          pagination
          fixedHeader
          responsive
          dense
          noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
          paginationComponentOptions = {paginationComponentOptions}
        />
      </Stack>
      <Stack direction={'row-reverse'} sx={{ m: 1 }}>
        <Button variant='contained' onClick={() => setOpenView(false)}>Cerrar</Button>
      </Stack>
    </Box>
  )
}
