import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { Box, Dialog, DialogContent, Paper, Typography, Divider } from '@material-ui/core';
import { IconButton } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { Stack } from '@mui/system';

const urlListaPr = "http://localhost:8000/api/getPreventivasEquipo"
const urlListaKm = 'http://localhost:8000/api/getPreventivasVehiculo'
const urlMC = 'http://localhost:8000/api/getMantencionCorrectivasEquipoCount'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
let equipo = []

export default function HistorialPreventiva({row, getequipos}) {
    const [preventiva, setPreventivas] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const [correctivas, setCorrectivas ] = useState([])
    const fecha = new Date();
    const anoActual = fecha.getFullYear()
  

    const columns =[
        { name: 'Año', selector: (row)=>(ano(row)), width:"40px", compact : true, sortable : true},
        { name: 'MP Realizadas', cell: (row)=>(row.anoPrKm ?numRealizadoKm(row):numRealizado(row)),center:true, compact : true, sortable : true},
        { name: 'MC Realizadas', selector: (row)=>(row.idEquipo), width: '250px', compact : true, sortable : true},
    ]
    
    const ano = (row)=>{
        if(row.anoPrKm){
            return row.anoPrKm
        }else{
            return row.anoPr
        }
    }
    const numRealizadoKm=(row)=>{
        let count = 0
        if(row.kilometraje1 === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje2  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje3  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje4  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje5  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje6  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje7  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje8  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje9  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje10  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje11  === 'realizado'){
            count = count + 1
        }
        if(row.kilometraje12  === 'realizado'){
            count = count + 1
        }
        return count
    }
    const numRealizado = (row)=>{
        let count = 0
        if(row.enero === 'realizado'){
            count = count + 1
        }
        if(row.febrero  === 'realizado'){
            count = count + 1
        }
        if(row.marzo  === 'realizado'){
            count = count + 1
        }
        if(row.abril  === 'realizado'){
            count = count + 1
        }
        if(row.mayo  === 'realizado'){
            count = count + 1
        }
        if(row.junio  === 'realizado'){
            count = count + 1
        }
        if(row.julio  === 'realizado'){
            count = count + 1
        }
        if(row.agosto  === 'realizado'){
            count = count + 1
        }
        if(row.septiembre  === 'realizado'){
            count = count + 1
        }
        if(row.octubre  === 'realizado'){
            count = count + 1
        }
        if(row.noviembre  === 'realizado'){
            count = count + 1
        }
        if(row.diciembre  === 'realizado'){
            count = count + 1
        }
        return count
      }

    const getPreventivasEquipo = async () =>{
        let data = []
        if(row.tipoEquipo === 'vehiculo'){
            const res = await axios.get(urlListaKm+"/?id="+row.idEquipo)
            setPreventivas(res.data.data)
        }else{
            const res = await axios.get(urlListaPr+"/?id="+row.idEquipo)
            setPreventivas(res.data.data)
        }

        try {
            const respMC = await axios.get(urlMC+"/?id="+row.idEquipo)
            console.log(respMC.data.data[0].total)
            setCorrectivas(respMC.data.data)
        }catch (error){
            setCorrectivas(0)
        }
      }
      useEffect(()=>{
        getPreventivasEquipo()
      }, [])

      const abrir =()=>{
        equipo = row;
        handleOpen();
      }

  return (
    <Box>
        <IconButton
            onClick={abrir}
            variant= 'contained'
            size = 'medium'
            color='primary'
        >
            <HistoryIcon sx={{fontSize:'50px'}}/>
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={'md'}
        >
            
            <DialogContent>
                
                    <DataTable
                        columns={columns}
                        data = {preventiva}
                        direction = "auto"
                        title = {
                            <Box>
                            <Typography variant='h6'>Historial anual de mantenciones preventivas</Typography>
                            <Typography variant='subtitle1'>{equipo.nombre}</Typography>
                            <Paper elevation={0} sx={{ml:5}}>
                                <Stack direction="row" spacing={1.5} alignItems={'center'} justifyContent={'flex-start'} sx={{mt:'5px'}}>
                                    <Stack direction='column' spacing={0.5}>
                                        <Stack>
                                            <Typography variant='subtitle2'>Ubicación: {equipo.ubicacion}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Clase: {equipo.clase}</Typography>
                                        </Stack>
                                        
                                    </Stack>

                                    <Stack direction='column' spacing={0.5}>
                                        <Stack>
                                            <Typography variant='subtitle2'>Marca: {equipo.marca}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Modelo: {equipo.modelo}</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='column' spacing={0.5}>
                                        <Stack>
                                            <Typography variant='subtitle2'>N° inventario: {equipo.numeroInventario}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Vida Residual: {(equipo.vidaUtil + equipo.ano) -anoActual}</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='column' spacing={0.5}>
                                        <Stack>
                                            <Typography variant='subtitle2'>Propietario: {equipo.propietario}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant='subtitle2'>Criticidad: {equipo.criticidad}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                            </Box>
                        }
                        pagination
                        fixedHeader
                        responsive
                        dense
                        noDataComponent={<Typography variant="h5" component="h2" sx={{my:1}}> No existen datos disponibles </Typography>}
                        paginationComponentOptions = {paginationComponentOptions}
                    />
            </DialogContent>
        </Dialog>

    </Box>
    
  )
}
