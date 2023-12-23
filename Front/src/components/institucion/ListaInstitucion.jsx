import { Button, Card, Dialog, IconButton, Stack, Typography } from '@mui/material'
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import DataTable from 'react-data-table-component'
import AgregarInstitucion from './AgregarInstitucion'
import axios from 'axios'
import EditarInstitucion from './EditarInstitucion';

const urlInstituciones = 'http://localhost:8000/api/getInstituciones'
const urlDelete = 'http://localhost:8000/api/deleteInstitucion'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

export default function ListaInstitucion() {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ open, setOpen ] = React.useState(false)
  const [ openEdit, setOpenEdit ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ instituciones, setInstituciones ] = React.useState()

  const columns = [
    { name: 'Nombre', selector: row=>row.nombre, sortable : true },
    { name: 'Ciudad', selector: row=>row.ciudad, sortable : true },
    { name: 'Region', selector: row=>row.region, sortable : true },
    { name: 'Editar', width: '40px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleEdit(e, row)}><EditIcon/></IconButton> },
    { name: 'Eliminar', width: '45px', button: true, cell: (row) => <IconButton size='small' color='secondary' onClick={(e) => handleDelete(e, row.idInstitucion)}><DeleteIcon/></IconButton> },
  ]

  const getInstituciones = async () => {
    try {
      const res = await axios.get(urlInstituciones)
      setInstituciones(res.data.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleEdit = (e, row) => {
    e.preventDefault()
    setData(row)
    setOpenEdit(true)
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    try {
      if(window.confirm('Estas seguro que deseas eliminar esta institucion?')) {
        const res = await axios.delete(urlDelete + `?id=${id}`)
        console.log(res)
        getInstituciones()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  React.useEffect(() => {
    getInstituciones()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <AgregarInstitucion setOpen={setOpen} getInstituciones={getInstituciones}/>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <EditarInstitucion setOpenEdit={setOpenEdit} data={data} getInstituciones={getInstituciones}/>
      </Dialog>
      <Card sx={{ m: 1 }} variant='outlined'>
        <Stack direction={'row'} sx={{ m: 1 }} alignItems={'center'}>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>Lista de Instituciones</Typography>
          <Button variant='contained' onClick={() => setOpen(true)} startIcon={<AddCircleOutlineIcon/>}>Agregar</Button>
        </Stack>
      </Card>
      <Card sx={{ m: 1 }} variant='outlined'>
        <Stack sx={{ m: 1 }}>
          <DataTable
            columns={columns}
            data = {instituciones}
            direction = "auto"
            pagination
            fixedHeader
            responsive
            dense
            noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
            paginationComponentOptions = {paginationComponentOptions}
          />
        </Stack>
      </Card>
    </div>
  )
}
