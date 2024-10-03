import React from 'react'
import { useAuth } from './userAuth'
import { Navigate } from 'react-router-dom';

function LoggedIn({ children }) {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to='/dashboard/new-record' />
  }
  return children;
}

export default LoggedIn