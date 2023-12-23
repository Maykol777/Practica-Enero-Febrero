import { Card } from '@mui/material'
import React from 'react'
import ListaMantencionCorrectiva from './ListaMantencionCorrectiva'

export default function MantencionCorrectivaScreen() {
    return (
        <Card variant='outlined' sx={{ m: 1 }}>
            <ListaMantencionCorrectiva/>
        </Card>
    )
}
