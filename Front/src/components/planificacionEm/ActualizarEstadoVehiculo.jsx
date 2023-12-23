import { Box, DialogActions, DialogContent, DialogTitle, FormLabel, Radio, RadioGroup, Select, Typography } from '@material-ui/core'
import {Button, Divider, FormControlLabel} from '@mui/material'
import { Dialog, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistorialPreventiva from './HistorialPreventivas'
import PlanificacionMensualEquipo from './PlanificacionMensualEquipo'
import NuevaPlanificacionAnualKm from './NuevaPlanificacionAnualKm'
import DoneOutlineIcon from '@mui/icons-material/DoneAllOutlined'
import HistoryIcon from '@mui/icons-material/History'
import SaveIcon from '@mui/icons-material/Save'
import Swal from 'sweetalert2'

const url ='http://localhost:8000/api/updatePreventivaVehiculo/'
export default function ActualizarEstadoVehiculo({row, getequipos, preventiva, getPreventiva, setOpen}) {
    const handleClose=()=>{
        return setOpen(false)
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
    })

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
            Toast.fire({
                icon: 'success',
                title:'Ficha actualizada',
            })
        })
        .catch((error)=>{
            console.error(error)
            handleClose();
            Toast.fire({
                icon: 'error',
                title:'Error al actualizar ficha',
            })
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
                    <Stack direction={'column'}sx={{ minWidth:'400px', height:'350px'}}>

                            <Stack direction='row' justifyContent={'flex-end'} alignItems={'flex-start'} sx= {{ml:'20px'}}spacing={3}>
                                <Stack direction='column' alignItems='center' justifyContent={'center'}>
                                    <Typography variant='subtitle2'>Programado</Typography>
                                 </Stack>

                                <Stack direction='column' alignItems='center' justifyContent={'center'}>
                                    <Typography variant='subtitle2'>Realizado</Typography>
                                </Stack>

                                <Stack direction='column' alignItems='center' justifyContent={'center'}>
                                    <Typography variant='subtitle2'>Reprogramado</Typography>
                                </Stack>   
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>10.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje1' defaultValue = {data.kilometraje1} name='kilometraje1' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>20.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje2' defaultValue = {data.kilometraje2} name='kilometraje2' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>
                            
                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>30.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje3' defaultValue = {data.kilometraje3} name='kilometraje3' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>
                            
                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>40.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje4' defaultValue = {data.kilometraje4} name='kilometraje4' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>50.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje5' defaultValue = {data.kilometraje5} name='kilometraje5' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>60.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje6' defaultValue = {data.kilometraje6} name='kilometraje6' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>70.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje7' defaultValue = {data.kilometraje7} name='kilometraje7' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>80.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje8' defaultValue = {data.kilometraje8} name='kilometraje8' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>90.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje9' defaultValue = {data.kilometraje9} name='kilometraje9' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>100.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje10' defaultValue = {data.kilometraje10} name='kilometraje10' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>110.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje11' defaultValue = {data.kilometraje11} name='kilometraje11' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} >
                                <FormLabel>120.000 Km</FormLabel>
                                <RadioGroup row id='kilometraje12' defaultValue = {data.kilometraje12} name='kilometraje12' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>
                        </Stack>
                    </Stack>

                </Box>
            </DialogContent>
            <DialogActions>
                <Stack direction={'row'} sx={{mx:2}} spacing={2}>
                <Box  >
                 <Button variant='contained' color='primary' startIcon={<SaveIcon/>} onClick={(e)=>submit(e)}>Guardar</Button>
                </Box>
                <Box  >
                 <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                </Box>
                </Stack>
            </DialogActions>
    </div>
  )
}
