import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import {Stack} from '@mui/material'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';

export default function EquipoIndustrial({promedioIndustrial}) {
    console.log(promedioIndustrial)
  return (
    <Box >
        <Box sx={{ width: '100%', marginTop : 1}}>
                <Grid container direction='column' alignItems='center' justifyContent='center'  spacing={2} sx={{maxHeight:'120px'}}>
                    <Grid item xs={8} >
                        <Typography variant='h6'>
                            Equipo Industrial
                        </Typography>
                    </Grid>

                    <Grid item xs={8}  >
                        <div style={{maxWidth:'200px'}}>   
                            <CircularProgressbarWithChildren
                            value={promedioIndustrial.promedio ?Math.round(promedioIndustrial.promedio) :0}
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
                                    <FactoryRoundedIcon fontSize='10px'/>
                                    <Typography variant ='h5'>
                                        {promedioIndustrial.promedio ?Math.round(promedioIndustrial.promedio) :0}%
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
