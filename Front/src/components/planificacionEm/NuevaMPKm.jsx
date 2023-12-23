import { Box, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import {Button} from '@mui/material'
import { Dialog, Stack, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistorialPreventiva from './HistorialPreventivas'
import Swal from 'sweetalert2'
import SaveIcon from '@mui/icons-material/Save'

const url = "http://localhost:8000/api/createPreventivaVehiculo"

export default function NuevaMPKm({row, getequipos, getPreventiva, setOpen, setCambioAct}) {
    const fecha = new Date();
    const anoActual = fecha.getFullYear()
    const [showError, setShowError] = useState(false)
    
    const showFalse =()=>{
        setShowError(false)
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
    })

    const close = () =>{
        return setOpen(false)
    }
    const handleClose=()=>{
        return (setCambioAct(true), setOpen(false))
    }

    const [data, setData] = useState({
        anoPrKm: anoActual,
        kilometraje1: "",
        kilometraje2: "",
        kilometraje3: "",
        kilometraje4: "",
        kilometraje5: "",
        kilometraje6: "",
        kilometraje7: "",
        kilometraje8: "",
        kilometraje9: "",
        kilometraje10: "",
        kilometraje11: "",
        kilometraje12: "",
        idEquipo: row.idEquipo,
    })

    const handle=(e)=>{
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        console.log(newdata)
        setData(newdata)
    }

    const submit = (e) =>{
        e.preventDefault();
        axios.post(url, {
            
            anoPrKm: data.anoPrKm,
            kilometraje1: data.kilometraje1,
            kilometraje2: data.kilometraje2,
            kilometraje3: data.kilometraje3,
            kilometraje4: data.kilometraje4,
            kilometraje5: data.kilometraje5,
            kilometraje6: data.kilometraje6,
            kilometraje7: data.kilometraje7,
            kilometraje8: data.kilometraje8,
            kilometraje9: data.kilometraje9,
            kilometraje10: data.kilometraje10,
            kilometraje11: data.kilometraje11,
            kilometraje12: data.kilometraje12,
            idEquipo: row.idEquipo
        })
        .then((res)=>{
            console.log(res.data)
            getPreventiva();
            handleClose();
            Toast.fire({
                icon: 'success',
                title:'Ficha actualizada',
            })
        })
        .catch((error)=>{
            if(error.response.status === 401){
                setShowError(true)
                setTimeout(showFalse,2000)
            }else{
                handleClose();
                Toast.fire({
                    icon: 'error',
                    title:'Error al actualizar ficha',
                })
            }     
        })
        }

  return (
    <div>
        <DialogTitle>
            <Stack direction={'column'}>
                Planificacion Mantenimiento Preventiva {anoActual}
                {showError ? <Typography variant='caption' color='error' >Ingrese al menos una planificación</Typography> : null}
            </Stack>
        </DialogTitle>
            <DialogContent>
                <Box sx={{flexGrow:1}} >
                    <Stack direction='row' spacing={3}  justifyContent={'space-between'}  alignItems={'stretch'}>
                    <Stack direction='column' spacing={0.9} sx={{maxWidth:'190px'}} divider={<Divider orientation="horizontal" flexItem/>}>
                        <Typography variant='body1' >
                            Resumen:
                        </Typography>
                        <Typography variant='body2'>
                            Serie: {row.serie}
                        </Typography>
                        <Typography variant='body2'>
                            Nombre: {row.nombre}
                        </Typography>
                        <Typography variant='body2'>
                            Servicio clinico: {row.ubicacion}
                        </Typography>
                        <Typography variant='body2'>
                            Clase: {row.clase}
                        </Typography>
                        <Typography variant='body2'>
                            SubClase: {row.subClase}
                        </Typography>
                        <Typography variant='body2'>
                            Modelo: {row.modelo}
                        </Typography>
                        <Typography variant='body2'>
                            Clase: {row.subClase}
                        </Typography>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='body2'>
                                Historial MP
                            </Typography>
                            <HistorialPreventiva row={row} getMedicos = {getequipos}/>
                        </Box>
                        
                    </Stack>
                    <Divider orintation='vertical' flexItem/>
                        <Stack direction='column' spacing={1.05} sx={{maxWidth:'150px'}}>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 10.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 20.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 30.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 40.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 50.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 60.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 70.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 80.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 90.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 100.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 110.000 km</Typography>  
                            </Box>
                            <Box sx={{width:150}}>
                                <Typography variant='subtitle1'> 120.000 km</Typography>  
                            </Box>

                        </Stack>
                        <Stack spacing={0.8} sx={{minWidth : '150px'}}>
                            <Box sx={{my:3}}>
                                <FormControl fullWidth >
                                <Select
                                    id="kilometraje1"
                                    defaultValue={""}
                                    onChange={handle}
                                    name='kilometraje1'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth>
                                <Select
                                    labelId='kilometraje2'
                                    id='kilometraje2'
                                    name='kilometraje2'
                                    defaultValue={""}
                                    onChange = {handle}
                                
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth>
                                <Select
                                    labelId='kilometraje3'
                                    id='kilometraje3'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje3'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje4'
                                    id='kilometraje4'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje4'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje5'
                                    id='kilometraje5'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje5'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje6'
                                    id='kilometraje6'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje6'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje7'
                                    id='kilometraje7'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje7'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje8'
                                    id='kilometraje8'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje8'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje9'
                                    id='kilometraje9'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje9'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='1kilometraje10'
                                    id='1kilometraje10'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='1kilometraje10'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje11'
                                    id='kilometraje11'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje11'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje12'
                                    id='kilometraje12'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='kilometraje12'
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
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
                <Button variant='contained' color='primary' startIcon={<SaveIcon/>} onClick={(e)=>submit(e)}>Guardar</Button>
                </Box>
                <Box sx={{my:2}} >
                 <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
                </Box>
                </Stack>
            </DialogActions>
    </div>
  )
}
