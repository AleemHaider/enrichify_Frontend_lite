import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const navigate=useNavigate();
    const isAuthorizedLogin = useSelector((state) => state.authReducer.isAuthenticated);
    // const isAuthorizedLogin =true;
    if (isAuthorizedLogin) {
        return <Navigate to="/projects" />;
    }

    // const auth=localStorage.getItem('authToken')
    // useEffect(() => {
    //   if(auth){
    //     navigate('/projects')
    //   }
    // }, [auth])
    return (
        <>
            {children}
        </>
    );
};