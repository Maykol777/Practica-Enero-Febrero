import './App.css';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box  } from '@material-ui/core';
import Navbar from './components/Navbar';
import EquipoIndustrialScreen from './components/equipo_industrial/EquipoIndustrialScreen'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainScreen from './components/main_screen/MainScreen'
import EquipoMedicoScreen from './components/equipo_medico/EquipoMedicoScreen';
import LoginScreen from './components/login/LoginScreen'
import { ProtectedRoute } from './context/ProtectedRoute';
import { ProtectedRouteAdmin } from './context/ProtectedRouteAdmin';
import { LoginRedirect } from './context/LoginRedirect';
import PlanificacionEMScreen from './components/planificacionEm/PlanificacionEMScreen';
import ConvenioScreen from './components/convenio/ConvenioScreen';
import AmbulanciaScreen from './components/ambulancia/AmbulanciaScreen';
import ListaConvenioScreen from './components/convenio/ListaConvenioScreen';
import EditarConvenio from './components/convenio/EditarConvenio';
import AgregarEquipoConvenio from './components/convenio/AgregarEquipoConvenio';
import MantencionCorrectivaScreen from './components/mantencionCorrectiva/MantencionCorrectivaScreen';
import { GlobalStyles } from '@mui/material';
import AdminScreen from './components/admin/AdminScreen';
import UsuarioScreen from './components/usuario/UsuarioScreen';
import InstitucionScreen from './components/institucion/InstitucionScreen';
import ConvenioView from './components/admin/ConvenioView';
import AgregarInstitucion from './components/institucion/AgregarInstitucion';
import ListaInstitucion from './components/institucion/ListaInstitucion';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginRedirect>
              <LoginScreen/>
            </LoginRedirect>
  },
  {
    path: '/main',
    element: <ProtectedRoute>
              <Navbar/>
            </ProtectedRoute>,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '',
        element: <MainScreen/>
      },
      {
        path: 'create/industrial',
        element: <EquipoIndustrialScreen/>
      },
      {
        path: 'create/medico',
        element: <EquipoMedicoScreen/>
      },
      {
        path: 'create/ambulancia',
        element: <AmbulanciaScreen/>
      },
      {
        path: 'create/convenio',
        element: <ConvenioScreen/>
      },
      {
        path: 'view/convenio',
        element: <ListaConvenioScreen/>
      },
      {
        path: 'view/convenio/update',
        element: <EditarConvenio/>
      },
      {
        path: 'view/convenio/update/equipo',
        element: <AgregarEquipoConvenio/>
      },
      {
        path: 'plan',
        element: <PlanificacionEMScreen/>
      },
      {
        path: 'create/mantencion/correctiva',
        element: <MantencionCorrectivaScreen/>
      },
    ],
  },
  {
    path: '/main/admin',
    element:
              <Navbar/>
            ,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '',
        element: <AdminScreen/>
      },
      {
        path: 'institucion',
        element: <ListaInstitucion/>
      },
      {
        path: 'institucion/:id',
        element: <InstitucionScreen/>
      },
      {
        path: 'usuario',
        element: <UsuarioScreen/>
      },
      {
        path: 'convenio/:id',
        element: <ConvenioView/>
      },
    ],
  },
])

function App() {
  return (
    <div>
      <CssBaseline/>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#e4dfdf" }
        }}
      />
      <Box sx={{ display: 'flex' }}>
          <RouterProvider router={router}/>
      </Box>
    </div>
  )
}

export default App;
