import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search'
import { Box, Paper, TextField,Typography, Stack, Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import AgregarEquipo from './AgregarEquipo';
import Cookies from 'universal-cookie';
import EditarEquipo from './EditarEquipo';

const cookies = new Cookies()

const url = `http://localhost:8000/api/getEquiposInstitucionTipo?id=${cookies.get("idInstitucion")}&tipo=medico`

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function ListaEquipoMedicoV3() {

    const [equipo, setEquipos] = useState([])
    const fecha = new Date();
    const anoActual = fecha.getFullYear()

    const getEquipos = async () =>{
      const res = await axios.get(url)
      setEquipos(res.data.data)
    }
    useEffect(()=>{
      getEquipos()
    }, [])

    const columns = [
        { name: 'Servicio Clínico', selector: row=>row.ubicacion, minWidth:'150px', compact: true, sortable : true, grow: 1  },
        { name: 'Recinto', selector: row=>row.subUbicacion, sortable : true, grow: 1},
        { name: 'Clase', selector: row=>row.clase, minWidth:'150px', compact:true, sortable : true },
        { name: 'Subclase', selector: row=>row.subclase, minWidth:'140px', sortable : true, grow: 1 },
        { name: 'Nombre', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Marca', selector: row=>row.marca, sortable : true },
        { name: 'Modelo', selector: row=>row.modelo, sortable : true, grow: 2 },
        { name: 'Serie', selector: row=>row.serie, sortable : true, grow: 2 },
        { name: 'N° Inventario', selector: row=>row.numeroInventario, compact:true, center:true, sortable : true },
        { name: 'Adquisición', selector: row=>row.ano, compact:true, center:true, sortable : true },
        { name: 'Vida útil', selector: row=>row.vidaUtil, compact:true, center:true, sortable : true },
        { name: 'Vida Residual', selector: (row)=>(<>{(row.ano + row.vidaUtil) - anoActual}</>), compact:true, center:true, sortable : true },
        { name: 'Propietario', selector: row=>row.propietario, compact:true, center:true, sortable : true, width:'130px' },
        { name: 'Estado', selector: row=>row.estado, sortable : true, compact:true },
        { name: 'Criticidad', selector: row=>row.criticidad, sortable : true },
        { name: 'Garantia', selector: row=>row.garantia, format: row=>row.garantia ? 'SI': 'NO', compact:true, center:true, sortable : true },
        { name: 'Vencimiento de garantia', selector: row=>row.vencimientoGarantia, sortable : true, compact:true },
        { name: 'Plan de Mantención', selector: row=>row.planMantencion, format: row=>row.planMantencion ? 'SI': 'NO', sortable : true,center:true, compact:true },
    ]

      const [buscar,setBuscar] = useState(null)

      const busqueda = (equipo, buscar) =>{
        if(buscar){
          return equipo.nombre.toLowerCase().includes(buscar.toLowerCase())
        }else return equipo;
    }

    const filtrado = (equipo, buscar)=>{
      return equipo
      .filter(equipo => busqueda(equipo, buscar));
    }

  return (
    <Paper >
      <Stack 
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Stack sx={{m:2}}>
          <Typography variant='h5'>Agregar Nuevo Equipo Medico</Typography>
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
              <AgregarEquipo equipos={equipo} getEquipos={getEquipos}/>
            </Box>
          </Stack>
      </Stack>
        <Stack sx={{ml:2}}>
          <DataTable
          columns={ columns}
          data = {filtrado(equipo,buscar)}
          direction = "auto"
          pagination
          fixedHeader
          responsive
          dense
          noDataComponent={<Typography variant="h5" component="h2" sx={{my:2}} > No existen datos disponibles </Typography>}
          paginationComponentOptions = {paginationComponentOptions}  
          />
        </Stack>
    </Paper>
    
  )
}
