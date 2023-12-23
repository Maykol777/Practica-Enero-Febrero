import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import {Stack} from '@mui/material'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const url = "http://localhost:8000/api/getPreventivasPromedioMesInstitucionEquipo"
const urlV = "http://localhost:8000/api/getPreventivasPromedioMesInstitucionVehiculo"
export default function ProgresoMensual() {
    const [dataMedico, setDataMedico] = useState([])
    const [dataIndustrial, setDataIndustrial] = useState([])
    const [dataAmbulancia, setDataAmbulancia] = useState([])

    const fecha = new Date();
    const mesActual = fecha.getMonth()

    const getMesPromedio = async()=>{
        const mesMedico = await axios.get(url+"/?id="+cookies.get("idInstitucion")+"&&mes="+mesActual+"&&tipo=medico")
        .then((mesMedico)=>{
            const mesEquipo = mesMedico.data
            setDataMedico(mesEquipo)                
        })
        .catch((error)=>{
            console.error(error)
            setDataMedico(0)
        })

        const mesIndustrial = await axios.get(url+"/?id="+cookies.get("idInstitucion")+"&&mes="+mesActual+"&&tipo=industrial")
        .then((mesIndustrial)=>{
            const mesEquipo = mesIndustrial.data
            console.log(mesEquipo)
            setDataIndustrial(mesEquipo)                
        })
        .catch((error)=>{
            console.error(error)
            setDataIndustrial(0)
        })

        const mesAmbulancia = await axios.get(urlV+"/?id="+cookies.get("idInstitucion")+"&&mes="+mesActual)
        .then((mesAmbulancia)=>{
            const mesEquipo = mesAmbulancia.data
            setDataAmbulancia(mesEquipo)                
        })
        .catch((error)=>{
            console.error(error)
            setDataAmbulancia(0)
        })
    }
    useEffect(()=>{
        getMesPromedio()
    },[])

    const mesNombre=()=>{
        if(mesActual === 1) return 'Enero'
        if(mesActual === 2) return 'Febrero'
        if(mesActual === 3) return 'Marzo'
        if(mesActual === 4) return 'Abril'
        if(mesActual === 5) return 'Mayo'
        if(mesActual === 6) return 'Junio'
        if(mesActual === 7) return 'Julio'
        if(mesActual === 8) return 'Agosto'
        if(mesActual === 9) return 'Septiembre'
        if(mesActual === 10) return 'Octubre'
        if(mesActual === 11) return 'Noviembre'
        if(mesActual === 12) return 'Diciembre'
    }

  return (
    <div>
        <Box >
            <Stack justifyContent={'flex-start'} alignItems={'flex-start'} sx={{mb:2}}>
                <Typography>Progreso Mensual</Typography>
                <Typography>{mesNombre()}</Typography>
            </Stack>
            
            <Stack direction='column' justifyContent={'flex-start'} alignItems={'space-between'} spacing={1}>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                    <div style={{maxWidth:'50px'}}>
                        <CircularProgressbarWithChildren
                            value={dataMedico.promedio ?Math.round(dataMedico.promedio) :0}
                            text={(dataMedico.promedio ?Math.round(dataMedico.promedio) :0)+'%'}
                            strokeWidth={20}
                            styles={buildStyles({
                                textColor: "rgba(0, 0, 0, 0.87)",
                                pathColor: "#1a90ff",
                                trailColor: "#eeeeee"
                            })}
                            />
                    </div>
                    <Typography>Equipo Medico</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                    <div style={{maxWidth:'50px'}}>
                        <CircularProgressbarWithChildren
                            value={dataIndustrial.promedio ?Math.round(dataIndustrial.promedio) :0}
                            text={(dataIndustrial.promedio ?Math.round(dataIndustrial.promedio) :0)+'%'}
                            strokeWidth={20}
                            styles={buildStyles({
                                textColor: "rgba(0, 0, 0, 0.87)",
                                pathColor: "#1a90ff",
                                trailColor: "#eeeeee"
                            })}
                            />
                    </div>
                    <Typography>Equipo Industrial</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                    <div style={{maxWidth:'50px'}}>
                        <CircularProgressbarWithChildren
                            value={dataAmbulancia.promedio ?Math.round(dataAmbulancia.promedio) :0}
                            text={(dataAmbulancia.promedio ?Math.round(dataAmbulancia.promedio) :0)+'%'}
                            strokeWidth={20}
                            styles={buildStyles({
                                textColor: "rgba(0, 0, 0, 0.87)",
                                pathColor: "#1a90ff",
                                trailColor: "#eeeeee"
                            })}
                            />
                    </div>
                    <Typography>Vehículos</Typography>
                </Stack>
            </Stack>
        </Box>
    </div>
  )
}
