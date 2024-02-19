import React from 'react'
import { isLoggedIn } from '.'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
 
     if(isLoggedIn){
       return <Outlet/>
     }else{
        return <Navigate to={"/login"}/>
     }
  
}

export default PrivateRoute