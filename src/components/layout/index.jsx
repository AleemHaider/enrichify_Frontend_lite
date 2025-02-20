import React, { useEffect } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const auth = localStorage.getItem('authToken')
    if (!auth) {
        return <Navigate to="/" />;
    }
  return (
    <>
      <SideBar />
      <div className="main_layout bg-[#000000]">
        <NavBar />
        {children}
      </div>
    </>
  );
}

export default Layout;
