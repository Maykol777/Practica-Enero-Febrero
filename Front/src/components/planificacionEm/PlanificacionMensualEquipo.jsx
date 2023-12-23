import React, { useState } from 'react'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Select, Typography } from '@material-ui/core'
import { DialogActions, FormControl, MenuItem } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import Button from '@mui/material/Button'

const url = "http://localhost:8000/api/createPreventiva"
export default function PlanificacionMensualEquipo(row, getMedicos, getPreventiva) {
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const fecha = new Date();
    const anoActual = fecha.getFullYear()


    const [data, setData] = useState({
        ano: "",
        enero: "",
        febrero:"",
        marzo:"",
        abril:"",
        mayo:"",
        junio:"",
        julio:"",
        agosto:"",
        septiembre:"",
        octubre:"",
        noviembre:"",
        diciembre:"",
        idEquipo: row.row.idEquipo,
        eliminado:""
    })

    const handle=(e)=>{
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        console.log(newdata)
        setData(newdata)
    }

    const abrir = () =>{
        setData({
            ano: 2000,
            enero: "",
            febrero:"",
            marzo:"",
            abril:"",
            mayo:"",
            junio:"",
            julio:"",
            agosto:"",
            septiembre:"",
            octubre:"",
            noviembre:"",
            diciembre:"",
            idEquipo: row.row.idEquipo,
            eliminado:""
        })
        handleOpen();
    }

    const submit = (e) =>{
        e.preventDefault();
        axios.post(url, {
            ano: 2000,
            enero: data.enero,
            febrero: data.febrero,
            marzo: data.marzo,
            abril: data.abril,
            mayo: data.mayo,
            junio: data.junio,
            julio: data.julio,
            agosto: data.agosto,
            septiembre: data.septiembre,
            octubre: data.octubre,
            noviembre: data.noviembre,
            diciembre: data.diciembre,
            idEquipo: row.row.idEquipo,
            eliminado: data.eliminado
        })
        .then((res)=>{
            console.log(res.data)
            handleClose();
        })
        }

  return (
    <div>
        <IconButton
            onClick={abrir}
            variant= 'contained'
            size = 'medium'
            color='primary'
        >
            <PlaylistAddCircleIcon/>
        </IconButton>

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle>Planificacion Mantenimiento Preventiva {anoActual}</DialogTitle>
            <DialogContent>
                <Box sx={{flexGrow:1}} >
                    <Stack direction='row' spacing={3}  justifyContent={'flex-start'}>
                    <Stack direction='column' spacing={0.9} >
                        <Typography variant='body1' >
                            Resumen:
                        </Typography>
                        <Typography variant='body2'>
                            Serie: {row.row.serie}
                        </Typography>
                        <Typography variant='body2'>
                            Nombre: {row.row.nombre}
                        </Typography>
                        <Typography variant='body2'>
                            Servicio clinico: {row.row.ubicacion}
                        </Typography>
                        <Typography variant='body2'>
                            Clase: {row.row.clase}
                        </Typography>
                        <Typography variant='body2'>
                            SubClase: {row.row.subClase}
                        </Typography>
                        <Typography variant='body2'>
                            Modelo: {row.row.modelo}
                        </Typography>
                        <Typography variant='body2'>
                            Clase: {row.row.subClase}
                        </Typography>
                        
                    </Stack>
                        <Stack direction='column' spacing={0.9} sx={{mt:1}}>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Enero</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Febrero</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Marzo</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Abril</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Mayo</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Junio</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Julio</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Agosto</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Septiembre</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Octubre</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Noviembre</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> Diciembre</Typography>  
                            </Box>

                        </Stack>
                        <Stack direction='column' spacing={0.38}>
                            <Box sx={{my:5}}>
                                <FormControl sx={{minWidth: 150}} >
                                <Select
                                    id="enero"
                                    defaultValue={"-"}
                                    onChange={handle}
                                    name='enero'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='febrero'
                                    id='febrero'
                                    name='febrero'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='marzo'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='abril'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='mayo'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='junio'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='julio'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='agosto'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='septiembre'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='octubre'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='noviembre'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl sx={{minWidth: 150}} size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={"-"}
                                    onChange = {handle}
                                    name='diciembre'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                        </Stack>
                    </Stack>

                </Box>
            </DialogContent>
            <DialogActions>
                <Stack direction={'row'} sx={{m:2}} spacing={2}>
                <Box sx={{my:2}} >
                 <Button variant='contained' color='primary'  onClick={(e)=>submit(e)}>Aceptar</Button>
                </Box>
                <Box sx={{my:2}} >
                 <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                </Box>
                </Stack>
                
                
            </DialogActions>
        </Dialog>
        
    </div>
  )
}
