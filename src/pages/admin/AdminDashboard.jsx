import React from 'react'
import useAuth from '../../hooks/useAuth'
import AdminSideNavigation from './AdminSideNavigation'

const AdminDashboard = () => {
  
  return (
    <div className="">
        <h1 className="text-5xl text-center">AdminDashboard</h1>
        <AdminSideNavigation/>
    </div>
  )
}

export default AdminDashboard