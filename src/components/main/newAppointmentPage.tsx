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
} from '@mui/material';
import { useUserInfoQuery } from '../../api/userApiSlice';
import { useAmenitiesQuery } from '../../api/amenityApiSlice';
import { useAppointmentsQuery } from '../../api/appointmentApiSlice';

export default function NewAppointmentPage() {
  const navigate = useNavigate();
  const [selectedAmenity, setSelectedAmenity] = useState<number>(0);
  const [notes, setNotes] = useState('');

  // Получаем данные текущего пользователя
  const { data: currentUser, isLoading: isUserLoading } = useUserInfoQuery({});

  // Получаем список услуг
  const { data: amenities, isLoading: isAmenitiesLoading } = useAmenitiesQuery(
    {}
  );

  // Получаем список записей (для создания новой)
  const { refetch } = useAppointmentsQuery({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAmenity || !currentUser?.id) return;

    try {
      // В реальном приложении здесь будет вызов API для создания записи
      // Пока просто имитируем успешное создание
      console.log('Creating appointment with:', {
        clientId: currentUser.id,
        serviceId: selectedAmenity,
        notes,
      });

      // Обновляем список записей
      await refetch();

      navigate('/appointments');
    } catch (error) {
      console.error('Ошибка при создании записи:', error);
    }
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
                        setSelectedAmenity(e.target.value as number)
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
                  >
                    Отмена
                  </Button>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    sx={buttonSx}
                    disabled={!selectedAmenity}
                  >
                    Записаться
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
