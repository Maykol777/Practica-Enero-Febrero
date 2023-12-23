import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Card, Grid } from '@material-ui/core';
import EquipoMedico from './EquipoMedico';
import { Stack } from '@mui/material';
import Cookies from 'universal-cookie'
import EquipoIndustrial from './EquipoIndustrial';
import Ambulancias from './Ambulancias';
import axios from 'axios';
import { Divider, Typography } from '@mui/material';
import ProgresoMensual from './ProgresoMensual';

const cookies = new Cookies()

const urlPromedioEquipo= 'http://localhost:8000/api/getPreventivasPromedioTotalEquipoInstitucion/'
const urlPromedioVehiculo= 'http://localhost:8000/api/getPreventivasPromedioVehiculoInstitucion'
const urlEquipostotales = 'http://localhost:8000/api/getEquiposInstitucion/?id='
const urlEquiposCriticos = 'http://localhost:8000/api/getEquiposInstitucionCriticidad'
const urlEquiposBajavida = 'http://localhost:8000/api/getEquiposInstitucionBajaVidaUtil'
const urlMC = 'http://localhost:8000/api/getMantencionCorrectivasInstitucion'
const ulrMCcriticidad = 'http://localhost:8000/api/getMantencionCorrectivasCriticidadInstitucion'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    maxHeight:250,
    color: theme.palette.text.secondary,
  }));
