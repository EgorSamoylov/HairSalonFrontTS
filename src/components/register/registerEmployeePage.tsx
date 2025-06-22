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
  CircularProgress,
  Alert,
} from '@mui/material';
import { useRegisterEmployeeMutation } from '../../api/authApiSlice';
import { stringToColor } from '../../utils/stringToColor';

export default function RegisterEmployeePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'Введите имя';
    if (!formData.lastName) newErrors.lastName = 'Введите фамилию';
    if (!formData.email) {
      newErrors.email = 'Введите email';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Введите телефон';
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      await registerEmployee({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      }).unwrap();

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Ошибка регистрации сотрудника');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
            Регистрация сотрудника
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity='success' sx={{ mb: 2 }}>
              Сотрудник успешно зарегистрирован!
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: stringToColor(
                      `${formData.firstName} ${formData.lastName}`
                    ),
                    fontSize: '2rem',
                  }}
                >
                  {`${formData.firstName[0] || 'С'}${formData.lastName[0] || 'Т'}`}
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
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                />
                <TextField
                  label='Фамилия'
                  name='lastName'
                  variant='outlined'
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                error={!!errors.email}
                helperText={errors.email}
                required
              />

              <TextField
                label='Телефон'
                name='phoneNumber'
                variant='outlined'
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
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
                error={!!errors.password}
                helperText={errors.password}
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
              />

              <Button
                type='submit'
                variant='outlined'
                sx={buttonSx}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Зарегистрировать сотрудника'
                )}
              </Button>

              <Typography variant='body2' align='center'>
                <Link
                  to='/'
                  style={{
                    color: '#413f3f',
                    textDecoration: 'underline',
                    fontFamily: 'Neue Machina',
                  }}
                >
                  На главную
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
