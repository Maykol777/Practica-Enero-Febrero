import React, { useEffect, useState} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack, TextField,Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

const cookies = new Cookies()

const url = `http://localhost:8000/api/getConveniosInstitucion?id=${cookies.get("idInstitucion")}`
const urlDeleteConvenio = 'http://localhost:8000/api/deleteConvenio'
const urlDeleteEquipo = 'http://localhost:8000/api/deleteEquipoConvenio'
const urlPutNumber = 'http://localhost:8000/api/updateConvenioNumber'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};


export default function ListaConvenio() {
    const [convenio, setConvenio] = useState([])

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
    })

    const getConvenio = async () =>{
        const res = await axios.get(url)
        setConvenio(res.data.data)
    }
    useEffect(()=>{
        getConvenio()
    }, [])

    const columns = [
        { name: 'Nombre Convenio', selector: row=>row.nombre, sortable : true, grow: 2 },
        { name: 'Id/Orden de Compra', selector: row=>row.idOrdenCompra, sortable : true, grow: 2 },
        { name: 'Proveedor', selector: row=>row.proveedor, sortable : true , grow: 1 },
        { name: 'N° Equipos', selector: row=>row.numeroEquipos, sortable : true, grow: 1 },
        { name: 'Resolucion', selector: row=>row.resolucion, format: row=> moment(row.resolucion).format('DD/MM/YYYY'), center : true, sortable : true},
        { name: 'Vigencia', selector: row=>row.vigencia, format: row=> moment(row.vigencia).format('DD/MM/YYYY'), center : true, sortable : true},
        { name: 'Costo', selector: row=>row.costo, format: row=> Intl.NumberFormat().format(row.costo), sortable : true },
        { name: 'Subasignacion', selector: row=>row.subasignacion, sortable : true },
        { name: 'Editar', width: '45px', button: true, cell: (row) => <IconButton color='primary' onClick={e => handleEdit(e, row)}><EditIcon/></IconButton>},
        { name: 'Eliminar', width: '70px', button: true, cell: (row) => <IconButton color='secondary' onClick={e => handleDelete(e, row.idConvenio)}><DeleteIcon/></IconButton>},
    ]

    const navigate = useNavigate()

    const refreshPage = () => {
        navigate(0)
    }

    const editPage = (row) => {
        console.log('edit')
        navigate('update', { state: row })
    }

    const handleEdit = (e, row) => {
        e.preventDefault()
        try {
            editPage(row)
        } catch (err){
            console.log(err)
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault()
        console.log('eliminar ' + id)
        try {
            if(window.confirm('Estas seguro que deseas eliminar este convenio?')) {
                const res = await axios.delete(urlDeleteEquipo + `?id=${id}`)
                console.log(res)
                const resDelete = await axios.delete(urlDeleteConvenio + `?id=${id}`)
                console.log(resDelete)
                getConvenio()
                Toast.fire({
                    icon: 'success',
                    title:'Convenio Eliminado',
                })
            }
        } catch (err){
            console.log(err)
            Toast.fire({
                icon: 'success',
                title:'Error al Eliminar Convenio',
            })
        }
    }

    const [buscar,setBuscar] = useState(null)

    const busqueda = (convenio, buscar) =>{
        if(buscar){
            return convenio.nombre.toLowerCase().includes(buscar.toLowerCase())
        }else return convenio;
    }

    const filtrado = (convenio, buscar)=>{
        return convenio.filter(convenio => busqueda(convenio, buscar));
    }

    const titulo = () => {
        return(
            <Stack my={2} direction='row'>
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
                <Typography variant='h5' sx={{ m: 1.5 }}>Lista de Convenios</Typography>
            </Stack>
        )
    }

    return (
        <Box >
            <DataTable
                columns={columns}
                data = {filtrado(convenio,buscar)}
                direction = "auto"
                title={titulo()}
                pagination
                fixedHeader
                responsive
                dense
                noDataComponent={<Typography variant="h5" component="h2"> No existen datos disponibles </Typography>}
                paginationComponentOptions = {paginationComponentOptions}
            />
        </Box>
    )
}