import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import HandymanIcon from '@mui/icons-material/Handyman';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {Link as RouterLink } from 'react-router-dom'
import React from 'react'
import { useState } from 'react';

export default function LinkMenu() {
    const [ open, setOpen ] = useState(false)
    const [openMP, setOpenMP ] =useState(false)
    const [ openConvenio, setOpenConvenio ] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const handleClickMP = () =>{
        setOpenMP(!openMP)
    }

    const handleClickConvenio = () => {
        setOpenConvenio(!openConvenio)
    }

    return (
        <Box>
            <List>
                <ListItemButton component={RouterLink} to='/main'>
                    <ListItemIcon>
                        <HomeRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Inicio'/>
                </ListItemButton>

                {/*Lista de Equipos*/}

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <HomeRepairServiceRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Equipos'/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component={'div'} disablePadding>
                    <ListItemButton component={RouterLink} to='/main/create/medico' sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <MedicalServicesRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Equipo Medico'/>
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to='/main/create/industrial' sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <FactoryRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Equipo Industrial'/>
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to='/main/create/ambulancia' sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DirectionsCarFilledRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Ambulancias'/>
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Lista de planificaciones */}

                <ListItemButton component={RouterLink} to='/main/plan'>
                    <ListItemIcon>
                        <PostAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Planificación MP'/>
                </ListItemButton>
                <Collapse in={openMP} timeout='auto' unmountOnExit>
                    <List component={'div'} disablePadding>
                    <ListItemButton component={RouterLink} to='/main/plan/medicos' sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <MedicalServicesRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Equipo Medico'/>
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to='/main/create/industrial' sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <FactoryRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Equipo Industrial'/>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DirectionsCarFilledRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Ambulancias'/>
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Convenios */}

                <ListItemButton onClick={handleClickConvenio}>
                    <ListItemIcon>
                        <HandshakeRoundedIcon/>
                        </ListItemIcon>
                    <ListItemText primary='Convenios'/>
                    {openConvenio ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={openConvenio} timeout='auto' unmountOnExit>
                    <List component={'div'} disablePadding>
                    <ListItemButton component={RouterLink} to='/main/view/convenio' sx={{ pl: 8 }}>
                            <ListItemText primary='Lista de Convenios'/>
                        </ListItemButton>
                        <ListItemButton component={RouterLink} to='/main/create/convenio' sx={{ pl: 8 }}>
                            <ListItemText primary='Agregar Convenio'/>
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Mantencion correctiva */}

                <ListItemButton component={RouterLink} to='/main/create/mantencion/correctiva'>
                    <ListItemIcon>
                        <HandymanIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Mantención Correctiva'/>
                </ListItemButton>
            </List>
        </Box>
    )
}
