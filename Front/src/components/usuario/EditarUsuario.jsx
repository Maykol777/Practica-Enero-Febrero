import { Alert, Box, Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon  from '@mui/icons-material/Save'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const urlInstitucion = 'http://localhost:8000/api/getAllInstituciones'
const urlUpdate = 'http://localhost:8000/api/updateUsuario'

export default function EditarUsuario({ setOpen, usuario, getUsuarios }) {
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ openAlert, setOpenAlert ] = React.useState(false)
  const [ instituciones, setInstituciones ] = React.useState()
  const [ values, setValues ] = React.useState(usuario)

  const getInstituciones = async () => {
    const res = await axios.get(urlInstitucion)
    setInstituciones(res.data.data)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.id]: e.target.value
    })
    console.log(values)
  }

  const handleChangeSelect = (e) => {
    setValues({
      ...values,
      [ e.target.name ]: e.target.value
    })
    console.log(values)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('submit')
    try {
      const newUser = {
        nombre: values.nombre,
        cargo: values.cargo,
        idInstitucion: values.idInstitucion,
        clave: values.clave
      }
      console.log(newUser)
      const res = await axios.put(urlUpdate + `?rut=${usuario.rut}`, newUser)
      console.log(res)
      getUsuarios()
      setOpen(false)
      navigate('/main/admin/usuario')
    } catch (err) {
      setOpenAlert(true)
      console.log(err)
    }
  }

  const close = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    getInstituciones()
    console.log(usuario)
  }, [])

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Box component={'form'} m={1}>
      <Stack alignItems={'center'} my={2}>
        <Typography variant='h5'>Usuario Usuario</Typography>
      </Stack>
      <Collapse in={openAlert}>
        <Alert severity='error' action={
          <IconButton aria-label='close' color='inherit' size='small' onClick={() => setOpenAlert(false)}>
            <CloseIcon fontSize='inherit'/>
          </IconButton>
        }>
          Error al editar usuario
        </Alert>
      </Collapse>
      <Stack alignItems={'center'} my={2}>
        <Typography variant='body1'>RUT: {usuario.rut}</Typography>
      </Stack>
      <Stack m={2} spacing={2}>
        <TextField id='nombre' label='Nombre completo' defaultValue={usuario.nombre} variant='outlined' size='small' fullWidth onChange={handleChange}/>
        <TextField id='cargo' label='Cargo' defaultValue={usuario.cargo} variant='outlined' size='small' fullWidth onChange={handleChange}/>
      </Stack>
      <Stack m={2} direction='row' spacing={2}>
        <TextField id='clave' label='Clave' defaultValue={usuario.clave} variant='outlined' size='small' fullWidth onChange={handleChange}/>
        <FormControl fullWidth size='small'>
          <InputLabel id='idInstitucion'>Institucion</InputLabel>
          <Select
            labelId='idInstitucion'
            id='idInstitucion'
            value={values.idInstitucion}
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
      <Stack m={2} direction='row-reverse' spacing={2}>
        <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
        <Button variant='contained' onClick={onSubmit} startIcon={<SaveIcon/>}>Guardar</Button>
      </Stack>
    </Box>
  )
}
