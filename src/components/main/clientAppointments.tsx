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
  useGetClientAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from '../../api/appointmentApiSlice';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

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
      id={`client-tabpanel-${index}`}
      aria-labelledby={`client-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ClientAppointments() {
  const [value, setValue] = React.useState(0);
  const { data: user } = useUserInfoQuery({});
  const { data: appointments = [], isLoading } = useGetClientAppointmentsQuery(
    user?.id || 0
  );
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const upcomingAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDateTime!) > new Date() && !appt.isCancelled
  );

  const pastAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointmentDateTime!) <= new Date() && !appt.isCancelled
  );

  const cancelledAppointments = appointments.filter((appt) => appt.isCancelled);

  const handleCancel = (id: number) => {
    updateStatus({ id, isCancelled: true });
  };

  const buttonSx = {
    fontSize: '16px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
    px: 3,
    py: 1,
    '&:hover': {
      backgroundColor: '#e0e0e0',
      borderColor: '#000000',
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: '#adadad',
        minHeight: '100vh',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        {/* Заголовок по центру с кнопкой под ним слева */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Laviossa',
              color: '#413f3f',
            }}
          >
            Мои записи
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Button
              component={Link}
              to='/'
              variant='outlined'
              sx={{
                ...buttonSx,
                backgroundColor: '#c9c8c8',
              }}
            >
              На главную
            </Button>
          </Box>
        </Box>

        <Card sx={{ backgroundColor: '#c9c8c8', borderRadius: '18px' }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant='fullWidth'
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#413f3f',
                  },
                }}
              >
                <Tab
                  label='Предстоящие'
                  sx={{
                    fontFamily: 'Neue Machina',
                    color: value === 0 ? '#413f3f' : 'inherit',
                    fontSize: '0.875rem',
                  }}
                />
                <Tab
                  label='Прошедшие'
                  sx={{
                    fontFamily: 'Neue Machina',
                    color: value === 1 ? '#413f3f' : 'inherit',
                    fontSize: '0.875rem',
                  }}
                />
                <Tab
                  label='Отмененные'
                  sx={{
                    fontFamily: 'Neue Machina',
                    color: value === 2 ? '#413f3f' : 'inherit',
                    fontSize: '0.875rem',
                  }}
                />
              </Tabs>
            </Box>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TabPanel value={value} index={0}>
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        sx={{
                          mb: 2,
                          backgroundColor: '#e0e0e0',
                          borderRadius: '12px',
                        }}
                      >
                        <CardContent>
                          <Typography variant='h6' gutterBottom>
                            {appointment.service?.serviceName}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            gutterBottom
                          >
                            Мастер: {appointment.employee?.firstName}{' '}
                            {appointment.employee?.lastName}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            gutterBottom
                          >
                            Дата:{' '}
                            {format(
                              new Date(appointment.appointmentDateTime!),
                              'dd.MM.yyyy HH:mm',
                              { locale: ru }
                            )}
                          </Typography>
                          <Typography variant='body1' mt={1}>
                            Примечание: {appointment.notes || 'Нет примечаний'}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant='outlined'
                              sx={{
                                fontSize: '14px',
                                fontFamily: 'Neue Machina',
                                color: '#000000',
                                borderColor: '#000000',
                                borderRadius: '18px',
                                px: 2,
                                '&:hover': {
                                  backgroundColor: '#d5d5d5',
                                },
                              }}
                              onClick={() => handleCancel(appointment.id!)}
                            >
                              Отменить запись
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography
                      variant='body1'
                      sx={{
                        mt: 2,
                        textAlign: 'center',
                        fontFamily: 'Neue Machina',
                      }}
                    >
                      Нет предстоящих записей
                    </Typography>
                  )}
                </TabPanel>

                <TabPanel value={value} index={1}>
                  {pastAppointments.length > 0 ? (
                    pastAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        sx={{
                          mb: 2,
                          backgroundColor: '#e0e0e0',
                          borderRadius: '12px',
                        }}
                      >
                        <CardContent>
                          <Typography variant='h6' gutterBottom>
                            {appointment.service?.serviceName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Дата:{' '}
                            {format(
                              new Date(appointment.appointmentDateTime!),
                              'dd.MM.yyyy HH:mm',
                              { locale: ru }
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography
                      variant='body1'
                      sx={{
                        mt: 2,
                        textAlign: 'center',
                        fontFamily: 'Neue Machina',
                      }}
                    >
                      Нет прошедших записей
                    </Typography>
                  )}
                </TabPanel>

                <TabPanel value={value} index={2}>
                  {cancelledAppointments.length > 0 ? (
                    cancelledAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        sx={{
                          mb: 2,
                          backgroundColor: '#e0e0e0',
                          borderRadius: '12px',
                        }}
                      >
                        <CardContent>
                          <Typography variant='h6' gutterBottom>
                            {appointment.service?.serviceName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Дата:{' '}
                            {format(
                              new Date(appointment.appointmentDateTime!),
                              'dd.MM.yyyy HH:mm',
                              { locale: ru }
                            )}
                          </Typography>
                          <Typography
                            color='error'
                            sx={{ fontFamily: 'Neue Machina' }}
                          >
                            Статус: Отменена
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography
                      variant='body1'
                      sx={{
                        mt: 2,
                        textAlign: 'center',
                        fontFamily: 'Neue Machina',
                      }}
                    >
                      Нет отмененных записей
                    </Typography>
                  )}
                </TabPanel>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
