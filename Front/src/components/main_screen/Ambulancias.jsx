import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import {Stack} from '@mui/material'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const url = "http://localhost:8000/api/getPreventivasPromedioMesInstitucionEquipo"

export default function Ambulancias({promedioAmbulancia}) {
    const fecha = new Date();
    const mesActual = fecha.getMonth()

  return (
    <Box >
        <Box sx={{ width: '100%', marginTop : 1}}>
                <Grid container direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{maxHeight:'120px'}}>
                    <Grid item xs={8}>
                            <Typography variant='h6'>
                                Vehículos
                            </Typography>
                    </Grid>

                    <Grid item xs={8}  >
                        <div style={{maxWidth:'200px'}}>   
                            <CircularProgressbarWithChildren
                            value={promedioAmbulancia.promedio ?Math.round(promedioAmbulancia.promedio) :0}
                            strokeWidth={15}
                            circleRatio={0.75}
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                rotation: 0.625,
                                textColor: "rgba(0, 0, 0, 0.87)",
                                pathColor: "#1a90ff",
                                trailColor: "#eeeeee"
                            })}
                            >
                                <Stack alignItems={'center'}>
                                    <DirectionsCarFilledRoundedIcon fontSize='10px'/>
                                    <Typography variant ='h5'>
                                    {promedioAmbulancia.promedio ?Math.round(promedioAmbulancia.promedio) :0}%
                                    </Typography>
                                </Stack>          
                            </CircularProgressbarWithChildren>
                        </div>                        
                </Grid>
                
            </Grid>
        </Box>
    </Box> 
  )
}
