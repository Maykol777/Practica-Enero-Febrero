import { Box, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, Typography } from '@material-ui/core'
import { Button, Divider, Stack } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save'
import HistorialPreventiva from './HistorialPreventivas'
import PlanificacionMensualEquipo from './PlanificacionMensualEquipo'
import NuevaPlanificacionAnual from './NuevaPlanificacionAnual'

const url ='http://localhost:8000/api/updatePreventiva/'
export default function FormularioActualizar({row, getequipos, preventiva, getPreventiva, setOpen}) {    
    const handleClose=()=>{
        return setOpen(false)
    }
    const [data, setData] = useState({
        anoPr: preventiva.anoPr,
        enero: preventiva.enero,
        febrero: preventiva.febrero,
        marzo: preventiva.marzo,
        abril: preventiva.abril,
        mayo: preventiva.mayo,
        junio: preventiva.junio,
        julio: preventiva.julio,
        agosto: preventiva.agosto,
        septiembre: preventiva.septiembre,
        octubre: preventiva.octubre,
        noviembre: preventiva.noviembre,
        diciembre: preventiva.diciembre,
        idEquipo: preventiva.idEquipo,
        eliminado: preventiva.eliminado
    }) 

    const handle=(e)=>{
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        getPreventiva();
        setData(newdata)
        console.log(newdata)
    }

    const submit = (e) =>{
        e.preventDefault();
        axios.put(url + "?id=" + preventiva.idMantencion, {
            idEquipo: data.idEquipo,
            anoPr: data.anoPr,
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
            diciembre: data.diciembre
        })
        .then((res)=>{
            console.log(res.data)
            getPreventiva();
            handleClose();
        })
        }

  return (
    <div>
        <DialogTitle>Actualizar Planificación Mantenimiento Preventiva {data.anoPr}</DialogTitle>
            <DialogContent>
                <Box sx={{flexGrow:1}} >
                    <Stack direction='row' spacing={3}   justifyContent={'space-between'} alignItems={'stretch'}>
                        <Stack direction='column' spacing={0.9} sx={{maxWidth:'190px'}} divider={<Divider orientation="horizontal" flexItem/>}>
                            <Typography variant='body1' >
                                Resumen:
                            </Typography>
                            <Typography variant='body2' >
                                Serie: {row.serie}
                            </Typography>
                            <Typography variant='body2' >
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

                            <Stack direction ='row' justifyContent={'space-between'}>
                                <Box justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='body2'>
                                        Crear nueva MP
                                    </Typography>
                                    <NuevaPlanificacionAnual row={row} getequipos = {getequipos} getPreventiva ={getPreventiva} handleClose={handleClose}/>
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
                            <Box sx={{width:150}} >
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
                            <Box sx={{my:1}}>
                                <FormControl fullWidth >
                                <Select
                                    id="enero"
                                    value={data.enero}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='febrero'
                                    id='febrero'
                                    name='febrero'
                                    value = {data.febrero}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='marzo'
                                    id='marzo'
                                    value = {data.marzo}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='abril'
                                    id='abril'
                                    value = {data.abril}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='mayo'
                                    id='mayo'
                                    value = {data.mayo}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='junio'
                                    id='junio'
                                    value = {data.junio}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='julio'
                                    id='julio'
                                    value = {data.julio}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='agosto'
                                    id='agosto'
                                    value = {data.agosto}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='septiembre'
                                    id='septiembre'
                                    value = {data.septiembre}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='octubre'
                                    id='octubre'
                                    value = {data.octubre}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='noviembre'
                                    id='noviembre'
                                    value = {data.noviembre}
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
                                <FormControl fullWidth size='small'>
                                <Select
                                    labelId='diciembre'
                                    id='diciembre'
                                    onChange = {handle}
                                    name='diciembre'
                                    value = {data.diciembre}

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
