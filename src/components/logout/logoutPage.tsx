import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useLogoutMutation } from '../../api/authApiSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LogoutPage() {
  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    const performLogout = async () => {
      await logout({}).unwrap();
    };
    performLogout();
  }, [logout]);

  if (isLoading) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
        <Typography variant='body1'>Logging out...</Typography>
      </Grid>
    );
  }

  return <Navigate to='/login' replace />;
}
