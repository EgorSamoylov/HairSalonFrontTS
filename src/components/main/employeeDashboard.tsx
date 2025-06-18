import React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useUserInfoQuery } from '../../api/userApiSlice';
import {
  useGetEmployeeAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from '../../api/appointmentApiSlice';
import { AppointmentDto } from '../../api/models/appointment';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

// Компонент для отображения вкладок
function TabPanel(props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Компонент карточки записи
function AppointmentCard({
  appointment,
  onComplete,
  onCancel,
}: {
  appointment: AppointmentDto;
  onComplete: () => void;
  onCancel: () => void;
}) {
  const buttonSx = {
    fontSize: '16px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
    marginRight: '8px',
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: '#c9c8c8' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {appointment.service?.serviceName || 'Услуга не указана'}
        </Typography>

        <Typography variant='body2' color='text.secondary' gutterBottom>
          Клиент: {appointment.client?.firstName} {appointment.client?.lastName}
        </Typography>

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
          {appointment.isCancelled
            ? 'Отменена'
            : appointment.isCompleted
              ? 'Выполнена'
              : 'Запланирована'}
        </Typography>

        <Typography variant='body1' mt={1}>
          Примечание: {appointment.notes || 'Нет примечаний'}
        </Typography>

        {!appointment.isCancelled && !appointment.isCompleted && (
          <Box sx={{ mt: 2 }}>
            <Button variant='outlined' sx={buttonSx} onClick={onComplete}>
              Завершить
            </Button>
            <Button variant='outlined' sx={buttonSx} onClick={onCancel}>
              Отменить
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Основной компонент панели сотрудника
export default function EmployeeDashboard() {
  const [value, setValue] = React.useState(0);
  const { data: user } = useUserInfoQuery({});
  const { data: appointments = [], isLoading } =
    useGetEmployeeAppointmentsQuery(user?.id || 0);
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Фильтрация записей
  const upcomingAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDateTime!) > new Date() &&
      !appt.isCancelled &&
      !appt.isCompleted
  );

  const completedAppointments = appointments.filter((appt) => appt.isCompleted);

  const cancelledAppointments = appointments.filter((appt) => appt.isCancelled);

  const handleComplete = (id: number) => {
    updateStatus({ id, isCompleted: true });
  };

  const handleCancel = (id: number) => {
    updateStatus({ id, isCancelled: true });
  };

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
    mb: 2,
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography
        variant='h3'
        gutterBottom
        sx={{ fontFamily: 'Laviossa', color: '#413f3f' }}
      >
        Панель сотрудника
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Предстоящие записи' />
          <Tab label='Выполненные работы' />
          <Tab label='Отмененные записи' />
        </Tabs>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onComplete={() => handleComplete(appointment.id!)}
                  onCancel={() => handleCancel(appointment.id!)}
                />
              ))
            ) : (
              <Typography variant='body1' sx={{ mt: 2 }}>
                Нет предстоящих записей
              </Typography>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {completedAppointments.length > 0 ? (
              completedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onComplete={() => {}}
                  onCancel={() => {}}
                />
              ))
            ) : (
              <Typography variant='body1' sx={{ mt: 2 }}>
                Нет выполненных работ
              </Typography>
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {cancelledAppointments.length > 0 ? (
              cancelledAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onComplete={() => {}}
                  onCancel={() => {}}
                />
              ))
            ) : (
              <Typography variant='body1' sx={{ mt: 2 }}>
                Нет отмененных записей
              </Typography>
            )}
          </TabPanel>
        </>
      )}

      <Button component={Link} to='/' variant='outlined' sx={buttonSx}>
        На главную
      </Button>
    </Box>
  );
}
