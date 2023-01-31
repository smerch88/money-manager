import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from 'redux/auth/auth-selector';

export default function PublicRoute() {
  const token = useSelector(selectToken);
  return token ? <Navigate to='/home' /> : <Outlet />;
}