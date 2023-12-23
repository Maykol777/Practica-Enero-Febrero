import { Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core'
import { Box, Button, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import SaveIcon from '@mui/icons-material/Save'
import React, { useState } from 'react'

export default function Documentacion({setOpenMini}) {
    const [open, setOpen] = useState(true)
    
    const handleClose=()=>{
        return setOpenMini(false)
    }
  return (
    <div>       
        
        <DialogContent >
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack>
                    <Typography variant='h5'>Ingrese Documentación </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                        
                    <Button endIcon={<InsertDriveFileIcon/>}  sx={{color:'gray'}}>
                        <Typography variant='caption'>Ingrese archivo</Typography>
                    </Button>
                </Stack>
            </Stack>
            <Stack sx={{  height:'180px', mt:1}} >

                <TextField 
                    label='Ingrese Detalle de la Mantención'
                    size={'medium'}
                    sx={{height:'70px'}}
                    multiline
                    rows={6}
                    ></TextField>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Stack direction={'row'} sx={{mx:2}} spacing={2}>
                <Box  >
                 <Button variant='contained' color='primary' startIcon={<SaveIcon/>} >Guardar</Button>
                </Box>
                <Box  >
                 <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                </Box>
            </Stack>
        </DialogActions>
    </div>
  )
}
