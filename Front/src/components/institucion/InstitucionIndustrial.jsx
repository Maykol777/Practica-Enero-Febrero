import React from 'react'
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, IconButton, Stack, Paper, TextField, Typography, Dialog } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import DataTable from 'react-data-table-component';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InstitucionMantenciones from './InstitucionMantenciones';

const urlEquipo = 'http://localhost:8000/api/getEquiposInstitucionTipo'
const urlProgresoActual = 'http://localhost:8000/api/getPreventivasPromedioActualEquipoInstitucion'
const urlProgresoAnual = 'http://localhost:8000/api/getPreventivasPromedioTotalEquipoInstitucion'
const urlCriticidadActual = 'http://localhost:8000/api/getPreventivasPromedioActualEquipoInstitucionCriticidad'
const urlCriticidadAnual = 'http://localhost:8000/api/getPreventivasPromedioTotalEquipoInstitucionCriticidad'
const urlBajaVidaUtil = 'http://localhost:8000/api/getEquiposInstitucionBajaVidaUtilTipo'
const urlMC = 'http://localhost:8000/api/getMantencionCorrectivasEquipoInstitucion'
const urlMCC = 'http://localhost:8000/api/getMantencionCorrectivasCriticidadEquipoInstitucion'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 22,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

export default function InstitucionIndustrial(tipo) {
    const [ isLoading, setIsLoading ] = React.useState(true)
    let params = useParams()
    const [ idAux, setIdAux ] = React.useState(null)
    const [ open, setOpen ] = React.useState(false)
    const fecha = new Date();
    const mesActual = fecha.getMonth()
    const anoActual = fecha.getFullYear()
    const [ equipos, setEquipos ] = React.useState()
    const [ progresoActual, setProgresoActual ] = React.useState(null)
    const [ progresoAnual, setProgresoAnual ] = React.useState(null)
    const [ criticoActual, setCriticoActual ] = React.useState(null)
    const [ criticoAnual, setCriticoAnual ] = React.useState(null)
    const [ relevanteActual, setRelevanteActual ] = React.useState(null)
    const [ relevanteAnual, setRelevanteAnual ] = React.useState(null)
    const [ bajaVidaUtil, setBajaVidaUtil ] = React.useState(null)
    const [ mc, setMC ] = React.useState(null)
    const [ mcc, setMCC ] = React.useState(null)
    const [ mcr, setMCR ] = React.useState(null)

    const getInfo = async () => {
        try {
            const rese = await axios.get(urlEquipo + `?id=${params.id}&tipo=${tipo.tipo}`)
            setEquipos(rese.data.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const respm = await axios.get(urlProgresoActual + `?id=${params.id}&tipo=${tipo.tipo}`)
            setProgresoActual(respm.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const respa = await axios.get(urlProgresoAnual + `?id=${params.id}&tipo=${tipo.tipo}`)
            setProgresoAnual(respa.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const rescm = await axios.get(urlCriticidadActual + `?id=${params.id}&criticidad=critico&tipo=${tipo.tipo}`)
            setCriticoActual(rescm.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resca = await axios.get(urlCriticidadAnual + `?id=${params.id}&criticidad=critico&tipo=${tipo.tipo}`)
            setCriticoAnual(resca.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resrm = await axios.get(urlCriticidadActual + `?id=${params.id}&criticidad=relevante&tipo=${tipo.tipo}`)
            setRelevanteActual(resrm.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resra = await axios.get(urlCriticidadAnual + `?id=${params.id}&criticidad=relevante&tipo=${tipo.tipo}`)
            setRelevanteAnual(resra.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resbvu = await axios.get(urlBajaVidaUtil + `?id=${params.id}&tipo=${tipo.tipo}`)
            setBajaVidaUtil(resbvu.data.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resmc = await axios.get(urlMC + `?id=${params.id}&tipo=${tipo.tipo}`)
            setMC(resmc.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resmcc = await axios.get(urlMCC + `?id=${params.id}&tipo=${tipo.tipo}&criticidad=critico`)
            setMCC(resmcc.data)
        } catch (err) {
            console.log(err)
        }
        try {
            const resmcr = await axios.get(urlMCC + `?id=${params.id}&tipo=${tipo.tipo}&criticidad=relevante`)
            setMCR(resmcr.data)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const columns = [
        { name: 'Ver', width: '40px', button: true, cell: (row) => <IconButton size='small' color='neutral' onClick={(e) => handleMantencion(e, row.idEquipo)}><InfoIcon/></IconButton> },
        { name: 'Nombre recinto', selector: row=>row.ubicacion, minWidth:'150px', compact:true, sortable : true, grow: 1 },
        { name: 'Ubicacion', selector: row=>row.subUbicacion, sortable : true, grow: 1 },
        { name: 'Clase', selector: row=>row.clase, minWidth:'150px', compact:true, sortable : true },
        { name: 'SubClase', selector: row=>row.subclase,minWidth:'100px', compact:true, sortable : true },
        { name: 'Nombre', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Marca', selector: row=>row.marca, minWidth:'100px', compact:true, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, minWidth:'100px', compact:true, sortable : true },
        { name: 'Cantidad', selector: row=>row.cantidad, sortable : true, compact: true, center:true},
        { name: 'Estado', selector: row=>row.estado, sortable : true },
        { name: 'Normativa', selector: row=>row.normativa, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', sortable : true, center: true, compact: true },
        { name: 'Vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true, center: true, compact: true },
    ]

    const handleMantencion = (e, id) => {
        e.preventDefault()
        setIdAux(id)
        setOpen(true)
    }

    const handleClose = () => {
        setIdAux(null)
        setOpen(false)
    }

    React.useEffect(() => {
        getInfo()
    }, [])

    if(isLoading) {
        return (
            <div>Cargando...</div>
        )
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose} maxWidth='xl'>
                <InstitucionMantenciones id={idAux} setOpen={setOpen}/>
            </Dialog>
            <Grid container direction='row' sx={{ ml:1}} >
                <Grid Item xs={4}>
                    <Card sx={{ height:'210px'}} variant='outlined'>
                        <Stack alignItems={'center'}>
                            <Typography variant='h5' sx={{my:1}}>Equipos Industriales</Typography>
                            <Stack direction='row' sx = {{ width:'250px', mr:1}} >
                                <Stack sx={{m:1}} alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant = 'h6'>Mensual</Typography>
                                    <CircularProgressbar
                                        value={progresoActual.promedio ? progresoActual.promedio : 0}
                                        text={progresoActual.promedio ? `${Math.round(progresoActual.promedio)}%`: 'NoInfo'}
                                        strokeWidth={15}
                                        styles={buildStyles({
                                            textColor: "rgba(0, 0, 0, 0.87)",
                                            pathColor: "#1a90ff",
                                            trailColor: "#eeeeee"
                                        })}/>
                                </Stack>
                                <Stack sx={{m:1}} alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant='h6'>Anual</Typography>
                                    <CircularProgressbar
                                        value={progresoAnual.promedio ? progresoAnual.promedio : 0}
                                        text={progresoAnual.promedio ? `${Math.round(progresoAnual.promedio)}%`: 'NoInfo'}
                                        strokeWidth={15}
                                        styles={buildStyles({
                                            textColor: "rgba(0, 0, 0, 0.87)",
                                            pathColor: "#1a90ff",
                                            trailColor: "#eeeeee"
                                        })}/>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
                <Grid Item xs={8}>
                    <Card sx={{ml:1,mr:2, height:'210px'}}  variant='outlined'>
                        <Stack sx={{m:1}}>
                            <Stack><Typography variant='h5'> Progreso </Typography></Stack>
                            <Stack direction='row' justifyContent='flex-start' >
                                <Stack direction='column' sx={{mt:3.5}}>
                                    <Typography variant='h6'>Criticos</Typography>
                                    <Typography variant='h6'>Relevantes</Typography>
                                </Stack>
                                <Stack direction='column' justifyContent='baseline' alignItems='center' sx={{ml:5}}>
                                    <Typography variant='h6'>Mensual</Typography>
                                    <Stack direction={'row'}>
                                        <Box sx={{width:'130px'}}>
                                            <BorderLinearProgress
                                                variant='determinate'
                                                value={criticoActual.promedio ? criticoActual.promedio : 0}
                                                />
                                        </Box>
                                        <Typography variant='body1' style={{ height: 20, borderRadius: 10 }} sx={{ ml: 1 }}>
                                            {criticoActual.promedio ? Math.round(criticoActual.promedio) : 0}%
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Box sx={{ width: '130px', mt: 1.5 }}>
                                            <BorderLinearProgress
                                                variant='determinate'
                                                value={relevanteActual.promedio ? relevanteActual.promedio : 0}
                                                />
                                        </Box>
                                        <Typography variant='body1' style={{ height: 20, borderRadius: 10 }} sx={{ ml: 1, mt: 1.5 }}>
                                            {relevanteActual.promedio ? Math.round(relevanteActual.promedio) : 0}%
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='column' justifyContent='baseline' alignItems='center' sx={{ml:5}} >
                                    <Typography variant='h6'>Anual</Typography>
                                    <Stack direction={'row'}>
                                        <Box sx={{width:'130px'}}>
                                            <BorderLinearProgress
                                                variant='determinate'
                                                value={criticoAnual.promedio ? criticoAnual.promedio : 0}
                                                />
                                        </Box>
                                        <Typography variant='body1' style={{ height: 20, borderRadius: 10 }} sx={{ ml: 1 }}>
                                            {criticoAnual.promedio ? Math.round(criticoAnual.promedio) : 0}%
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Box sx={{ width: '130px', mt: 1.5 }}>
                                            <BorderLinearProgress
                                                variant='determinate'
                                                value={relevanteAnual.promedio ? relevanteAnual.promedio : 0}
                                                />
                                        </Box>
                                        <Typography variant='body1' style={{ height: 20, borderRadius: 10 }} sx={{ ml: 1, mt: 1.5 }}>
                                            {relevanteAnual.promedio ? Math.round(relevanteAnual.promedio) : 0}%
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack direction='row' justifyContent={'space-between'} sx={{mt:1}}>
                                <Typography variant = 'subtitle2'>MC: {mc[0].mc}</Typography>
                                <Typography variant = 'subtitle2'>MC criticos: {mcc[0].mcc}</Typography>
                                <Typography variant = 'subtitle2' sx={{ mr: 8 }}>MC relevante: {mcr[0].mcc}</Typography>
                            </Stack>
                            <Stack direction='row' alignItems={'center'}>
                                <Typography>Equipos con baja vida útil: {bajaVidaUtil[0].total}</Typography>
                                <IconButton>
                                    <InfoIcon/>
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>

            {/* DataTable */}
            <Stack sx={{m:1}}>
                <Paper variant='outlined'>
                    <TextField
                    size='small'
                    placeholder={"Buscar por Nombre"}
                    sx={{m:1}}
                    InputProps={{
                        endAdornment:(
                        <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>
                        )
                    }}
                    />
                    <Stack sx={{ ml: 1.5 }}>
                        <DataTable
                            columns={columns}
                            data={equipos}
                            direction = "auto"
                            pagination
                            fixedHeader
                            responsive
                            dense
                            noDataComponent={<Typography variant="h5" component="h2" sx={{my:2}} > No existen datos disponibles </Typography>}
                            paginationComponentOptions = {paginationComponentOptions}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}
