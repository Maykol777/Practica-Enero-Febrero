import React from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()


export const LoginRedirect = ({children})=>{
    if(cookies.get("nombre")){
        
        if(cookies.get("idInstitucion") !== 0){
            return <Navigate to = '/main'/>
        }

        if(cookies.get("idInstitucion") === 0){
            return <Navigate to = '/main/admin'/>
        }
    }
    
    return children
}