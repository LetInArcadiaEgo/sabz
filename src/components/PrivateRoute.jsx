import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Loading spinner component
const Spinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '16px',
    color: '#666'
  }}>
    Loading...
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  return user === undefined || loading ? <Spinner /> :
         user ? children :
         <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute; 