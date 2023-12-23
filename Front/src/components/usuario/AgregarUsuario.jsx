import { Alert, Box, Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon  from '@mui/icons-material/Save'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const urlInstitucion = 'http://localhost:8000/api/getAllInstituciones'
const urlCreate = 'http://localhost:8000/api/createUsuario'

export default function AgregarUsuario({ setOpen }) {
  const navigate = useNavigate()
  const [ openAlert, setOpenAlert ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ usuario, setUsuario ] = React.useState({
    rut: "",
    nombre: "",
    cargo: "",
    idInstitucion: "",
    clave: "",
  })
  const [ instituciones, setInstituciones ] = React.useState()

  const getInstituciones = async () => {
    const res = await axios.get(urlInstitucion)
    setInstituciones(res.data.data)
    setIsLoading(false)
  }

  const close = () => {
    return setOpen(false)
  }

  React.useEffect(() => {
    getInstituciones()
  }, [])

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.id]: e.target.value
    })
    console.log(usuario)
  }

  const handleChangeSelect = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
    console.log(usuario)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('nuevo usuario')
    console.log(usuario)
    try {
      setUsuario({
        ...usuario,
        clave: usuario.rut.substr(0, 5)
      })
      const res = await axios.create(urlCreate, usuario)
      console.log(res)
      setOpen(false)
      navigate(0)
    } catch (err) {
      console.log(err)
      setOpenAlert(true)
    }
  }

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Box component={'form'} m={1}>
      <Stack alignItems={'center'} my={2}>
        <Typography variant='h5'>Agregar Usuario</Typography>
      </Stack>
      <Collapse in={openAlert}>
        <Alert severity='error' action={
          <IconButton aria-label='close' color='inherit' size='small' onClick={() => setOpenAlert(false)}>
            <CloseIcon fontSize='inherit'/>
          </IconButton>
        }>
          Error al crear usuario
        </Alert>
      </Collapse>
      <Stack m={2} direction='row'>
        <TextField id='nombre' label='Nombre completo' variant='outlined' size='small' fullWidth onChange={handleChange}/>
      </Stack>
      <Stack m={2} direction='row' spacing={2}>
        <TextField id='rut' label='Rut, ej: 9999999-9' variant='outlined' size='small' fullWidth onChange={handleChange}/>
        <FormControl fullWidth size='small'>
          <InputLabel id='idInstitucion'>Institucion</InputLabel>
          <Select
            labelId='idInstitucion'
            id='idInstitucion'
            value={usuario.idInstitucion}
            label='Institucion'
            name='idInstitucion'
            onChange={handleChangeSelect}
          >
            {instituciones.map(institucion => {
              return (
                <MenuItem key={institucion.idInstitucion} value={institucion.idInstitucion}>{institucion.nombre}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Stack>
      <Stack m={2} direction='row'>
        <TextField id='cargo' label='Cargo' variant='outlined' size='small' fullWidth onChange={handleChange}/>
      </Stack>
      <Stack m={2} direction='row-reverse' spacing={2}>
        <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
        <Button variant='contained' onClick={onSubmit} startIcon={<SaveIcon/>}>Agregar</Button>
      </Stack>
    </Box>
  )
}
