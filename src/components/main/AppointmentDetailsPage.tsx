import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material';
import { AppointmentDto } from '../../api/models/appointment';

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [appointment, setAppointment] = useState<AppointmentDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAppointmentById = async (id: number) => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке информации о записи');
      }
      return await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsError(true);
      return null;
    }
  };

  useEffect(() => {
    const loadAppointment = async () => {
      setIsLoading(true);
      const data = await fetchAppointmentById(Number(id));
      setAppointment(data);
      setIsLoading(false);
    };

    loadAppointment();
  }, [id]);

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !appointment) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant='h4'>Запись не найдена</Typography>
        <Button
          component={Link}
          to='/appointments'
          variant='outlined'
          style={{ marginTop: '20px' }}
          sx={buttonSx}
        >
          Вернуться к списку записей
        </Button>
      </div>
    );
  }

  return (
    <div className='appointment'>
      <div className='appointment-content'>
        <Typography variant='h3' align='center' gutterBottom>
          Детали записи
        </Typography>

        <Grid mb={3}>
          <Button
            component={Link}
            to={'/appointments'}
            variant='outlined'
            sx={buttonSx}
          >
            Назад к списку
          </Button>
        </Grid>

        <Card>
          <CardContent style={{ backgroundColor: '#c9c8c8' }}>
            <Grid mb={3}>
              <Typography variant='h5' component='div'>
                {appointment.service?.serviceName}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Дата и время:{' '}
                {appointment.appointmentDateTime &&
                  new Date(appointment.appointmentDateTime).toLocaleString()}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Продолжительность: {appointment.service?.durationMinutes} минут
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Стоимость: ${appointment.service?.price}
              </Typography>
            </Grid>

            <Grid mb={3}>
              <Typography variant='h6'>Клиент</Typography>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '8px',
                }}
              >
                <Avatar src={appointment.client?.logoAttachmentUrl} />
                <Grid ml={2}>
                  <Typography>
                    {appointment.client?.firstName}{' '}
                    {appointment.client?.lastName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {appointment.client?.email}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {appointment.client?.phoneNumber}
                  </Typography>
                </Grid>
              </div>
            </Grid>

            <Grid mb={3}>
              <Typography variant='h6'>Примечание</Typography>
              <Typography variant='body1' mt={1}>
                {appointment.notes || 'Нет примечаний'}
              </Typography>
            </Grid>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <Button variant='outlined' color='secondary' sx={buttonSx}>
                Отменить запись
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
