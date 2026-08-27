import React from 'react'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='main'>
      <Navbar/>
      <div className='content'>
          <Outlet/>
      </div>
    </div>
  )
}

export default Layout