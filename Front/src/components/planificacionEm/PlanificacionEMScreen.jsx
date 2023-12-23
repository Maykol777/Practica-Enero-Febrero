import { Box } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import ListaPlanificacionEM from './ListaPlanificacionEM'



export default function PlanificacionEMScreen() {
  return (
    <Box> 
        <Stack sx={{ margin:1 }}>
            <ListaPlanificacionEM />
        </Stack>
    </Box>
  )
}
