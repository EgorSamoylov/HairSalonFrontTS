import React from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfoQuery } from '../api/userApiSlice';

export interface AuthProtectedProps {
  redirectPath?: string;
}

export default function AuthProtected() {
  const { data: user, isLoading, isError } = useUserInfoQuery({});

  if (isLoading) return <CircularProgress />;
  if (isError || !user) return <Navigate to='/login' replace />;

  return <Outlet />;
}
