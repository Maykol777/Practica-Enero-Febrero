import { Box, Dialog, Divider, makeStyles, Paper,  TextField, Typography } from '@material-ui/core'
import Button from '@mui/material/Button'
import { Stack } from '@mui/system'
import { styled } from '@mui/material/styles'
import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline'
import  SaveIcon  from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import Cookies from 'universal-cookie';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import Swal from 'sweetalert2'

const url = "http://localhost:8000/api/createEquipo"


const cookies = new Cookies()

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2500,
})

const BotonColor = styled(Button)(({theme})=>({
    color: theme.palette.getContrastText("#2074d4"),
    backgroundColor: "#2074d4",
    '&:hover':{
        backgroundColor: '#2074d4'
    }
}))
export default function EditarEquipo({row, equipos, getEquipos}) {
    const [open, setOpen] = useState(false);
    const [showError, setShowError] = useState(false)
    
    
    const showFalse =()=>{
        setShowError(false)
    }

    const handleOpen = () =>{
        setData({
            tipoEquipo: "medico",
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

    const [data, setData] = useState({
        tipoEquipo: "medico",
        ubicacion: row.ubicacion,
        subUbicacion: row.subUbicacion,
        clase: row.clase,
        subclase: row.subclase,
        nombre: row.nombre,
        marca: row.marca,
        modelo: row.modelo,
        serie: row.serie,
        numeroInventario: row.numeroInventario,
        valor: row.valor,
        ano: row.ano,
        vidaUtil: row.vidaUtil,
        propietario: row.propietario,
        estado: row.estado,
        criticidad: row.criticidad,
        garantia: row.garantia,
        vencimientoGarantia: row.vencimientoGarantia,
        planMantencion: row.planMantencion,
        normativa: row.normativa,
        cantidad: row.cantidad,
        carroceria: row.carroceria ,
        tipoAmbulancia: row.tipoAmbulancia,
        samu: row.samu,
        funcion: row.funcion,
        patente: row.patente,
        numeroMotor: row.numeroMotor,
        kilometraje:row.kilometraje,
        idInstitucion: cookies.get("idInstitucion"),
        idConvenio: row.convenio
      })
  
      const handle=(e)=>{
          const newdata = {...data}
          newdata[e.target.name] = e.target.value
          console.log(newdata)
          setData(newdata)
      }
      const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(url, data)
            console.log(response)
            getEquipos();
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
                handleClose()
                Toast.fire({
                    icon: 'error',
                    title:'Error al actualizar ficha',
                })
            }
        }
    }
    
  return (
    <div>
        
        <IconButton color='primary' onClick={handleOpen}>
            <EditIcon/>
        </IconButton>
        
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth={'lg'}
            >
            <Box 
                my={1}
                component = "form"
                onSubmit={(e) => submit(e)}
                >
                <Paper 
                    variant='outlined'
                >
                <Stack sx={{mt:1, ml:1}}>
                    <Typography variant = "h6">
                        Ingresar Equipo Medico 
                    </Typography>
                    {showError ? <Typography variant='caption' color='error'>Ingrese datos del equipo</Typography> : null}
                </Stack>
                <Stack 
                    direction="row"
                    spacing={2}
                    sx = {{marginY:2, marginX:1}}
                >
                    <TextField
                        id = "ubicacion"
                        name='ubicacion'
                        type = "text"
                        label = "Servicio Clínico"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        defaultValue={row.ubicacion}
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "clase"
                        name='clase'
                        type = "text"
                        label = "Clase"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "subclase"
                        name='subclase'
                        type = "text"
                        label = "SubClase"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                </Stack>
                <Stack 
                    direction="row"
                    spacing={2}
                    sx = {{marginY:2, marginX:1}}
                >
                    <TextField
                        id = "nombre"
                        name='nombre'
                        type = "text"
                        label = "Nombre de Equipo"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "marca"
                        name='marca'
                        type = "text"
                        label = "Marca"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "modelo"
                        name='modelo'
                        type = "text"
                        label = "Modelo"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                </Stack>
                <Stack 
                    direction="row"
                    spacing={2}
                    sx = {{marginY:2, marginX:1}}
                >
                    <TextField
                        id = "serie"
                        name='serie'
                        type = "text"
                        label = "Serie"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "numeroInventario"
                        name='numeroInventario'
                        type = "number"
                        label = "N° de inventario"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "ano"
                        name='ano'
                        type = "number"
                        label = "Año de Adquisición"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "vidaUtil"
                        name='vidaUtil'
                        type = "number"
                        label = "Vida Útil"
                        variant='outlined'
                        size = 'small'
                        fullWidth
                        
                        onChange={(e)=>handle(e)} 
                    />
                    <TextField
                        id = "propietario"
                        type = "text"
                        label = "Propietario"
                        variant='outlined'
                        size = 'small'
                        name='propietario'
                        fullWidth
                        
                        onChange={(e)=>handle(e)} 
                    />
                </Stack>
                <Stack 
                    direction="row"
                    spacing={2}
                    sx = {{marginY:2, marginX:1, mb:2}}
                >
                    <TextField
                        id = "vencimientoGarantia"
                        name='vencimientoGarantia'
                        type = "date"
                        variant='outlined'
                        size = 'small'
                        label ='Vencimiento de garantía'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e)=>handle(e)} 
                    />

                    <FormControl variant='outlined' size='small' fullWidth>
                        <InputLabel id='estado'>Estado</InputLabel>
                        <Select
                            labelId="estado"
                            id="estado"
                            value={data.estado}
                            name='estado'
                            fullWidth
                            label='estado'
                            onChange={(e)=>handle(e)}
                        >
                            <MenuItem value={'Bueno'}>Bueno</MenuItem>
                            <MenuItem value={'Regular'}>Regular</MenuItem>
                            <MenuItem value={'Malo'}>Malo</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant='outlined' size='small' fullWidth>
                        <InputLabel>Criticidad</InputLabel>
                        <Select
                            labelId="criticidad"
                            id="criticidad"
                            value={data.criticidad}
                            name='criticidad'
                            label='outlined'
                            onChange={(e)=>handle(e)}
                        >
                            <MenuItem value={'critico'}>Critico</MenuItem>
                            <MenuItem value={'relevante'}>Relevante</MenuItem>
                            <MenuItem value={'noaplica'}>No Aplica</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
                <Stack direction="row" justifyContent='flex-end' margin={1} spacing={2} sx={{my:1}}>
                    <BotonColor
                        variant='contained'
                        type = 'submit'
                        startIcon={<SaveIcon/>}
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
                
                
                </Paper>
                
            </Box>
        </Dialog>
    </div>
  )
}
