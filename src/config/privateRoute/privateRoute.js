import React from 'react';
import { Navigate } from 'react-router-dom';
import UseAuth from './useAuth';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    const data = UseAuth(token);
    const isValid = data ? data.valid : null;

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return !isValid ? <Navigate to="/" replace /> : element;
};

export default PrivateRoute;
