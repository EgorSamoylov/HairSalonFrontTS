import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentsPage from './components/main/appointmentsPage';
import NewAppointmentPage from './components/main/newAppointmentPage';
import LoginPage from './components/login/loginPage';
import RegisterPage from './components/register/registerPage';
import MainPage from './components/main/mainPage';
import AppointmentDetailsPage from './components/main/appointmentsDetailsPage';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthProtected from './components/AuthProtected';
import LogoutPage from './components/logout/logoutPage';
import RegisterEmployeePage from './components/register/registerEmployeePage';
import EmployeeDashboard from './components/main/employeeDashboard';
import ClientAppointments from './components/main/clientAppointments';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route
              path='/register-employee'
              element={<RegisterEmployeePage />}
            />

            {/* Protected routes */}
            <Route element={<AuthProtected />}>
              <Route path='/' element={<MainPage />} />
              <Route path='/appointments' element={<AppointmentsPage />} />
              <Route
                path='/appointments/new'
                element={<NewAppointmentPage />}
              />
              <Route path='/logout' element={<LogoutPage />} />
              <Route
                path='/appointments/:id'
                element={<AppointmentDetailsPage />}
              />
              <Route
                path='/employee-dashboard'
                element={<EmployeeDashboard />}
              />
              <Route path='/my-appointments' element={<ClientAppointments />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
