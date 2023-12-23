import { Box, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import {Button, Divider} from '@mui/material'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save'
import HistorialPreventiva from './HistorialPreventivas'
import Swal from 'sweetalert2'

const url = "http://localhost:8000/api/createPreventiva"
export default function NuevaMP({row, getequipos, preventiva, getPreventiva, setOpen, setCambioAct}) {
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
        anoPr: anoActual,
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
        idEquipo: row.idEquipo
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
            anoPr: anoActual,
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
            console.log(error.response.status)
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
                    <Stack direction='row' spacing={3}  justifyContent={'space-between'} alignItems={'stretch'} >
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
                            <HistorialPreventiva row={row} getequipos= {getequipos} preventiva ={preventiva} getPreventiva={getPreventiva}/>
                        </Box>
                        
                    </Stack>
                    <Divider orintation='vertical' flexItem/>
                        <Stack direction='column' spacing={1.05} sx={{maxWidth:'150px'}} >
                            <Box sx={{width:150}}  >
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
                        <Stack spacing={0.8} sx={{minWidth : '150px'}}>
                            <Box sx={{my:3}}>
                                <FormControl fullWidth >
                                <Select
                                    id="enero"
                                    defaultValue={""}
                                    onChange={handle}
                                    name='enero'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='febrero'
                                    id='febrero'
                                    name='febrero'
                                    defaultValue={""}
                                    onChange = {handle}
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='marzo'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='abril'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='mayo'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='junio'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='julio'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='agosto'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='septiembre'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='octubre'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='noviembre'
                                    fullWidth
                                >
                                    <MenuItem value={'programado'}>Programado</MenuItem>
                                    
                                    <MenuItem value={''}>-</MenuItem>
                                </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='demo-dialog-select-label'
                                    id='demo-dialog-select'
                                    defaultValue={""}
                                    onChange = {handle}
                                    name='diciembre'
                                    fullWidth
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
                <Stack direction={'row'} sx={{mx:2}} spacing={2}>
                <Box  >
                 <Button variant='contained' color='primary' startIcon={<SaveIcon/>} onClick={(e)=>submit(e)}>Guardar</Button>
                </Box>
                <Box  >
                 <Button variant='contained' color='error' onClick={close}>Cancelar</Button>
                </Box>
                </Stack>
            </DialogActions>
    </div>
  )
}
