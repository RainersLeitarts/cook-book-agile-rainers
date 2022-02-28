import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../../pages/home/Home'

function ProtectedRoutes({isAuthorised}) {
  return (
    isAuthorised ? <Outlet/> : <Home/>
  )
}

export default ProtectedRoutes