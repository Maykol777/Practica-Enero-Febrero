import { Dialog, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditarUsuario from './EditarUsuario';

const urlDeleteUsuario = 'http://localhost:8000/api/deleteUsuario'
const urlUsuarios = 'http://localhost:8000/api/getUsuariosWithNameInstitucion'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function ListaUsuarios() {
  const columns = [
    { name: 'RUT', selector: row=>row.rut, sortable: true, grow: 1 },
    { name: 'Nombre', selector: row=>row.nombre, sortable: true, grow: 1 },
    { name: 'Cargo', selector: row=>row.cargo, sortable: true, grow: 1 },
    { name: 'Institucion', selector: row=>row.institucion, sortable: true, grow: 1 },
    { name: 'Editar', width: '45px', button: true, cell: (row) => <IconButton color='primary' onClick={e => handleEdit(e, row)}><EditIcon/></IconButton>},
    { name: 'Eliminar', width: '70px', button: true, cell: (row) => <IconButton color='secondary' onClick={e => handleDelete(e, row.rut)}><DeleteIcon/></IconButton>},
  ]

  const navigate = useNavigate()
  const [ open, setOpen ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ usuarios, setUsuarios ] = React.useState([])
  const [ usuario, setUsuario ] = React.useState()

  const getUsuarios = async () => {
    const res = await axios.get(urlUsuarios)
    setUsuarios(res.data)
    setIsLoading(false)
  }

  const refreshPage = () => {
    navigate(0)
  }

  const handleEdit = (e, row) => {
    e.preventDefault()
    console.log('editar ' + row.rut)
    setUsuario(row)
    setOpen(true)
  }

  const handleDelete = async (e, rut) => {
    e.preventDefault()
    console.log('eliminar ' + rut)
    try {
      if(window.confirm(`Esta seguro que desea eliminar al usuario con RUT: ${rut}`)) {
        const res = await axios.delete(urlDeleteUsuario + `?rut=${rut}`)
        console.log(res)
        refreshPage()
      }
    } catch (err){
      console.log(err)
    }
  }

  const [ buscar, setBuscar ] = React.useState(null)

  const busqueda = (usuario, buscar) => {
    if(buscar) return usuario.rut.includes(buscar)
    else return usuario;
  }

  const filtrado = (usuario, buscar) => {
    if(usuario)
      return usuario.filter(usuario => busqueda(usuario, buscar))
  }

  React.useEffect(() => {
    getUsuarios()
  }, [])

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <EditarUsuario setOpen={setOpen} usuario={usuario} getUsuarios={getUsuarios}/>
      </Dialog>
      <TextField size='small' placeholder='Buscar por RUT' onChange={(e) => setBuscar(e.target.value)} sx={{ m: 1 }}
        InputProps={{
          endAdornment:(
            <InputAdornment position="end">
              <SearchIcon/>
            </InputAdornment>
          )
        }}
      />
      <DataTable
        columns={columns}
        data={ filtrado(usuarios, buscar) }
        direction='auto'
        pagination
        fixedHeader
        responsive
        dense
        noDataComponent={<Typography sx={{ my: 2 }} variant="h5" component="h2"> No existen datos disponibles </Typography>}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  )
}
