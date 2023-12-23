import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment'
import React from 'react'
import axios from 'axios';

const url = 'http://localhost:8000/api/updateMantencionCorrectiva'

export default function EditarMantencionCorrectiva({data, setOpen, getMantenciones}) {
  const [ values, setValues ] = React.useState(data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const aux = {
        idEquipo: values.idEquipo,
        descripcion: values.descripcion,
        fecha: moment(values.fecha).format('yyyy-MM-DD'),
        costo: values.costo
      }
      const res = await axios.put(url + `?id=${data.idMantencion}`, aux)
      console.log(res)
      getMantenciones()
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.id]: e.target.value
    })
  }

  return (
  <Box sx={{ m: 1 }}>
    <Stack alignItems={'center'} sx={{ m: 1 }}>
      <Typography variant='h5'>Editar mantencion</Typography>
    </Stack>
    <Stack sx={{ m: 1.5 }}>
        <TextField id='descripcion' label='Descripcion' type={'text'} multiline maxRows={4} defaultValue={data.descripcion ? data.descripcion : ""} onChange={handleChange}/>
      </Stack>
      <Stack sx={{ m: 1.5 }} direction='row' spacing={1}>
        <TextField id='fecha' label='Fecha' type={'date'}  InputLabelProps={{ shrink: true }} defaultValue={data.fecha ? moment(data.fecha).format('yyyy-MM-DD') : 0} onChange={handleChange}/>
        <TextField id='costo' label='Costo' type={'number'} defaultValue={data.costo ? data.costo : 0} onChange={handleChange}/>
      </Stack>
      <Stack sx={{ m: 1.5 }} direction={'row'}>
        <Typography sx={{ mt: 1 }} variant='body1'>Adjuntar comprobante:</Typography>
        <IconButton color='primary'>
          <AttachFileIcon/>
        </IconButton>
      </Stack>
    <Stack direction={'row-reverse'} sx={{ m: 1 }} spacing={1}>
      <Button variant='contained' color='error' onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant='contained' onClick={handleSubmit} startIcon={<SaveIcon/>}>Guardar</Button>
    </Stack>
  </Box>
  )
}
