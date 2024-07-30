import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    const isValid = useAuth(token);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return !isValid ? <Navigate to="/" replace /> : element;
};

export default PrivateRoute;
