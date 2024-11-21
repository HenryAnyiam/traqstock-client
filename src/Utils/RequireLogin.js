import React from 'react'
import { useAuth } from './userAuth'
import { Navigate, useLocation } from 'react-router-dom';

function RequireLogin({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    const user_token = localStorage.getItem('accessToken');
    if (!user_token) {
      return <Navigate to='/login' state={{ path: location.pathname }} />
    }
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children;
}

export default RequireLogin;
