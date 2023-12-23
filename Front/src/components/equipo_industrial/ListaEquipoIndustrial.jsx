import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search'
import { Box, Paper, TextField,Typography, Stack } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import AgregarEquipoIndustrial from './AgregarEquipoIndustrial';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const url = `http://localhost:8000/api/getEquiposInstitucionTipo?id=${cookies.get("idInstitucion")}&tipo=industrial`

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function ListaEquipoIndustrial() {

    const [industrial, setIndustrial] = useState([])

    const getIndustrial = async () =>{
      const res = await axios.get(url)
      setIndustrial(res.data.data)
    }
    useEffect(()=>{
      getIndustrial()
    }, [])

    const columns = [
        { name: 'Nombre recinto', selector: row=>row.ubicacion, minWidth:'150px', compact:true, sortable : true, grow: 1 },
        { name: 'Ubicacion', selector: row=>row.subUbicacion, sortable : true, grow: 1 },
        { name: 'Clase', selector: row=>row.clase, minWidth:'150px', compact:true, sortable : true },
        { name: 'SubClase', selector: row=>row.subclase,minWidth:'100px', compact:true, sortable : true },
        { name: 'Nombre', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Marca', selector: row=>row.marca, minWidth:'100px', compact:true, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, minWidth:'100px', compact:true, sortable : true },
        { name: 'Cantidad', selector: row=>row.cantidad, sortable : true, compact: true, center:true},
        { name: 'Estado', selector: row=>row.estado, sortable : true },
        { name: 'Normativa', selector: row=>row.normativa, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', sortable : true, center: true, compact: true },
        { name: 'Vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true, center: true, compact: true },
    ]

      const [buscar,setBuscar] = useState(null)

      const busqueda = (industrial, buscar) =>{
        if(buscar){
          return industrial.nombre.toLowerCase().includes(buscar.toLowerCase())
        }else return industrial;
    }

    const filtrado = (industrial, buscar)=>{
      return industrial
      .filter(industrial => busqueda(industrial, buscar));
    }

  return (
    <Paper >
        <Stack 
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Stack sx={{m:2}}>
            <Typography variant='h5'>Agregar Nuevo Equipo Industrial</Typography>
          </Stack>
          <Stack
           direction={'row'}
           sx={{m:1}}
          >
            <TextField
              size='small'
              placeholder={"Buscar por Nombre"}
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
                <AgregarEquipoIndustrial getIndustrial={getIndustrial}/>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ml:2}}>
          <DataTable
          columns={ columns}
          data = {filtrado(industrial,buscar)}
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