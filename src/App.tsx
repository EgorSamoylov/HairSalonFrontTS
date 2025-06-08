import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentsPage from './components/main/appointmentsPage';
import NewAppointmentPage from './components/main/newAppointmentPage';
import LoginPage from './components/login/loginPage';
import RegisterPage from './components/register/registerPage';
import MainPage from './components/main/mainPage';
import AppointmentDetailsPage from './components/main/appointmentDetailsPage';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthProtected from './components/AuthProtected';
import LogoutPage from './components/logout/logoutPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/appointments' element={<AppointmentsPage />} />
            <Route path='/appointments/new' element={<NewAppointmentPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/logout' element={<LogoutPage />} />
            <Route
              path='/appointments/:id'
              element={<AppointmentDetailsPage />}
            />

            {/* Protected routes */}
            <Route element={<AuthProtected />}>
              <Route path='/' element={<MainPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
