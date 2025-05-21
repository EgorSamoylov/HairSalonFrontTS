import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentsPage from './components/main/appointmentsPage';
import NewAppointmentPage from './components/main/newAppointmentPage';
import LoginPage from './components/login/loginPage';
import RegisterPage from './components/register/registerPage';
import MainPage from './components/main/mainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/appointments' element={<AppointmentsPage />} />
        <Route path='/appointments/new' element={<NewAppointmentPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
