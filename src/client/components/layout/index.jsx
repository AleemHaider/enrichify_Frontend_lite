import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const ClientLayout = ({ children }) => {
  // const isAuthorized = useSelector((state) => state?.authReducer?.isAuthenticated)
  const isAuthorized = useSelector((state) => state.clientAuthReducer.isAuthenticated);
  // const isAuthorized = true
  console.log("isAuthorized", isAuthorized);


  if (!isAuthorized) {
    return <Navigate to="/client" />;
  }
  return (
    <>
      <SideBar />
      <div className="sm:ml-64 bg-[#F5F7FA] min-h-screen">
        <NavBar />
        <div className="lg:p-8 sm:p-6 p-4">
          {children}
        </div>
      </div>
    </>
  )
}

export default ClientLayout