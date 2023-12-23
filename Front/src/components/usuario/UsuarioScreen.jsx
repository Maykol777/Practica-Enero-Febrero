import { Box, Button, Card, Dialog, Stack, Typography } from '@mui/material'
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import React from 'react'
import ListaUsuarios from './ListaUsuarios'
import AgregarUsuario from './AgregarUsuario'

export default function UsuarioScreen() {
  const [ open, setOpen ] = React.useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <Stack spacing={1}>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AgregarUsuario setOpen={setOpen}/>
      </Dialog>
      <Card variant='outlined' sx={{ p: 1 }}>
        <Stack direction={'row'}>
          <Typography variant='h5'>Lista de Usuarios</Typography>
          <Box sx={{ flexGrow: 1 }}/>
          <Button variant='contained' startIcon={<AddCircleOutlineIcon/>} onClick={handleClick}>Agregar</Button>
        </Stack>
      </Card>
      <Card variant='outlined'>
        <ListaUsuarios/>
      </Card>
    </Stack>
  )
}
