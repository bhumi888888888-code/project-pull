import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const AppLayout = () => {

  const { authUser } = useSelector(state => state.auth)

  const isHomePage = location.pathname === "/user" || location.pathname === "/user/"
  return (
    <div>
      {/* <Navbar /> */}
      {authUser.role === "User" && !isHomePage &&
        <div className='bg-primary'><Navbar /></div>
      }


      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout
