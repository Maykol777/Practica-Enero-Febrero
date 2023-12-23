import React,{ useState, useEffect} from 'react';
import { Box, Grid, Typography } from '@material-ui/core'
import { CircularProgress, Divider } from '@mui/material';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import 'react-circular-progressbar/dist/styles.css'
import { Stack } from '@mui/system';

export default function EquipoMedico({promedioMedico}) {

  return (
    <Box >
        <Box sx={{ width: '100%', marginTop : 1}}>
                <Grid container direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{maxHeight:'120px'}}>
                    <Grid item xs={8} >
                        <Typography variant='h6'>
                            Equipo Medico                        
                        </Typography>
                    </Grid>

                    <Grid item xs={8}  >
                        <div style={{maxWidth:'200px'}}>   
                            <CircularProgressbarWithChildren
                            value={promedioMedico.promedio ?Math.round(promedioMedico.promedio) :0}
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
                                    <MedicalServicesRoundedIcon fontSize='10px'/>
                                    <Typography variant ='h5'>
                                        {promedioMedico.promedio ?Math.round(promedioMedico.promedio) :0}%
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

/*<Box style={{width:100}}>
                <CircularProgressbarWithChildren value ={10}/>
                
            </Box> 
            
            
            <CircularProgressbarWithChildren 
            value={50} 
            text={'50'}

            styles ={{
                root:{},
                path:{
                    stroke: `rgba(62,152,199)`,
                    strokeLinecap: 'butt',
                    transition:'stroke-dashoffset 0.5s ease 0s',
                    Transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                },

                trail:{
                    stroke:'#d6d6d6',
                    
                    strokeWidth:'12',
                    transform : 'rotate(0.25turn)',
                    transformOrigin: 'center center'
                },
                text:{
                    fill:'#f88',
                    fontSize:'12px'
                },
                background:{
                    fill:'#3e98c7'
                },
            }}
            />
*/