export default function MainScreen(props){
    const [ promedioMedico, setpromedioMedico] = useState([])
    const [ promedioindustrial, setpromedioindustrial] = useState([])
    const [ promedioambulancia, setpromedioAmbulancia] = useState([])
    const [numeroEquipos, setNumeroEquipos] = useState([])
    const [numeroCriticos, setNumeroCriticos] = useState([])
    const [numerorelevante, setNumeroRelevantes] = useState([])
    const [numVida, setNumeroVida] = useState([])
    const [mCorrect, setMC] = useState([])
    const [mcCritico, setMCcritico] = useState([])
    const [mcRelevante, setMCrelevante] = useState([])

    const getInstitucion = async() =>{

        const respm = await axios.get(urlPromedioEquipo+"?tipo=medico"+"&id="+cookies.get("idInstitucion"))
        .then((respm)=>{
            const promedioMedico = respm.data
            setpromedioMedico(promedioMedico) 
        })
        .catch((error)=>{
            console.error(error)
            setpromedioMedico(0)
        })

        const respi = await axios.get(urlPromedioEquipo+"?tipo=industrial"+"&id="+cookies.get("idInstitucion"))
        .then((respi)=>{
            const promedioIndustrial = respi.data
            setpromedioindustrial(promedioIndustrial)
        })
        .catch((error)=>{
            console.error(error)
            setpromedioindustrial(0)
        })

        const respa = await axios.get(urlPromedioVehiculo + `?id=${cookies.get("idInstitucion")}`)
        .then((respa)=>{
            const promedioAmbulancia = respa.data
            setpromedioAmbulancia(promedioAmbulancia)
        })
        .catch((error)=>{
            console.log(error)
            setpromedioAmbulancia(0)
        })

        const numEquipo = await axios.get(urlEquipostotales+cookies.get('idInstitucion'))
        .then((numEquipo)=>{
            const info = numEquipo.data.data
            const numequipos = info.length
            setNumeroEquipos(numequipos)
        })
        .catch((error)=>{
            console.log(error)
            setNumeroEquipos(0)
        })

        const numCritico = await axios.get(urlEquiposCriticos+ "/?id=" + cookies.get('idInstitucion') + "&&tipo=critico")
        .then((numCritico)=>{
            const info = numCritico.data.data[0]
            setNumeroCriticos(info)
        })
        .catch((error)=>{
            console.log(error)
            setNumeroCriticos(0)
        })

        const numRelevante = await axios.get(urlEquiposCriticos+ "/?id=" + cookies.get('idInstitucion') + "&&tipo=relevante")
        .then((numRelevante)=>{
            const info = numRelevante.data.data[0]
            setNumeroRelevantes(info)
        })
        .catch((error)=>{
            console.log(error)
            setNumeroRelevantes(0)
        })

        const numVida = await axios.get(urlEquiposBajavida+ "/?id=" + cookies.get('idInstitucion'))
        .then((vida)=>{
            const info = vida.data.data[0]
            setNumeroVida(info)
        })
        .catch((error)=>{
            console.log(error)
            setNumeroVida(0)
        })

        const mc = await axios.get(urlMC+ "/?id=" + cookies.get('idInstitucion'))
        .then((mc)=>{
            const info = mc.data[0]
            setMC(info)
        })
        .catch((error)=>{
            console.log(error)
            setMC(0)
        })

        const critico = await axios.get(ulrMCcriticidad+ "/?id=" + cookies.get('idInstitucion') + "&&criticidad=critico")
        .then((critico)=>{
            const info = critico.data[0]
            setMCcritico(info)
        })
        .catch((error)=>{
            console.log(error)
            setMCcritico(0)
        })

        const relevante = await axios.get(ulrMCcriticidad+ "/?id=" + cookies.get('idInstitucion') + "&&criticidad=relevante")
        .then((relevante)=>{
            const info = relevante.data[0]
            setMCrelevante(info)
        })
        .catch((error)=>{
            console.log(error)
            setMCrelevante(0)
        })

    }
    useEffect(()=>{
        getInstitucion()
    }, [])

    return(
        <Box>
            <Card variant='outlined' sx={{ p: 2, m: 2 }}>
                <Stack direction={'row'} sx={{ml:5}}>
                    <h1> Bienvenido, {cookies.get("nombre")} </h1>
                </Stack>
            </Card>
            <Box sx={{mt:1}}>
                <Card variant='outlined' sx={{ p: 2}}>
                    <Stack direction={'row'} sx={{ml:5, minHeight:'35px'}} alignItems='center'>
                        <Typography variant = {'h5'}>Progreso Anual Mantenciones Preventivas</Typography>
                    </Stack>
                </Card>
            </Box>
            <Box sx={{ width: '100%', marginTop : 0.5}}>
                <Grid container spacing={1}>
                    <Grid item xs={3} >
                        <Item sx={{minHeight:'250px'}}>
                            <EquipoMedico promedioMedico={promedioMedico} />
                            <Stack alignItems={'flex-start'} justifyContent={'flex-start'} direction='column' divider={<Divider orientation='horizontal' flexItem/>}>

                            </Stack>
                        </Item>
                    </Grid>

                    <Grid item xs={3}>
                        <Item sx={{minHeight:'250px'}}>
                            <EquipoIndustrial promedioIndustrial={promedioindustrial}/>
                            <Stack alignItems={'flex-start'} justifyContent={'flex-start'} direction='column' divider={<Divider orientation='horizontal' flexItem/>}>

                            </Stack>
                        </Item>
                    </Grid>

                    <Grid item xs={3}>
                        <Item sx={{minHeight:'250px'}}>
                            <Ambulancias promedioAmbulancia={promedioambulancia}/>
                            <Stack alignItems={'flex-start'} justifyContent={'flex-start'} direction='column' divider={<Divider orientation='horizontal' flexItem/>}>

                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{minHeight:'250px'}}>
                            <ProgresoMensual/>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{minHeight:'190px'}}>
                            <Stack sx={{ml:5}} alignItems={'flex-start'}>
                                <Typography variant='h5'>Seguimiento</Typography>

                                    <Stack direction={'column'} sx={{ml:1, width:'300px'}} alignItems={'flex-start'} divider={<Divider orientation='horizontal' flexItem/>}>
                            
                                        <Stack direction={'row'} justifyContent={'space-between'} sx={{width:'295px'}} >
                                            <Stack><Typography variant='subtitle1'>Numero de Equipos</Typography></Stack>
                                            <Stack><Typography variant='subtitle1'>{numeroEquipos ?numeroEquipos :0}</Typography></Stack>
                                        </Stack>

                                        <Stack direction={'row'} justifyContent={'space-between'} sx={{width:'295px'}}>
                                            <Stack><Typography variant='subtitle1'>Equipos Críticos</Typography> </Stack>
                                            <Stack><Typography variant='subtitle1'>{numeroCriticos.total ?numeroCriticos.total :0}</Typography></Stack>
                                        </Stack>

                                        <Stack direction={'row'} justifyContent={'space-between'} sx={{width:'295px'}}>
                                            <Stack><Typography variant='subtitle1'>Equipos relevantes</Typography> </Stack>
                                            <Stack><Typography variant='subtitle1'>{numerorelevante.total ?numerorelevante.total :0}</Typography></Stack>
                                        </Stack>

                                        <Stack direction={'row'} justifyContent={'space-between'} sx={{width:'295px'}}>
                                            <Stack><Typography variant='subtitle1'>Equipos con baja vida útil</Typography> </Stack>
                                            <Stack><Typography variant='subtitle1'>{numVida.total ?numVida.total :0}</Typography></Stack></Stack>
                                    </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{minHeight:'190px'}}>
                            <Stack sx={{ml:5}} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                <Typography variant='h6'>Mantenciones Correctivas</Typography>

                                <Stack direction={'column'} sx={{ml:1, width:'300px'}} alignItems={'flex-start'} divider={<Divider orientation='horizontal' flexItem/>}>

                                    <Stack  direction={'row'} alignItems='center' justifyContent={'space-between'} sx={{width:'295px', ml:1}}>
                                        <Stack><Typography variant='subtitle1'>MC Realizadas</Typography></Stack>
                                        <Stack><Typography variant='subtitle1'>{mCorrect.mc ?mCorrect.mc :0 }</Typography></Stack> 
                                    </Stack>

                                    <Stack  direction={'row'} alignItems='center' justifyContent={'space-between'} sx={{width:'295px', ml:1}}>
                                        <Stack><Typography variant='subtitle1'>MC Equipos Críticos</Typography></Stack>
                                        <Stack><Typography variant='subtitle1'>{mcCritico.mcc ?mcCritico.mcc :0 }</Typography></Stack>
                                    </Stack>

                                    <Stack  direction={'row'} alignItems='center' justifyContent={'space-between'} sx={{width:'295px', ml:1}}>
                                        <Stack><Typography variant='subtitle1'>MC Equipos Relevantes</Typography></Stack>
                                        <Stack><Typography variant='subtitle1'>{mcRelevante.mcc ?mcRelevante.mcc :0 }</Typography></Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}