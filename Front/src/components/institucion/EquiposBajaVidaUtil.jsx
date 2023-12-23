import { Box, Button, ButtonBase, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import DataTable from 'react-data-table-component'

const urlEquipos = 'http://localhost:8000/api/getAllEquiposInstitucionBajaVidaUtilTipo'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function EquiposBajaVidaUtil({id, tipo, setOpenEquipos}) {
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ equipos, setEquipos ] = React.useState()
  const fecha = new Date();
  const anoActual = fecha.getFullYear()

  const columnsMedico = [
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

  const columnsAmbulancia = [
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

  const columns = tipo === 'medico' ? columnsMedico : columnsAmbulancia

  const getEquipos = async () => {
    try {
      const res = await axios.get(urlEquipos + `?id=${id}&tipo=${tipo}`)
      setEquipos(res.data.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    getEquipos()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <Box sx={{ m: 1 }}>
      <Stack>
        <Typography variant='h5'>{tipo === 'medico' ? "Equipos medicos con baja vida util" : "Ambulancias con baja vida util"}</Typography>
        <Stack>
          <DataTable
            columns={columns}
            data={equipos}
            direction = "auto"
            pagination
            fixedHeader
            responsive
            dense
            noDataComponent={<Typography variant="h5" component="h2" sx={{my:2}} > No existen datos disponibles </Typography>}
            paginationComponentOptions = {paginationComponentOptions}
          />
        </Stack>
        <Stack direction={'row-reverse'}>
          <Button variant='contained' onClick={() => setOpenEquipos(false)}>Cerrar</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
