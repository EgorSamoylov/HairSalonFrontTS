import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Typography, CircularProgress } from '@mui/material';
import { useUserInfoQuery } from '../../api/userApiSlice';
import '../../App.css';
import Man from '../../images/Man.jpg';

export default function MainPage() {
  // Получаем данные текущего пользователя из API
  const { data: currentUser, isLoading, isError } = useUserInfoQuery({});

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
    if (!name || name.split(' ').length < 2) {
      return {
        sx: {
          bgcolor: '#cccccc',
        },
        children: 'GU',
      };
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography variant='h6'>Ошибка загрузки данных пользователя</Typography>
    );
  }

  const currentUserName = currentUser
    ? [currentUser.firstName, currentUser.lastName].join(' ')
    : 'Гость';

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
            style={{ padding: '0px' }}
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
                to={'/logout'} // Предполагается, что у вас есть страница выхода
                variant='outlined'
                sx={buttonSx}
              >
                Выйти
              </Button>
              <Avatar
                {...stringAvatar(currentUserName)}
                src={currentUser.logoAttachmentUrl || undefined}
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
                sx={buttonSx}
              >
                Вход
              </Button>
              <Button
                component={Link}
                to={'/register'}
                variant='outlined'
                color='primary'
                sx={buttonSx}
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
