import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useLogoutMutation } from '../../api/authApiSlice';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LogoutPage() {
  const [logout] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout().unwrap();
      } catch (err) {
        console.error('Ошибка при выходе:', err);
        setError('Не удалось выйти из системы');
      } finally {
        setIsLoading(false);
        // Устанавливаем таймер для перенаправления
        const timer = setTimeout(() => setShouldRedirect(true), 3000);
        // eslint-disable-next-line no-unsafe-finally
        return () => clearTimeout(timer); // Очистка таймера при размонтировании
      }
    };

    performLogout();
  }, [logout]);

  if (shouldRedirect) {
    return <Navigate to='/login' replace />;
  }

  if (error) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Typography variant='body1' color='error'>
          {error}
        </Typography>
        <Typography variant='body2'>
          Вы будете перенаправлены на страницу входа...
        </Typography>
      </Grid>
    );
  }

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
        <Typography variant='body1'>Выход из системы...</Typography>
      </Grid>
    );
  }

  return <Navigate to='/login' replace />;
}
