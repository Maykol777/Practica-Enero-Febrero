import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import React from 'react'

const cookies = new Cookies()

export const ProtectedRoute = ({children})=>{
    if(!cookies.get("idInstitucion")){
        return <Navigate to = '/'/>
    }

    return children
}