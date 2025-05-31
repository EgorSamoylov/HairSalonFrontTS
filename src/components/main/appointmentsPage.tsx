import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { AppointmentDto } from '../../api/models/appointment';
import { AmenityDto } from '../../api/models/amenity';
import { UserDto } from '../../api/models/user';

export default function AppointmentsPage() {
  const currentUser: UserDto = {
    id: 1,
    firstName: 'Client',
    lastName: 'User',
    email: 'client@example.com',
    phoneNumber: '+1234567890',
    logoAttachmentUrl: 'https://example.com/client-avatar.jpg',
  };

  const amenityies: AmenityDto[] = [
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

  const appointments: AppointmentDto[] = [
    {
      id: 1,
      client: currentUser,
      service: amenityies[0],
      appointmentDateTime: new Date('2023-06-15T10:00:00'),
      notes: 'Подтвержденная запись',
    },
    {
      id: 2,
      client: currentUser,
      service: amenityies[1],
      appointmentDateTime: new Date('2023-06-20T14:00:00'),
      notes: 'Ожидается',
    },
  ];

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
          Список записей
        </Typography>

        <Grid container justifyContent='flex-start' mb={2.5} gap={2}>
          <Button
            component={Link}
            to={'/appointments/new'}
            variant='outlined'
            sx={buttonSx}
          >
            Записаться на стрижку
          </Button>
          <Button
            component={Link}
            to={'/'}
            variant='outlined'
            sx={buttonSx}
            style={{
              marginLeft: '10px',
            }}
          >
            Вернуться на главную
          </Button>
        </Grid>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '800px',
            backgroundColor: '#adadad',
          }}
        >
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
}

type AppointmentCardProps = {
  appointment: AppointmentDto;
};

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };

  return (
    <Card>
      <CardContent style={{ backgroundColor: '#c9c8c8' }}>
        <div>
          <Typography variant='h5' component='div'>
            {appointment.service?.serviceName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Продолжительность: {appointment.appointmentDateTime?.getDate()} мин
          </Typography>
          <Typography variant='body1' mt={1}>
            Примечание: {appointment.notes}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
            marginTop: '10px',
          }}
        >
          <Button
            component={Link}
            to={`/appointments/${appointment.id}`}
            variant='outlined'
            color='primary'
            sx={buttonSx}
          >
            Подробнее
          </Button>
          <Button variant='outlined' color='secondary' sx={buttonSx}>
            Отмена
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
