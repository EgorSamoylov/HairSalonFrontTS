import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Typography } from '@mui/material';
import { UserDto } from '../../api/models/user';
import { Roles } from '../../api/models/roles';
import '../../App.css';
import Man from '../../images/Man.jpg';

export default function MainPage() {
  const currentUser: UserDto = {
    id: 1,
    firstName: 'Client',
    lastName: 'User',
    role: Roles.User,
    email: 'client@example.com',
    phoneNumber: '+1234567890',
    logoAttachmentUrl: 'https://example.com/client-avatar.jpg',
  };

  const currentUserName = [currentUser?.firstName, currentUser?.lastName].join(
    ' '
  );

  function stringToColor(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const typographySx = {
    fontFamily: 'Laviossa',
    fontSize: '97px',
    color: '#413f3f',
    padding: '0px',
  };

  const buttonSx = {
    fontSize: '20px',
    fontFamily: 'Neue Machina',
    color: '#000000',
    borderColor: '#000000',
    borderRadius: '18px',
  };
  return (
    <div className='main'>
      <div className='left-main'>
        <div className='main-text'>
          <Typography variant='h1' sx={typographySx} gutterBottom>
            WELCOME TO
          </Typography>

          <Typography variant='h1' sx={typographySx} gutterBottom>
            BARBERSHOP
          </Typography>

          <Typography
            variant='h1'
            sx={typographySx}
            style={{
              padding: '0px',
            }}
            gutterBottom
          >
            ONLY FOR MEN
          </Typography>
        </div>

        <div className='round-block'>
          Салон-парикмахерская с мужским характером
        </div>

        <div className='main-button-block'>
          {currentUser ? (
            <>
              <Button
                component={Link}
                to={'/appointments'}
                variant='outlined'
                sx={buttonSx}
              >
                Выбрать услугу
              </Button>
              <Button
                component={Link}
                to={'/login'}
                variant='outlined'
                sx={buttonSx}
              >
                Выйти
              </Button>
              <Avatar
                {...stringAvatar(currentUserName)}
                src={currentUser?.logoAttachmentUrl}
                style={{ fontSize: '20px', padding: '5px' }}
              />
            </>
          ) : (
            <>
              <Button
                component={Link}
                to={'/login'}
                variant='contained'
                color='primary'
              >
                Вход
              </Button>
              <Button
                component={Link}
                to={'/register'}
                variant='outlined'
                color='primary'
              >
                Регистрация
              </Button>
            </>
          )}
        </div>
      </div>
      <div>
        <img src={Man} alt='man' />
      </div>
    </div>
  );
}
