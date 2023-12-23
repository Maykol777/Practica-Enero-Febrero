import { Box } from '@material-ui/core'
import { Stack } from '@mui/system'
import React from 'react'
import ListaEquipoMedico from './ListaEquipoMedicoV3'
import AgregarEquipo from './AgregarEquipo'

export default function EquipoMedicoScreen() {
  return (
    <Box>
       
        <Stack sx={{ margin:1 }}>
          <ListaEquipoMedico/>
        </Stack>
        
    </Box>
  )
}