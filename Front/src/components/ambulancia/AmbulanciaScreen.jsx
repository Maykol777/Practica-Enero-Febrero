import { Card } from '@mui/material'
import React from 'react'
import AgregarAmbulancia from './AgregarAmbulancia'
import ListaAmbulancia from './ListaAmbulancia'

export default function AmbulanciaScreen() {
    return (
        <div>
        <Card variant='outlined' sx={{ m: 1 }}>
            <ListaAmbulancia/>
        </Card>
        </div>
    )
}
