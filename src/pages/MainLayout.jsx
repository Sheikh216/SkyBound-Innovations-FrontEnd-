import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <main className="App">
        <Navbar />
        <Outlet />
        <Footer />
    </main>
  )
}

export default MainLayout