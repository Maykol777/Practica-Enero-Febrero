import { Card } from '@mui/material'
import React from 'react'
import AgregarEquipoIndustrial from './AgregarEquipoIndustrial'
import ListaEquipoIndustrial from './ListaEquipoIndustrial'

export default function EquipoIndustrialScreen() {
  return (
    <div>
      <Card variant='outlined' sx={{ m: 1 }}>
        <ListaEquipoIndustrial/>
      </Card>
    </div>
  )
}
