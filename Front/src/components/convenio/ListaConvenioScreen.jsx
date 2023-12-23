import { Card } from '@mui/material'
import React from 'react'
import ListaConvenio from './ListaConvenio'

export default function ListaConvenioScreen() {
    return (
        <div>
            <Card variant='outlined' sx={{ m: 1 }}>
                <ListaConvenio/>
            </Card>
        </div>
    )
}
