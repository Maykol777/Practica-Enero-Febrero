import { Dialog } from '@material-ui/core'
import { Button, IconButton, Tooltip } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import React, { useState, useEffect } from 'react'
import FormularioActualizar from './FormularioActualizar'
import axios from 'axios'
import NuevaMP from'./NuevaMP'
import ActualizarEstado from './ActualizarEstado'

const url = "http://localhost:8000/api/getPreventivaLast"

export default function OpenDialog({row, getEquipos}) {
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
                ?<NuevaMP row={row} getEquipos={getEquipos}  preventiva={preventiva} getPreventiva={getPreventiva} setOpen={setOpen} setCambioAct={setCambioAct}/>
                :<ActualizarEstado row={row} getEquipos={getEquipos} preventiva={preventiva} getPreventiva={getPreventiva} setOpen={setOpen}/>
            }
      
        </Dialog>
    </>
  )
}

