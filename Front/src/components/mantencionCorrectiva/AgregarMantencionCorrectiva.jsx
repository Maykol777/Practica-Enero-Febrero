import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import  SaveIcon  from '@mui/icons-material/Save'
import React from 'react'
import axios from 'axios';

const urlMantencion = 'http://localhost:8000/api/createMantencionCorrectiva'

export default function AgregarMantencionCorrectiva({id, setOpen, getEquipos}) {
  const [ mantencion, setMantencion ] = React.useState({
    idEquipo: id,
    descripcion: "",
    costo: 0,
    fecha: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(urlMantencion, mantencion)
      console.log(res)
      getEquipos()
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setMantencion({
      ...mantencion,
      [e.target.id]: e.target.value
    })
  }

  return (
    <Box sx={{ m: 1 }}>
      <Stack alignItems={'center'} sx={{ m: 1 }}>
        <Typography variant='h5'>Agregar mantencion correctiva</Typography>
      </Stack>
      <Stack sx={{ m: 1.5 }}>
        <TextField id='descripcion' label='Descripcion' type={'text'} multiline maxRows={4} onChange={handleChange}/>
      </Stack>
      <Stack sx={{ m: 1.5 }} direction='row' spacing={1}>
        <TextField id='fecha' label='Fecha' type={'date'}  InputLabelProps={{ shrink: true }} onChange={handleChange}/>
        <TextField id='costo' label='Costo' type={'number'} onChange={handleChange}/>
      </Stack>
      <Stack sx={{ m: 1.5 }} direction={'row'}>
        <Typography sx={{ mt: 1 }} variant='body1'>Adjuntar comprobante:</Typography>
        <IconButton>
          <AttachFileIcon/>
        </IconButton>
      </Stack>
      <Stack direction={'row-reverse'} sx={{ m: 1 }} spacing={1}>
        <Button variant='contained' color='error' onClick={() => setOpen(false)}>Cerrar</Button>
        <Button variant='contained' onClick={handleSubmit} startIcon={<SaveIcon/>}>Agregar</Button>
      </Stack>
    </Box>
  )
}
