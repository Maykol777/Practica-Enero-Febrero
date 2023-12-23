import { Box, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import {Button, Divider} from '@mui/material'
import { Dialog, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistorialPreventiva from './HistorialPreventivas'
import PlanificacionMensualEquipo from './PlanificacionMensualEquipo'
import NuevaPlanificacionAnualKm from './NuevaPlanificacionAnualKm'

const url ='http://localhost:8000/api/updatePreventivaVehiculo/'
export default function FormularioActualizarVehiculo({row, getequipos, preventiva, getPreventiva, setOpen}) {
    const handleClose=()=>{
        return setOpen(false)
    }

    const [data, setData] = useState({
        anoPrKm: preventiva.anoPrKm,
        kilometraje1: preventiva.kilometraje1,
        kilometraje2: preventiva.kilometraje2,
        kilometraje3: preventiva.kilometraje3,
        kilometraje4: preventiva.kilometraje4,
        kilometraje5: preventiva.kilometraje5,
        kilometraje6: preventiva.kilometraje6,
        kilometraje7: preventiva.kilometraje7,
        kilometraje8: preventiva.kilometraje8,
        kilometraje9: preventiva.kilometraje9,
        kilometraje10: preventiva.kilometraje10,
        kilometraje11: preventiva.kilometraje11,
        kilometraje12: preventiva.kilometraje12,
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
        axios.put(url + "?id=" + preventiva.idMantencion,{
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
            idEquipo: row.idEquipo,
        })
        .then((res)=>{
            console.log(res.data)
            getPreventiva();
            handleClose();
        })
    }
        

  return (
    <div>
        <DialogTitle>Planificacion Mantenimiento Preventiva {data.anoPrKm}</DialogTitle>
            <DialogContent>
                <Box sx={{flexGrow:1}} >
                    <Stack direction='row' spacing={3} justifyContent={'space-between'} alignItems={'stretch'}>
                    <Stack direction='column'spacing={0.9} sx={{maxWidth:'190px'}} divider={<Divider orientation="horizontal" flexItem/>}>
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
                        <Stack direction ='row' justifyContent={'space-between'}>
                                <Box justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='body2'>
                                        Crear nueva MP
                                    </Typography>
                                    <NuevaPlanificacionAnualKm row={row} getequipos = {getequipos} getPreventiva ={getPreventiva} handleClose={handleClose}/>
                                </Box>

                                <Box justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='body2'>
                                        Historial MP
                                    </Typography>
                                    <HistorialPreventiva row={row} getequipos= {getequipos} preventiva ={preventiva} getPreventiva={getPreventiva}/>
                                </Box>
                            </Stack>
                        
                    </Stack>
                    <Divider orintation='vertical' flexItem/>
                        <Stack direction='column'spacing={1.05} sx={{maxWidth:'150px'}}>
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
                            <Box sx={{my:1}}>
                                <FormControl fullWidth >
                                <Select
                                    id="kilometraje1"
                                    onChange={handle}
                                    name='kilometraje1'
                                    value = {data.kilometraje1}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje2'
                                    id='kilometraje2'
                                    name='kilometraje2'
                                    value = {data.kilometraje2}
                                    onChange = {handle}
                                
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje3'
                                    id='kilometraje3'
                                    onChange = {handle}
                                    name='kilometraje3'
                                    value = {data.kilometraje3}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje4'
                                    id='kilometraje4'
                                    onChange = {handle}
                                    name='kilometraje4'
                                    value = {data.kilometraje4}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje5'
                                    id='kilometraje5'
                                    onChange = {handle}
                                    name='kilometraje5'
                                    value = {data.kilometraje5}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje6'
                                    id='kilometraje6'
                                    onChange = {handle}
                                    name='kilometraje6'
                                    value = {data.kilometraje6}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje7'
                                    id='kilometraje7'
                                    onChange = {handle}
                                    name='kilometraje7'
                                    value = {data.kilometraje7}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje8'
                                    id='kilometraje8'
                                    onChange = {handle}
                                    name='kilometraje8'
                                    value = {data.kilometraje8}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje9'
                                    id='kilometraje9'
                                    onChange = {handle}
                                    name='kilometraje9'
                                    value = {data.kilometraje9}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='1kilometraje10'
                                    id='1kilometraje10'
                                    onChange = {handle}
                                    name='1kilometraje10'
                                    value = {data.kilometraje10}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje11'
                                    id='kilometraje11'
                                    onChange = {handle}
                                    name='kilometraje11'
                                    value = {data.kilometraje11}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='kilometraje12'
                                    id='kilometraje12'
                                    onChange = {handle}
                                    name='kilometraje12'
                                    value = {data.kilometraje12}
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    <MenuItem value={'reprogramado'} >Reprogramado</MenuItem>
                                    <MenuItem value={'realizado'} >Realizado</MenuItem>
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
                 <Button variant='contained' color='primary'  onClick={(e)=>submit(e)}>Aceptar</Button>
                </Box>
                <Box sx={{my:2}} >
                 <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                </Box>
                </Stack>
            </DialogActions>
    </div>
  )
}
