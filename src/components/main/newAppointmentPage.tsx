import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useUserInfoQuery } from '../../api/userApiSlice';
import { useAmenitiesQuery } from '../../api/amenityApiSlice';
import {
  useAppointmentsQuery,
  useCreateAppointmentMutation,
} from '../../api/appointmentApiSlice';

export default function NewAppointmentPage() {
  const navigate = useNavigate();
  const [selectedAmenity, setSelectedAmenity] = useState<number>(0);
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date().toISOString()
  );
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [createAppointment, { isLoading: isSubmitting }] =
    useCreateAppointmentMutation();
  const { data: currentUser, isLoading: isUserLoading } = useUserInfoQuery({});
  const { data: amenities, isLoading: isAmenitiesLoading } = useAmenitiesQuery(
    {}
  );
  const { refetch } = useAppointmentsQuery({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedAmenity || !currentUser?.id) {
      setError('Пожалуйста, выберите услугу');
      return;
    }

    try {
      const appointmentData = {
        clientId: currentUser.id,
        employeeId: 1, // Можно добавить выбор парикмахера
        amenityId: selectedAmenity,
        appointmentDateTime: new Date(appointmentDate),
        notes: notes,
      };

      await createAppointment(appointmentData).unwrap();

      setSuccess(true);
      await refetch();
      setTimeout(() => navigate('/appointments'), 1500);
    } catch (err) {
      console.error('Ошибка при создании записи:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };

  if (isUserLoading || isAmenitiesLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!currentUser || !amenities) {
    return <Typography variant='h6'>Ошибка загрузки данных</Typography>;
  }

  return (
    <div className='appointment'>
      <div className='appointment-content'>
        <Typography variant='h3' align='center' gutterBottom>
          Новая запись
        </Typography>

        <Card>
          <CardContent style={{ backgroundColor: '#c9c8c8' }}>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div>
                  <FormControl fullWidth margin='normal'>
                    <InputLabel id='amenity-label'>Услуга</InputLabel>
                    <Select
                      labelId='amenity-label'
                      value={selectedAmenity}
                      onChange={(e) =>
                        setSelectedAmenity(Number(e.target.value))
                      }
                      label='Услуга'
                      required
                    >
                      {amenities.map((amenity) => (
                        <MenuItem key={amenity.id} value={amenity.id}>
                          {amenity.serviceName} (${amenity.price},{' '}
                          {amenity.durationMinutes} мин)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <TextField
                    label='Дата и время записи'
                    type='datetime-local'
                    fullWidth
                    margin='normal'
                    value={appointmentDate.substring(0, 16)}
                    onChange={(e) =>
                      setAppointmentDate(new Date(e.target.value).toISOString())
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div>
                  <Typography variant='h6' gutterBottom>
                    Информация о Вас
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Avatar src={currentUser.logoAttachmentUrl || undefined} />
                    <Grid ml={2}>
                      <Typography>
                        {currentUser.firstName} {currentUser.lastName}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {currentUser.email}
                      </Typography>
                    </Grid>
                  </div>

                  <TextField
                    label='Телефон'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={currentUser.phoneNumber || 'Не указан'}
                    disabled
                  />

                  <TextField
                    label='Примечание'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    multiline
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '16px',
                    marginTop: '16px',
                  }}
                >
                  <Button
                    component={Link}
                    to='/appointments'
                    variant='outlined'
                    color='secondary'
                    sx={buttonSx}
                    disabled={isSubmitting}
                  >
                    Отмена
                  </Button>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    sx={buttonSx}
                    disabled={!selectedAmenity || isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Записаться'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Запись успешно создана!
        </Alert>
      </Snackbar>
    </div>
  );
}
