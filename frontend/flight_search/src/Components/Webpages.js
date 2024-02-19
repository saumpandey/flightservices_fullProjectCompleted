import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Form from './SearchForm';
import Login from './LoginForm.js';
import Flights from './FlightDetails';
import Register from './RegistrationForm';
import Dashboard from './AdminProfile';
import BookFlight from './BookingForm';
import About from './about';
import PrivateRoute from './auth/PrivateRoute';

const Webpages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route path="/user" element={<PrivateRoute />} >
          <Route path='search' element={<Form/>}/>
          <Route path="flights" element={<Flights />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="book" element={<BookFlight />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Webpages;
