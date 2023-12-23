import {Navigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import React from 'react'

const cookies = new Cookies()


export const ProtectedRouteAdmin = ({children})=>{
    if(cookies.get("idInstitucion") !== 0){
        return <Navigate to = '/'/>
    }else if(cookies.get("idInstitucion") !== 0){
        return <Navigate to = '/main'/>
    }
    
    return children
}