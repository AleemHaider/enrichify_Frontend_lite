import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ClientPublicRoutes = ({ children }) => {
  const isAuthorized = useSelector((state) => state.clientAuthReducer.isAuthenticated);
  // const isAuthorized = true
  console.log("isAuthorized", isAuthorized)

  if (isAuthorized) {
    return <Navigate to="/client/dashboard" />;
  }

  return (
    <>
      {children}
    </>
  );
};