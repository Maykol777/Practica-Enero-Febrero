import { Box, Dialog, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import  SaveIcon  from '@mui/icons-material/Save'
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'


const url = 'http://localhost:8000/api/createEquipo'

const cookies = new Cookies()

const BotonColor = styled(Button)(({theme})=>({
    color: theme.palette.getContrastText("#2074d4"),
    backgroundColor: "#2074d4",
    '&:hover':{
        backgroundColor: '#2074d4'
    }
}))

export default function AgregarAmbulancia( {getAmbulancia} ) {
    const [open, setOpen] = useState(false);
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

    const handleOpen = () =>{
        setValues({
            tipoEquipo: "vehiculo",
            ubicacion: "",
            subUbicacion: "",
            clase: "",
            subclase: "",
            nombre: "",
            marca: "",
            modelo: "",
            serie: "",
            numeroInventario: "",
            valor: 0,
            ano: 0,
            vidaUtil: 0,
            propietario: "",
            estado: "",
            criticidad: "",
            garantia: 0,
            vencimientoGarantia: "1900/01/01",
            planMantencion: 1,
            normativa: "",
            cantidad: 0,
            carroceria: "",
            tipoAmbulancia: "",
            samu: 0,
            funcion: "",
            patente: "",
            numeroMotor: "",
            kilometraje:0,
            idInstitucion: cookies.get("idInstitucion"),
            idConvenio: 0
        })
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const [ values, setValues ] = useState({
        tipoEquipo: "vehiculo",
        ubicacion: "",
        subUbicacion: "",
        clase: "",
        subclase: "",
        nombre: "",
        marca: "",
        modelo: "",
        serie: "",
        numeroInventario: "",
        valor: 0,
        ano: 0,
        vidaUtil: 0,
        propietario: "",
        estado: "",
        criticidad: "",
        garantia: 0,
        vencimientoGarantia: "1900/01/01",
        planMantencion: 1,
        normativa: "",
        cantidad: 0,
        carroceria: "",
        tipoAmbulancia: "",
        samu: 0,
        funcion: "",
        patente: "",
        numeroMotor: "",
        kilometraje:0,
        idInstitucion: cookies.get("idInstitucion"),
        idConvenio: 0
    })

    const onSubmit = async (e) => {
        console.log(values)
        e.preventDefault()
        try {
            const response = await axios.post(url, values)
            console.log(response)
            getAmbulancia();
            handleClose();
            Toast.fire({
                icon: 'success',
                title:'Ficha actualizada',
            })
        } catch (error) {
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
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const handleChangeSelect = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <BotonColor variant='outlined' onClick={handleOpen} startIcon={<AddCircleOutlineIcon/>}>
                Agregar
            </BotonColor>
            
            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth
                maxWidth={'lg'}
                >
                <Box component={'form'} my={1}>
                    <Stack  sx={{ mt: 1, ml: 1 }}>
                        <Typography variant='h6'>Ingresar Ambulancia</Typography>
                        {showError ? <Typography variant='caption' color='error'>Ingrese datos del equipo</Typography> : null}
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='ubicacion' label='Establecimiento' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='carroceria' label='Tipo Carroceria' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='tipoAmbulancia' label='Tipo Ambulancia' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='clase' label='Clase de Ambulancia' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="samu">Samu</InputLabel>
                            <Select
                                labelId="samu"
                                id="samu"
                                value={values.samu}
                                label="Samu"
                                onChange={handleChangeSelect}
                                name='samu'
                            >
                                <MenuItem value={1}>Si</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id='funcion' label='Funcion' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='numeroInventario' label='N° Inventario' variant='outlined' size='small' type={'number'} fullWidth onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='marca' label='Marca' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='modelo' label='Modelo' variant='outlined' size='small' fullWidth onChange={handleChange}/>
                        <TextField id='patente' label='Patente' variant='outlined' size='small' fullWidth required onChange={handleChange}/>
                        <TextField id='numeroMotor' label='N° Motor' variant='outlined' size='small' fullWidth type={'number'} onChange={handleChange}/>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{ marginY: 2, marginX: 1 }}>
                        <TextField id='ano' label='Año de Adquisición' variant='outlined' size='small' fullWidth type={'number'} onChange={handleChange}/>
                        <TextField id='kilometraje' label='Kilometraje' variant='outlined' size='small' fullWidth type={'number'} onChange={handleChange}/>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="propiedad">Estado Situación</InputLabel>
                            <Select
                                labelId="propiedadE"
                                id="propietario"
                                value={values.propietario}
                                label="Estado Situacion"
                                onChange={handleChangeSelect}
                                name='propietario'
                            >
                                <MenuItem value={'Propio'}>Propio</MenuItem>
                                <MenuItem value={'Arriendo'}>Arriendo</MenuItem>
                                <MenuItem value={'Comodato'}>Comodato</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="estado">Estado de Conservación</InputLabel>
                            <Select
                                labelId="estado"
                                id="estado"
                                value={values.estado}
                                label="Estado de Conservación"
                                onChange={handleChangeSelect}
                                name='estado'
                            >
                                <MenuItem value={'Bueno'}>Bueno</MenuItem>
                                <MenuItem value={'Regular'}>Regular</MenuItem>
                                <MenuItem value={'Malo'}>Malo</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" justifyContent='flex-end' margin={1} spacing={2} sx={{my:1}}>
                        <BotonColor
                            variant='contained' 
                            type='submit' 
                            startIcon={<SaveIcon/>}
                            onClick={onSubmit}
                        >
                            Agregar
                        </BotonColor>
                        <Button
                            variant='contained' 
                            color='error'
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Dialog>
        </div>
    )
}
