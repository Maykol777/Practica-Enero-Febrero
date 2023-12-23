import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Toolbar} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import { VisibilityOff } from '@mui/icons-material'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'


const cookies = new Cookies()
const url = "http://localhost:8000/api/login"
const urlInstituciones = 'http://localhost:8000/api/getInstituciones'

const BotonColor = styled(Button)(({theme})=>({
    color: theme.palette.getContrastText("#2074d4"),
    backgroundColor: "#2074d4",
    '&:hover':{
        backgroundColor: '#2074d4'
    }
}))


export const LoginScreen = () => {

    const [error, setError] = useState(false);
    const [ instituciones, setInstituciones ] = React.useState()
    const navigate = useNavigate()
    const[showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword((show)=>!show)

    const[data, setData] = useState({
        rut:"",
        clave:""

    })
    const handle=(e)=>{
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const getInstituciones = async () => {
        try {
            const res = await axios.get(urlInstituciones)
            setInstituciones(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getInstituciones()
    }, [])

    const submit =  (e) =>{
        e.preventDefault()
        axios.post(url, {rut:data.rut, clave:data.clave})
        .then(response=>{
            console.log(response.data.data.length)
            if(response.data.data.length>0){
                var resp = response.data.data[0]
                cookies.set('rut', resp.rut ,{path:"/"});
                cookies.set('idInstitucion',resp.idInstitucion, {path: "/"})
                cookies.set('nombre', resp.nombre, {path:"/"})
                if(resp.idInstitucion == 0) window.location.href = "./main/admin"
                else window.location.href = "./main"
            }else{
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
            }
        })
        .catch(error=>{
        })
    }
    return (
        <Box>
            <Box
                style = {{
                    backgroundImage : "url(https://ssarauco.cl/WWW/wp-content/uploads/2022/03/cropped-BANNER-Minsal.png)",
                    backgroundSize : "cover",
                    height :"100vh",
                    color:"#e4dfdf"
                }}
            >
                <Grid>
                    <Grid
                        container
                        spacing={3}
                        direction = "column"
                        justifyContent='center'
                        alignItems='center'
                        style={{ minHeight:'100vh'}}
                    >
                        <Box
                            component = "form"
                            onSubmit={(e)=>submit(e)}
                        >
                        {
                            error ?
                            <Alert severity="error">
                                Usuario o contraseña incorrectos
                            </Alert>
                            :
                            null
                        }
                        <Paper  elevation={5} sx={{bgcolor:'white',height:'70vh', width:'70vh'}}>
                        <Toolbar/>
                        <Grid >
                            <Typography variant='h6' color={'black'} sx={{ml:2, mb:2}}>
                                Iniciar sesión
                            </Typography>
                            <Stack
                                sx={{width:'55vh'}}
                            >
                            <Stack spacing={3} sx={{mx:2}}>
                            <Box>
                                <TextField
                                    id = "rut"
                                    type = "text"
                                    label = "Rut"
                                    variant='outlined'
                                    size = 'small'
                                    fullWidth
                                    onChange={(e)=>handle(e)}
                                />
                            </Box>
                            <Box sx={{margin: 10}}>
                                <TextField
                                    id = "clave"
                                    type = {showPassword ? 'text' : 'password'}
                                    label = "Clave"
                                    variant='outlined'
                                    size = 'small'
                                    fullWidth
                                    onChange={(e)=>handle(e)}
                                    InputProps={{
                                        endAdornment:(
                                            <InputAdornment position = "end">
                                            <IconButton
                                                onClick={handleShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <Box >
                                <BotonColor
                                    variant='contained'
                                    size='large'
                                    type = 'submit'
                                    fullWidth
                                >
                                    Ingresar
                                </BotonColor>
                            </Box>
                            </Stack>
                            <Toolbar/>
                        </Stack>
                        </Grid>
                        </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default LoginScreen