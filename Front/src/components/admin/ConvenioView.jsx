import { Card, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import moment from 'moment'
import axios from 'axios';
import ConvenioEquipoAdmin from '../convenio/ConvenioEquipoAdmin';
import DataTable from 'react-data-table-component';

const urlInstitucion = 'http://localhost:8000/api/getInstitucion'
const urlConvenios = 'http://localhost:8000/api/getConveniosInstitucion'

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

export default function ConvenioView() {
  const params = useParams()
  const [ open, setOpen ] = React.useState(false)
  const [ idAux, setIdAux ] = React.useState(null)
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ institucion, setInstitucion ] = React.useState()
  const [ convenios, setConvenios ] = React.useState()

  const columns = [
    { name: 'Equipos', width: '80px', button: true, cell: (row) => <IconButton size='small' color='primary' onClick={(e) => handleOpen(e, row.idConvenio)}><InfoIcon/></IconButton> },
    { name: 'Nombre Convenio', selector: row=>row.nombre, sortable : true, grow: 2 },
    { name: 'Id/Orden de Compra', selector: row=>row.idOrdenCompra, sortable : true, grow: 2 },
    { name: 'Proveedor', selector: row=>row.proveedor, sortable : true , grow: 1 },
    { name: 'N° Equipos', selector: row=>row.numeroEquipos, sortable : true, grow: 1 },
    { name: 'Resolucion', selector: row=>row.resolucion, format: row=> moment(row.resolucion).format('DD/MM/YYYY'), center : true, sortable : true},
    { name: 'Vigencia', selector: row=>row.vigencia, format: row=> moment(row.vigencia).format('DD/MM/YYYY'), center : true, sortable : true},
    { name: 'Costo', selector: row=>row.costo, format: row=> Intl.NumberFormat().format(row.costo), sortable : true },
    { name: 'Subasignacion', selector: row=>row.subasignacion, sortable : true, grow: 1.5 },
  ]

  const getInfo = async () => {
    try {
      const res = await axios.get(urlInstitucion + `?id=${params.id}`)
      setInstitucion(res.data.data)
      const resc = await axios.get(urlConvenios + `?id=${params.id}`)
      setConvenios(resc.data.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const handleOpen = (e, id) => {
    e.preventDefault()
    setIdAux(id)
    setOpen(true)
  }

  const handleClose = () => {
    setIdAux(null)
    setOpen(false)
  }

  React.useEffect(() => {
    getInfo()
  }, [])

  if(isLoading) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth='xl'>
        <ConvenioEquipoAdmin id={idAux} setOpen={setOpen}/>
      </Dialog>
      <Card sx={{ m: 1 }} variant='outlined'>
        <Stack sx={{ m: 1 }}>
          <Typography variant='h5'>Lista de Convenios de {institucion[0].nombre}</Typography>
        </Stack>
      </Card>
      <Card sx={{ m: 1 }} variant='outlined'>
        <DataTable
          columns={columns}
          data = {convenios}
          direction = "auto"
          pagination
          fixedHeader
          responsive
          dense
          noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
          paginationComponentOptions = {paginationComponentOptions}
        />
      </Card>
    </div>
  )
}
