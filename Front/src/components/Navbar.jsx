import { AppBar, Box, Button, Card, Divider, Drawer, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import React, { useState } from 'react'
import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';
import LinkMenu from './LinkMenu';
import Cookies from 'universal-cookie'
import LinkMenuAdmin from './LinkMenuAdmin';

const cookies = new Cookies()
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: '0px',
        ...(open && {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: '285px',
        }),
    }),
);


const Home = () => {
    return(
        <Card>
            <h1>Bienvenido</h1>
        </Card>
    )
}


function Navbar({ exportComponent: ExportComponent}) {
    const [ open, setOpen ] = useState(true)

    const logOut = () =>{
        cookies.remove('rut', {path:"/"});
        cookies.remove('idIntirucion', {path: "/"})
        cookies.remove('nombre', {path:"/"})
        window.location.href = '/';
    }

    const [anchorUser, setAnchorUser] = useState(null)

    const handleUserMenu = (e) =>{
        setAnchorUser(e.currentTarget)
    }

    const handleCloseUserMenu = () =>{
        setAnchorUser(null)
    }

    return (
        <Box>
            <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={open ? () => setOpen(false) : () => setOpen(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}/>
                    <Tooltip title="Cuenta de usuario ">
                        <Button size='large' color='inherit' startIcon={<AccountCircleOutlinedIcon/>} onClick={handleUserMenu}>
                            {cookies.get("nombre")}
                        </Button>
                    </Tooltip>
                    <Menu
                        sx={{mt:"45px"}}
                        id="menu-appbar"
                        anchorEl={anchorUser}
                        anchorOrigin = {{
                            vertical:'top',
                            horizontal:'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical:'top',
                            horizontal:'right'
                        }}
                        open={Boolean(anchorUser)}
                        onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={logOut}> Cerrar Sesión</MenuItem>
                        </Menu>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' variant='persistent' open={open} onClose={() => setOpen(false)}>
                <Toolbar/>
                <Stack sx={{ flexDirection: 'row'}}>
                    <Box sx={{ width: '15px', height: '15px', backgroundColor: 'white' }}/>
                    <Box sx={{ width: '80px', height: '15px', backgroundColor: '#004AAD' }}/>
                    <Box sx={{ width: '100px', height: '15px', backgroundColor: '#EF1D1D' }}/>
                </Stack>
                <Box m={2} mt={0.5} width='250px' textAlign={'left'} role='presentation'>
                    <Typography m={0} mr={10} sx={{ fontSize: 22}}>Servicio de Salud Arauco</Typography>
                    <Typography sx={{ fontSize: 14 }}>Region del Bio-Bio</Typography>
                    <Typography variant='overline'>Ministerio de Salud</Typography>
                </Box>
                <Divider/>
                {cookies.get("idInstitucion") == 0 ? <LinkMenuAdmin/> : <LinkMenu/>}
            </Drawer>
            <Toolbar/>
            <Main open={open}>
                <Outlet/>
            </Main>
        </Box>
    )
}

export default Navbar