import { Box, Card, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import InstitucionAmbulancia from './InstitucionAmbulancia'
import InstitucionIndustrial from './InstitucionIndustrial'
import InstitucionMedico from './InstitucionMedico'

const urlInstitucion = 'http://localhost:8000/api/getInstitucion'

export default function InstitucionScreen() {
  const [ isLoading, setIsLoading ] = React.useState(true)
  let params = useParams()
  const [ tipo, setTipo ] = React.useState('medico')
  const [ institucion,  setInstitucion ] = React.useState()
  const getInstitucion = async () => {
      const res = await axios.get(urlInstitucion + `?id=${params.id}`)
      setInstitucion(res.data.data[0])
      setIsLoading(false)
  }

  const showInfo = () => {
    if(tipo == 'medico') return <InstitucionMedico tipo={tipo}/>
    if(tipo == 'industrial') return <InstitucionIndustrial tipo={tipo}/>
    if(tipo == 'vehiculo') return <InstitucionAmbulancia tipo={tipo}/>
  }

  const handleSelect = (e) => {
    setTipo(e.target.value)
  }

  React.useEffect(() => {
    getInstitucion()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <Box>
      <Card variant='outlined' sx={{p:1, m:1}}>
        <Stack direction='row' sx ={{ml:3}} justifyContent={'space-between'} fullWidth alignItems='center'>
          <Stack>
            <Typography variant='h4'>{institucion.nombre}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' sx={{mr:2}}>
            <Typography variant='h6'>Tipo de Equipo</Typography>
            <FormControl sx={{m:1}} style={{minWidth: 190}}>
              <InputLabel id='tipoE'>Tipo</InputLabel>
                <Select
                  labelId='tipoE'
                  size='small'
                  id='tipoE'
                  label="Tipo"
                  value={tipo}
                  name='tipo'
                  onChange={handleSelect}
                >
                  <MenuItem value={'medico'}>Medico</MenuItem>
                  <MenuItem value={'industrial'}>Industrial</MenuItem>
                  <MenuItem value={'vehiculo'}>Ambulancia</MenuItem>
                </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Card>
      {showInfo()}
    </Box>
  )
}
