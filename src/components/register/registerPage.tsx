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
  Avatar,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { useRegisterMutation } from '../../api/authApiSlice';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [register] = useRegisterMutation({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    register(formData);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          p: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            backgroundColor: '#c9c8c8',
            borderRadius: '18px',
            p: 3,
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
              Регистрация
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: stringToColor('Новый пользователь'),
                      fontSize: '2rem',
                    }}
                  >
                    {`${formData.firstName[0] || 'Н'}${formData.lastName[0] || 'П'}`}
                  </Avatar>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label='Имя'
                    name='firstName'
                    variant='outlined'
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label='Фамилия'
                    name='lastName'
                    variant='outlined'
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Box>

                <TextField
                  label='Email'
                  name='email'
                  variant='outlined'
                  fullWidth
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  label='Телефон'
                  name='phoneNumber'
                  variant='outlined'
                  fullWidth
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                <TextField
                  label='Пароль'
                  name='password'
                  variant='outlined'
                  fullWidth
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <TextField
                  label='Подтвердите пароль'
                  name='confirmPassword'
                  variant='outlined'
                  fullWidth
                  type='password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <Button type='submit' variant='outlined' sx={buttonSx}>
                  Зарегистрироваться
                </Button>

                <Typography variant='body2' align='center'>
                  Уже есть аккаунт?{' '}
                  <Link
                    to='/login'
                    style={{
                      color: '#413f3f',
                      textDecoration: 'underline',
                      fontFamily: 'Neue Machina',
                    }}
                  >
                    Войти
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

// Вспомогательная функция для генерации цвета аватара
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
