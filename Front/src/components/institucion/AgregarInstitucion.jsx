import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import  SaveIcon  from '@mui/icons-material/Save'
import axios from 'axios'
import React from 'react'

const url = 'http://localhost:8000/api/createInstitucion'

export default function AgregarInstitucion({setOpen, getInstituciones}) {
  const [ institucion, setInstitucion ] = React.useState({
    nombre: "",
    ciudad: "",
    region: ""
  })

  const handleChange = (e) => {
    setInstitucion({
      ...institucion,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(url, institucion)
      console.log(res)
      getInstituciones()
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ m: 1 }}>
      <Typography variant='h5' sx={{ m: 1, mb: 1.5 }}>Agregar Institucion</Typography>
      <Stack sx={{ m: 1 }}>
        <TextField id='nombre' label='Nombre' size='small' onChange={handleChange}/>
      </Stack>
      <Stack direction={'row'} spacing={1} sx={{ m: 1, mt: 1.5 }}>
        <TextField id='ciudad' label='Ciudad' size='small' onChange={handleChange}/>
        <TextField id='region' label='Region' size='small' onChange={handleChange}/>
      </Stack>
      <Stack direction={'row-reverse'} spacing={1} sx={{ m: 1, mt: 1.5 }}>
        <Button variant='contained' color='error' onClick={() => setOpen(false)}>Cancelar</Button>
        <Button variant='contained' onClick={handleSubmit} startIcon={<SaveIcon/>}>Agregar</Button>
      </Stack>
    </Box>
  )
}
