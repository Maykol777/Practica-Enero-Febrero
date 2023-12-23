import { Card, Stack } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <Card variant='outlined' sx={{ p: 2, m: 2 }}>
        <Stack direction={'row'}>
            <h1>Bienvenido!</h1>
        </Stack>
    </Card>
  )
}
