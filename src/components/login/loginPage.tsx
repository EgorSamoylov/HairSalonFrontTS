import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  Stack,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика авторизации
    console.log({ email, password });
    navigate('/');
  };

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
    width: '100%',
    mb: 2,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#adadad',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2, // добавляем отступы по краям для мобильных устройств
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            backgroundColor: '#c9c8c8',
            borderRadius: '18px',
            p: 3, // внутренние отступы карточки
          }}
        >
          <CardContent>
            <Typography
              variant='h3'
              align='center'
              gutterBottom
              sx={{
                fontFamily: 'Laviossa',
                color: '#413f3f',
                mb: 4,
              }}
            >
              Вход
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {' '}
                {/* Используем Stack для вертикального расположения */}
                <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type='email'
                />
                <TextField
                  label='Пароль'
                  variant='outlined'
                  fullWidth
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type='submit' variant='outlined' sx={buttonSx}>
                  Войти
                </Button>
                <Typography variant='body2' align='center'>
                  Нет аккаунта?{' '}
                  <Link
                    to='/register'
                    style={{
                      color: '#413f3f',
                      textDecoration: 'underline',
                      fontFamily: 'Neue Machina',
                    }}
                  >
                    Зарегистрироваться
                  </Link>
                </Typography>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
