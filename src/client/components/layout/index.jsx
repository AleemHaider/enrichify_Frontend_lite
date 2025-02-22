import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  const isAuthorized = useSelector((state) => state?.authReducer?.isAuthenticated)

  if (!isAuthorized) {
    return <Navigate to="/admin" />;
  }
  return (
    <>
      <SideBar />
      <div className="sm:ml-64">
        <NavBar />
        <div className="lg:p-8 sm:p-6 p-4">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout