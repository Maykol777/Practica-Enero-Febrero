import { Dialog } from '@material-ui/core'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import NuevaMPKm from './NuevaMPKm'
import FormularioActualizarVehiculo from './FormularioActualizarVehiculo'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import ActualizarEstadoVehiculo from './ActualizarEstadoVehiculo'

const url = "http://localhost:8000/api/getPreventivaVehiculoLast"
export default function OpenDialogVehiculo({row, getequipos}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const [preventiva, setPreventiva] = useState([])
    const [cambioAct, setCambioAct] = useState(true);

    const getPreventiva =  () =>{
        axios.get(url+"?id="+row.idEquipo)
        .then(res=>{
            setPreventiva(res.data.data[0])
        })
        .catch((error)=>{        
            setCambioAct(false)
        })
    }
    useEffect(()=>{
        getPreventiva()
    }, [])
  
    const abrir=()=>{
        console.log(row)
        getPreventiva();
        handleOpen();
    }
 
  return (
    <>
        <Tooltip title='Actualizar Mantención' placement='right-end'>
        <IconButton
            onClick={abrir}
            variant= 'contained'
            size = 'small'
            sx={{color:'white'}}
        >
            <PlaylistAddIcon sx={{width:'17px', height:'20px'}}/>
        </IconButton>
        </Tooltip>

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={!cambioAct ? 'sm' : 'md'}
        >
            {
                !cambioAct 
                ?<NuevaMPKm row={row} getequipos={getequipos} getPreventiva={getPreventiva} setOpen={setOpen} setCambioAct={setCambioAct}/>
                :<ActualizarEstadoVehiculo row={row} getequipos={getequipos} preventiva={preventiva} getPreventiva={getPreventiva} setOpen={setOpen} />
            }
      
        </Dialog>
    </>
  )
}
