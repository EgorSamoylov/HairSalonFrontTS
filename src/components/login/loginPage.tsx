import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  Stack,
  CircularProgress,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useLoginMutation } from '../../api/authApiSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Обязательное поле'),
});

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values).unwrap();
        // Перенаправляем на главную после успешного входа
        navigate('/');
      } catch (error) {
        console.error('Ошибка входа:', error);
        formik.setStatus('Неверные учетные данные');
      }
    },
  });

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
            Вход
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label='Email'
                name='email'
                variant='outlined'
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
                type='email'
              />
              <TextField
                label='Пароль'
                name='password'
                variant='outlined'
                fullWidth
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                required
              />

              {formik.status && (
                <Typography color='error' align='center'>
                  {formik.status}
                </Typography>
              )}

              <Button
                type='submit'
                variant='outlined'
                sx={buttonSx}
                disabled={formik.isSubmitting || isLoading}
              >
                {formik.isSubmitting || isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Войти'
                )}
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
  );
}
