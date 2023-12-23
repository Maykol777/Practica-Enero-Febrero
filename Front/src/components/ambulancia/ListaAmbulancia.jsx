import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search'
import { Box, TextField,Typography, Stack, Paper } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import AgregarAmbulancia from './AgregarAmbulancia';
import Cookies from 'universal-cookie';

const cookies = new Cookies()


const url =`http://localhost:8000/api/getEquiposInstitucionTipo?id=${cookies.get("idInstitucion")}&tipo=vehiculo`;

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function ListaAmbulancia() {

    const [ambulancia, setAmbulancia] = useState([])
    const fecha = new Date();
    const anoActual = fecha.getFullYear()

    const getAmbulancia = async () =>{
      const res = await axios.get(url)
      setAmbulancia(res.data.data)
    }
    useEffect(()=>{
      getAmbulancia()
    }, [])

    const columns = [
        { name: 'Region', selector: row=>row.ubicacion, sortable : true, grow: 1},
        { name: 'Establecimiento', selector: row=>row.subUbicacion, sortable : true, grow: 2},
        { name: 'Tipo de Carroceria', selector: row=>row.carroceria, minWidth:'150px', compact:true, sortable : true },
        { name: 'Tipo de Ambulancia', selector: row=>row.tipoAmbulancia, minWidth:'155px', compact:true, sortable : true },
        { name: 'Clase Ambulancia', selector: row=>row.clase, minWidth:'125px', compact:true, sortable : true},
        { name: 'Samu', selector: row=>row.samu, format: row=>row.samu ? 'SI': 'NO', compact: true, center: true, sortable : true },
        { name: 'Funcion', selector: row=>row.funcion, minWidth:'200px', compact:true, sortable : true },
        { name: 'Marca', selector: row=>row.marca, minWidth:'120px', compact:true, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, sortable : true },
        { name: 'Patente', selector: row=>row.patente, sortable : true },
        { name: 'N° Motor', selector: row=>row.numeroMotor, minWidth:'150px', compact:true, sortable : true },
        { name: 'Año de Adquisicion', selector: row=>row.ano, minWidth:'130px', compact:true, center:true, sortable : true },
        { name: 'Vida útil', selector: row=>row.vidaUtil, minWidth:'80px', compact:true, center:true, sortable : true },
        { name: 'Vida Residual', selector: (row)=>(<>{(row.ano + row.vidaUtil) - anoActual}</>), compact:true, center:true, sortable : true },
        { name: 'Kilometraje', selector: row=>row.kilometraje, format: row=> Intl.NumberFormat().format(row.kilometraje), sortable : true },
        { name: 'Estado Situacion', selector: row=>row.propietario, minWidth:'150px', compact:true, sortable : true },
        { name: 'Estado de Conservacion', selector: row=>row.estado, minWidth:'150px', compact:true, sortable : true },
        { name: 'Criticidad', selector: row=>row.criticidad, minWidth:'80px', compact:true, center:true, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO',  minWidth:'80px', compact:true, center:true, sortable : true },
        { name: 'Vencimiento de garantia', selector: row=>row.vencimientoGarantia, minWidth:'150px', compact:true, center: true, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', minWidth:'150px', compact:true, center:true, sortable : true },
    ]

    const [buscar,setBuscar] = useState(null)

    const busqueda = (ambulancia, buscar) =>{
        if(buscar){
            return ambulancia.patente.toLowerCase().includes(buscar.toLowerCase())
        }else return ambulancia;
    }

    const filtrado = (ambulancia, buscar)=>{
        return ambulancia
        .filter(ambulancia => busqueda(ambulancia, buscar));
    }

  return (
    <Paper>
        <Stack 
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Stack sx={{m:2}}>
            <Typography variant='h5'>Agregar Nuevo Vehiculo</Typography>
          </Stack>
          <Stack
           direction={'row'}
           sx={{m:1}}
          >
            <TextField
              size='small'
              placeholder={"Buscar por Patente"}
              onChange = {(e)=>setBuscar(e.target.value)}
              sx={{m:1}}
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
              >
            </TextField>
            <Box sx={{m:1}}>
              <AgregarAmbulancia getAmbulancia={getAmbulancia}/>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ml:2}}>
          <DataTable
          columns={ columns}
          data = {filtrado(ambulancia,buscar)}
          direction = "auto"
          pagination
          fixedHeader
          responsive
          dense
          noDataComponent={<Typography sx={{my:2}} variant="h5" component="h2"> No existen datos disponibles </Typography>}
          paginationComponentOptions = {paginationComponentOptions}
          />
        </Stack>
    </Paper>
    
  )
}