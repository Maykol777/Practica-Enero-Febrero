import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import  SaveIcon  from '@mui/icons-material/Save'
import axios from 'axios'
import React from 'react'

const url = 'http://localhost:8000/api/updateInstitucion'

export default function EditarInstitucion({ data, setOpenEdit, getInstituciones }) {
  const [ institucion, setInstitucion ] = React.useState(data)

  const handleChange = (e) => {
    e.preventDefault()
    setInstitucion({
      ...institucion,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(url + `?id=${data.idInstitucion}`, institucion)
      console.log(res)
      getInstituciones()
      setOpenEdit(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ m: 1 }}>
      <Typography variant='h5' sx={{ m: 1, mb: 1.5 }}>Editar Institucion</Typography>
      <Stack sx={{ m: 1 }}>
        <TextField id='nombre' label='Nombre' size='small' defaultValue={data.nombre} onChange={handleChange}/>
      </Stack>
      <Stack direction={'row'} spacing={1} sx={{ m: 1, mt: 1.5 }}>
        <TextField id='ciudad' label='Ciudad' size='small' defaultValue={data.ciudad} onChange={handleChange}/>
        <TextField id='region' label='Region' size='small' defaultValue={data.region} onChange={handleChange}/>
      </Stack>
      <Stack direction={'row-reverse'} spacing={1} sx={{ m: 1, mt: 1.5 }}>
        <Button variant='contained' color='error' onClick={() => setOpenEdit(false)}>Cancelar</Button>
        <Button variant='contained' onClick={handleSubmit} startIcon={<SaveIcon/>}>Guardar</Button>
      </Stack>
    </Box>
  )
}
