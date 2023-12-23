import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import { Button, Divider, FormLabel, Stack } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save'
import HistorialPreventiva from './HistorialPreventivas'
import PlanificacionMensualEquipo from './PlanificacionMensualEquipo'
import NuevaPlanificacionAnual from './NuevaPlanificacionAnual'
import DoneOutlineIcon from '@mui/icons-material/DoneAllOutlined'
import HistoryIcon from '@mui/icons-material/History'
import Swal from 'sweetalert2'
import Documentacion from './Documentacion'

const url ='http://localhost:8000/api/updatePreventiva/'
export default function ActualizarEstado({row, getequipos, preventiva, getPreventiva, setOpen}) {

    const handleClose=()=>{
        return setOpen(false)
    }

    const [openMini, setOpenMini] = useState(false)
    const handleCloseMini = () =>{setOpenMini(false)}

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
    })

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
        console.log(e.target.value)
        console.log(e.target.name)
        if(e.target.value !== 'programado'){
            setOpenMini(true)
        }
        getPreventiva();
        setData(newdata)
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
            diciembre: data.diciembre,
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
        <DialogTitle>Actualizar Planificación Mantenimiento Preventiva {data.anoPr}</DialogTitle>
            <DialogContent>
                <Box sx={{flexGrow:1}} >
                    <Stack direction='row' spacing={1}  justifyContent={'space-between'} alignItems={'stretch'} sx={{mx:'10px', mr:'20px'}}>
                        <Stack direction='column' spacing={0.9} sx={{width:250}} divider={<Divider orientation="horizontal" flexItem/>}>
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
                                <FormLabel>Enero</FormLabel>
                                <RadioGroup row id='enero' defaultValue={data.enero} name='enero' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'}  control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>}  control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Febrero</FormLabel>
                                    <RadioGroup row id='febrero' defaultValue={data.febrero} name='febrero' onChange={handle}>
                                        <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                            <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                            <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                            <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                        </Stack>
                                    </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Marzo</FormLabel>
                                <RadioGroup row id='marzo' defaultValue={data.marzo} name='marzo' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>
                            
                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Abril</FormLabel>
                                <RadioGroup row id='abril' defaultValue={data.abril} name='abril' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Mayo</FormLabel>
                                <RadioGroup row id='mayo' defaultValue={data.mayo} name='mayo' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Junio</FormLabel>
                                <RadioGroup row id='junio' defaultValue={data.junio} name='junio' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Julio</FormLabel>
                                <RadioGroup row id='julio' defaultValue={data.julio} name='julio' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Agosto</FormLabel>
                                <RadioGroup row id='agosto' defaultValue={data.agosto} name='agosto' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Septiembre</FormLabel>
                                <RadioGroup row id='septiembre' defaultValue={data.septiembre} name='septiembre' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Octubre</FormLabel>
                                <RadioGroup row id='octubre' defaultValue={data.octubre} name='octubre' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Noviembre</FormLabel>
                                <RadioGroup row id='noviembre' defaultValue={data.noviembre} name='noviembre' onChange={handle}>
                                    <Stack direction='row' sx={{mr:'40px'}} spacing={5.3}>
                                        <FormControlLabel value='programado' sx={{mx:'10px'}} labelPlacement='start' label={'P'} control ={<Radio size='small' />}/>
                                        <FormControlLabel value='realizado' labelPlacement='start' label={<DoneOutlineIcon/>} control={<Radio size='small'/>} />
                                        <FormControlLabel value='reprogramado' labelPlacement='start' label={<HistoryIcon/>} control={<Radio size='small'/>} />
                                    </Stack>
                                </RadioGroup> 
                            </Stack>

                            <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                                <FormLabel>Diciembre</FormLabel>
                                <RadioGroup row id='diciembre' defaultValue={data.diciembre} name='diciembre' onChange={handle}>
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
            <div>
            <Dialog
                open={openMini}
                onClose={handleCloseMini}
                fullWidth
                maxWidth={'xs'}
            >
                <Documentacion setOpenMini={setOpenMini} />
            </Dialog>
            </div>
    </div>
  )
}
