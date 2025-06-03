import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
} from '@mui/material';
import { AppointmentDto } from '../../api/models/appointment';
import { AmenityDto } from '../../api/models/amenity';
import { UserDto } from '../../api/models/user';

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const currentUser: UserDto = {
    id: 1,
    firstName: 'Client',
    lastName: 'User',
    email: 'client@example.com',
    phoneNumber: '+1234567890',
    logoAttachmentUrl: 'https://example.com/client-avatar.jpg',
  };

  const amenities: AmenityDto[] = [
    {
      id: 1,
      serviceName: 'Стрижка',
      price: 25,
      durationMinutes: 30,
    },
    {
      id: 2,
      serviceName: 'Окрас волос',
      price: 50,
      durationMinutes: 60,
    },
  ];

  const mockAppointments: AppointmentDto[] = [
    {
      id: 1,
      client: currentUser,
      service: amenities[0],
      appointmentDateTime: new Date('2023-06-15T10:00:00'),
      notes: 'Подтвержденная запись',
    },
    {
      id: 2,
      client: currentUser,
      service: amenities[1],
      appointmentDateTime: new Date('2023-06-20T14:00:00'),
      notes: 'Ожидается подтверждение',
    },
  ];

  // Находим запись по id из URL
  const appointment = mockAppointments.find(
    (appt) => appt.id === parseInt(id || '0')
  );

  if (!appointment) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant='h4'>Запись не найдена</Typography>
        <Button
          component={Link}
          to='/appointments'
          variant='outlined'
          style={{ marginTop: '20px' }}
        >
          Вернуться к списку записей
        </Button>
      </div>
    );
  }

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };

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
                {appointment.appointmentDateTime?.toLocaleString()}
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
                {appointment.notes}
              </Typography>
            </Grid>

            <div className='appointment-details-page-down-button'>
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
