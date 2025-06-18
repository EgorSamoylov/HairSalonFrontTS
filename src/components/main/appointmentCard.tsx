import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { AppointmentDto } from '../../api/models/appointment';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

type AppointmentCardProps = {
  appointment: AppointmentDto;
  showActions?: boolean;
  onComplete?: () => void;
  onCancel?: () => void;
};

export default function AppointmentCard({
  appointment,
  showActions = false,
  onComplete,
  onCancel,
}: AppointmentCardProps) {
  const buttonSx = {
    fontSize: '16px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
    mr: 1,
    mt: 1,
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: '#c9c8c8' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {appointment.service?.serviceName || 'Услуга не указана'}
        </Typography>

        {appointment.employee && (
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Мастер: {appointment.employee.firstName}{' '}
            {appointment.employee.lastName}
          </Typography>
        )}

        {appointment.client && (
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Клиент: {appointment.client.firstName} {appointment.client.lastName}
          </Typography>
        )}

        <Typography variant='body2' color='text.secondary' gutterBottom>
          Дата:{' '}
          {appointment.appointmentDateTime &&
            format(
              new Date(appointment.appointmentDateTime),
              'dd.MM.yyyy HH:mm',
              { locale: ru }
            )}
        </Typography>

        <Typography variant='body2' gutterBottom>
          Статус:{' '}
          {appointment.isCancelled ? (
            <span style={{ color: 'red' }}>Отменена</span>
          ) : appointment.isCompleted ? (
            <span style={{ color: 'green' }}>Выполнена</span>
          ) : (
            <span>Запланирована</span>
          )}
        </Typography>

        <Typography variant='body1' mt={1}>
          Примечание: {appointment.notes || 'Нет примечаний'}
        </Typography>

        {showActions &&
          !appointment.isCancelled &&
          !appointment.isCompleted && (
            <Box sx={{ mt: 2 }}>
              {onComplete && (
                <Button variant='outlined' sx={buttonSx} onClick={onComplete}>
                  Завершить
                </Button>
              )}
              {onCancel && (
                <Button variant='outlined' sx={buttonSx} onClick={onCancel}>
                  Отменить
                </Button>
              )}
              <Button
                component={Link}
                to={`/appointments/${appointment.id}`}
                variant='outlined'
                sx={buttonSx}
              >
                Подробнее
              </Button>
            </Box>
          )}
      </CardContent>
    </Card>
  );
}
