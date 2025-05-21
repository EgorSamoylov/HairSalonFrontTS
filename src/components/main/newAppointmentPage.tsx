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
} from '@mui/material';
import { AmenityDto } from '../../api/models/amenity';
import { UserDto } from '../../api/models/user';

export default function NewAppointmentPage() {
  const navigate = useNavigate();
  const [selectedAmenity, setSelectedAmenity] = useState<number>(0);
  const [notes, setNotes] = useState('');

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
      description: 'Стильная профессиональная стрижка',
      durationMinutes: 30,
      price: 25,
    },
    {
      id: 2,
      serviceName: 'Окрас волос',
      description: 'Сервис окраса волос',
      durationMinutes: 60,
      price: 50,
    },
    {
      id: 3,
      serviceName: 'Стильная стрижка',
      description: 'Специальная стильная стрижка',
      durationMinutes: 45,
      price: 35,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    console.log({
      amenityId: selectedAmenity,
      notes,
    });
    navigate('/appointments');
  };

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
                          {amenity.durationMinutes} min)
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
                    <Avatar src={currentUser.logoAttachmentUrl} />
                    <div style={{ marginLeft: '16px' }}>
                      <Typography>
                        {currentUser.firstName} {currentUser.lastName}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {currentUser.email}
                      </Typography>
                    </div>
                  </div>

                  <TextField
                    label='Телефон'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={currentUser.phoneNumber}
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
                    ОТМЕНА
                  </Button>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    sx={buttonSx}
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
