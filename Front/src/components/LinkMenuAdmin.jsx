import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import {Link as RouterLink, useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios';

const url = 'http://localhost:8000/api/getInstituciones'

export default function LinkMenuAdmin() {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ instituciones, setInstituciones ] = React.useState()
  const [ open, setOpen ] = React.useState(false)
  const [ openConvenio, setOpenConvenio ] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickConvenio = () => {
    setOpenConvenio(!openConvenio)
  }

  const getInstituciones = async () => {
    
    try{
      const res = await axios.get(url)
      setInstituciones(res.data.data)
    }catch(error){
      console.log(error)
      
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    getInstituciones()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <Box>
      <List>
        <ListItemButton component={RouterLink} to='/main/admin'>
          <ListItemIcon>
            <HomeRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary='Inicio'/>
        </ListItemButton>
        <ListItemButton onClick={handleClick} component={RouterLink} to='/main/admin/institucion'>
          <ListItemIcon>
            <LocalHospitalOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary='Instituciones'/>
          { open ? <ExpandLess/> : <ExpandMore/> }
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>

          {instituciones 
          ?instituciones.map(institucion => {
            return (
              <ListItemButton key={institucion.idInstitucion} href={`/main/admin/institucion/${institucion.idInstitucion}`}  sx={{ pl: 10 }}>
                <ListItemText primary={institucion.nombre}/>
              </ListItemButton>
          )}) 
          :<div></div>
          }

        </Collapse>
        <ListItemButton onClick={handleClickConvenio}>
          <ListItemIcon>
            <HandshakeIcon/>
          </ListItemIcon>
          <ListItemText primary='Convenios'/>
          { openConvenio ? <ExpandLess/> : <ExpandMore/> }
        </ListItemButton>
        <Collapse in={openConvenio} timeout='auto' unmountOnExit>
          {instituciones
          ?instituciones.map(institucion => {
            return (
              <ListItemButton key={institucion.idInstitucion} href={`/main/admin/convenio/${institucion.idInstitucion}`}  sx={{ pl: 10 }}>
                <ListItemText primary={institucion.nombre}/>
              </ListItemButton>
          )})
        :<div></div>}
        </Collapse>
        <ListItemButton component={RouterLink} to='/main/admin/usuario'>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary='Usuarios'/>
        </ListItemButton>
      </List>
    </Box>
  )
}
