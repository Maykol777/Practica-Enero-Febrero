import { Box, Card, createTheme, Stack, ThemeProvider, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import axios from 'axios'
import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import Carousel from 'react-grid-carousel'

const urlInstitucion = 'http://localhost:8000/api/getInstituciones'
const urlPromedioTotal = 'http://localhost:8000/api/getPreventivasPromedioTotalInstituciones'
const urlPromedioEquipo = 'http://localhost:8000/api/getPreventivasPromedioEquipoInstituciones'
const urlPromedioVehiculo = 'http://localhost:8000/api/getPreventivasPromedioVehiculoInstitucion'
const urlCorrectivaTotal = 'http://localhost:8000/api/getMantencionCorrectivasInstituciones'
const urlCorrectivaCritico = 'http://localhost:8000/api/getMantencionCorrectivasCriticoInstituciones'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const theme = createTheme({
  palette: {
    neutral: {
      main: 'rgba(0, 0, 0, 0.54)'
    }
  }
})

export default function InstitucionView() {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ institucionesInfo, setInstitucionesInfo ] = React.useState()

  const getInstituciones = async () => {
    let institucionesAux = []
    const res = await axios.get(urlInstitucion)
    const instituciones = res.data.data

    let promedioTotal
    try {
      const resmp = await axios.get(urlPromedioTotal)
      promedioTotal = resmp.data
    } catch (err) {
      console.log(err)
    }

    let promedioMedico
    try {
      const resmpm = await axios.get(urlPromedioEquipo + `?tipo=${'medico'}`)
      promedioMedico = resmpm.data
    } catch (err) {
      console.log(err)
    }

    let promedioIndustrial
    try {
      const resmpi = await axios.get(urlPromedioEquipo + `?tipo=${'industrial'}`)
      promedioIndustrial = resmpi.data
    } catch (err) {
      console.log(err)
    }

    let promedioVehiculo
    try {
      const resmpv = await axios.get(urlPromedioVehiculo + `?tipo=${'vehiculo'}`)
      promedioVehiculo = resmpv.data
    } catch (err) {
      console.log(err)
    }

    let correctiva
    try {
      const resc = await axios.get(urlCorrectivaTotal)
      correctiva = resc.data
    } catch (err) {
      console.log(err)
    }

    let correctivaCritico
    try {
      const rescc = await axios.get(urlCorrectivaCritico)
      correctivaCritico = rescc.data
    } catch (err) {
      console.log(err)
    }

    instituciones.map(institucion => {
      let aux = institucion
      if(promedioTotal) promedioTotal.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
        else aux = { ...aux }
      })
      if(promedioMedico) promedioMedico.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
      })
      if(promedioIndustrial) promedioIndustrial.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
      })
      if(promedioVehiculo) promedioVehiculo.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
      })
      if(correctiva) correctiva.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
      })
      if(correctivaCritico) correctivaCritico.map(total => {
        if(institucion.idInstitucion == total.idInstitucion) aux = { ...aux, ...total }
      })
      institucionesAux.push(aux)
    })
    setInstitucionesInfo(institucionesAux)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getInstituciones()
  }, [])

  if(isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <Carousel cols={3} rows={1} gap={15} loop>
      {institucionesInfo.map(institucion => (
        <Carousel.Item key={institucion.idInstitucion}>
          <Card sx={{ p: 2 }}>
            <Stack alignItems={'center'}>
              <Typography variant='h5'>{institucion.nombre}</Typography>
              <Typography variant='body1'>{institucion.ciudad}</Typography>
              <Stack my={1}>
                <Typography variant= 'body1'>Progreso de Mantenciones Anual</Typography>
              </Stack>
              <div style={{ width: 180, height: 180 }}>
                <CircularProgressbar value={institucion.promedio ? institucion.promedio : 0} text={institucion.promedio ? Math.round(institucion.promedio) : 'NoInfo'} strokeWidth={15} styles={buildStyles({
                  textColor: "rgba(0, 0, 0, 0.87)",
                  pathColor: "#1a90ff",
                  trailColor: "#eeeeee"
                })}/>
              </div>
              <ThemeProvider theme={theme}>
                <Stack direction={'row'} sx={{ m: 1 }}>
                  <MedicalServicesRoundedIcon color='neutral'/>
                  <Box sx={{ width: '180px', m: 0.7 }}>
                    <BorderLinearProgress variant='determinate' value={institucion.medico ? institucion.medico : 0}/>
                  </Box>
                  <Typography variant='body1' style={{ height: 20, borderRadius: 10 }}>{institucion.medico ? Math.round(institucion.medico) : 0}%</Typography>
                </Stack>
                <Stack direction={'row'} sx={{ m: 1 }}>
                  <FactoryRoundedIcon color='neutral'/>
                  <Box sx={{ width: '180px', m: 0.7 }}>
                    <BorderLinearProgress variant='determinate' value={institucion.industrial ? institucion.industrial : 0}/>
                  </Box>
                  <Typography variant='body1' style={{ height: 20, borderRadius: 10 }}>{institucion.industrial ? Math.round(institucion.industrial) : 0}%</Typography>
                </Stack>
                <Stack direction={'row'} sx={{ m: 1 }}>
                  <DirectionsCarFilledRoundedIcon color='neutral'/>
                  <Box sx={{ width: '180px', m: 0.7 }}>
                    <BorderLinearProgress variant='determinate' value={institucion.vehiculo ? institucion.vehiculo : 0}/>
                  </Box>
                  <Typography variant='body1' style={{ height: 20, borderRadius: 10 }}>{institucion.vehiculo ? Math.round(institucion.vehiculo) : 0}%</Typography>
                </Stack>
              </ThemeProvider>
              <Typography>MC total: {institucion.mc ? institucion.mc : 0}</Typography>
              <Typography>MC equipos criticos: {institucion.mcc ? institucion.mcc : 0}</Typography>
            </Stack>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
