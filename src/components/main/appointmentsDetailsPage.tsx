import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  useGetAppointmentByIdQuery,
  useGetClientByIdQuery,
  useGetEmployeeByIdQuery,
  useGetAmenityByIdQuery,
} from '../../api/apiSlice';

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  // Получаем основную запись
  const {
    data: appointment,
    isLoading: isAppointmentLoading,
    isError: isAppointmentError,
  } = useGetAppointmentByIdQuery(Number(id));

  // Получаем связанные данные
  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClientByIdQuery(appointment?.clientId ?? 0, {
    skip: !appointment?.clientId,
  });

  const {
    data: employee,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useGetEmployeeByIdQuery(appointment?.employeeId ?? 0, {
    skip: !appointment?.employeeId,
  });

  const {
    data: amenity,
    isLoading: isAmenityLoading,
    isError: isAmenityError,
  } = useGetAmenityByIdQuery(appointment?.serviceId ?? 0, {
    skip: !appointment?.serviceId,
  });

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };

  const isLoading =
    isAppointmentLoading ||
    isClientLoading ||
    isEmployeeLoading ||
    isAmenityLoading;
  const isError =
    isAppointmentError || isClientError || isEmployeeError || isAmenityError;

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' padding='20px'>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !appointment) {
    return (
      <Box padding='20px'>
        <Typography variant='h4'>Запись не найдена</Typography>
        <Button
          component={Link}
          to='/appointments'
          variant='outlined'
          sx={{ marginTop: '20px', ...buttonSx }}
        >
          Вернуться к списку записей
        </Button>
      </Box>
    );
  }

  return (
    <Box className='appointment'>
      <Box className='appointment-content'>
        <Typography variant='h3' align='center' gutterBottom>
          Детали записи
        </Typography>

        <Grid mb={3}>
          <Button
            component={Link}
            to='/appointments'
            variant='outlined'
            sx={buttonSx}
          >
            Назад к списку
          </Button>
        </Grid>

        <Card>
          <CardContent sx={{ backgroundColor: '#c9c8c8' }}>
            {/* Информация об услуге */}
            <Grid mb={3}>
              <Typography variant='h5' component='div'>
                {amenity?.serviceName || 'Услуга не указана'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Дата и время:{' '}
                {appointment.appointmentDateTime &&
                  new Date(appointment.appointmentDateTime).toLocaleString(
                    'ru-RU',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
              </Typography>
              {amenity && (
                <>
                  <Typography variant='body2' color='text.secondary'>
                    Продолжительность: {amenity.durationMinutes || '—'} минут
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Стоимость: ${amenity.price || '—'}
                  </Typography>
                </>
              )}
            </Grid>

            {/* Информация о клиенте */}
            <Grid mb={3}>
              <Typography variant='h6'>Клиент</Typography>
              <Box display='flex' alignItems='center' mt={1}>
                <Avatar src={client?.logoAttachmentUrl} />
                <Grid ml={2}>
                  <Typography>
                    {client?.firstName} {client?.lastName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {client?.email || 'Email не указан'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {client?.phoneNumber || 'Телефон не указан'}
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            {/* Информация о парикмахере */}
            <Grid mb={3}>
              <Typography variant='h6'>Парикмахер</Typography>
              <Box display='flex' alignItems='center' mt={1}>
                <Avatar src={employee?.logoAttachmentUrl} />
                <Grid ml={2}>
                  <Typography>
                    {employee?.firstName} {employee?.lastName}
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            {/* Примечание */}
            <Grid mb={3}>
              <Typography variant='h6'>Примечание</Typography>
              <Typography variant='body1' mt={1}>
                {appointment.notes || 'Нет примечаний'}
              </Typography>
            </Grid>

            <Box display='flex' justifyContent='flex-end' mt={3}>
              <Button variant='outlined' color='secondary' sx={buttonSx}>
                Отменить запись
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
