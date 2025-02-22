import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ClientPublicRoutes = ({ children }) => {
  // const isAuthorized = useSelector((state) => state.authReducer.isAuthenticated);
  const isAuthorized = false

  if (isAuthorized) {
    return <Navigate to="/client/home" />;
  }

  return (
    <>
      {children}
    </>
  );
};