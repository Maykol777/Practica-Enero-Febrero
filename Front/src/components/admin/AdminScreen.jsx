import { Box, Card, Stack } from '@mui/material'
import React from 'react'
import Cookies from 'universal-cookie'
import InstitucionView from './InstitucionView'

const cookies = new Cookies()

export default function AdminScreen() {
  return (
    <Box>
      <Card variant='outlined' sx={{ m: 1 }}>
        <Stack sx={{ p: 1, ml: 5 }}>
          <h1> Bienvenido, {cookies.get("nombre")} </h1>
        </Stack>
      </Card>
      <Box>
        <InstitucionView/>
      </Box>
    </Box>
  )
}
