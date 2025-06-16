import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { AppointmentDto } from '../../api/models/appointment';
import { useAppointmentsQuery } from '../../api/appointmentApiSlice';
import { EmptyState } from '../emptyState';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

export default function AppointmentsPage() {
  const { data: appointments, isLoading: isAppointmentsLoading } =
    useAppointmentsQuery({});

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

        <Grid
          container
          alignItems='center'
          justifyContent='flex-start'
          mb={2.5}
          gap={2}
        >
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
            alignItems: 'center',
            gap: '20px',
            width: '800px',
            backgroundColor: '#adadad',
          }}
        >
          {isAppointmentsLoading ? (
            <CircularProgress />
          ) : appointments?.length ? (
            appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <EmptyState
              title='У вас нет записей'
              description='Запишитесь на стрижку, чтобы увидеть свои записи здесь'
            />
          )}
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
            Дата записи:{' '}
            {appointment.appointmentDateTime &&
              format(
                new Date(appointment.appointmentDateTime),
                'dd.MM.yyyy HH:mm',
                { locale: ru }
              )}
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
            width: '700px',
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
