import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@mui/styled-engine';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  width: '100%',
  animation: `${fadeIn} 0.5s ease-in`,
});

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const Form = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [flight, setFlight] = useState({
    flightNumber: '123',
      origin: 'NewYork',
      destination: 'London',
      departureTime: '10:00 AM',
      arrivalTime: '5:00 PM',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/user/flights', { state: { origin: inputs.origin, destination: inputs.destination } });
  };


  console.log('Flight State:', flight); // Check the value of flight

  return (
    <Box
      component="form"
      elevation={3}
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        maxWidth: 600,
        margin: 'auto',
        animation: `${fadeIn} 0.5s ease-in`,
      }}
      onSubmit={handleSubmit}
    >
      <StyledForm >
        <TextField
          required
          autoFocus
          label="From"
          name="origin"
          value={inputs.origin || ''}
          inputProps={{ pattern: '[a-zA-Z]{3,15}$' }}
          onChange={handleChange}
        />
        <TextField
          required
          label="To"
          name="destination"
          value={inputs.destination || ''}
          inputProps={{ pattern: '[a-zA-Z]{3,15}$' }}
          onChange={handleChange}
        />
        <StyledButton variant="contained" type="submit" onClick={handleSubmit}>
          Search Flight
        </StyledButton>
      </StyledForm >

      {flight && (
        <Box mt={4}>
          <Typography variant="h6">Flight Details</Typography>
          <Typography variant="body1">Flight Number: {flight.flightNumber}</Typography>
          <Typography variant="body1">Origin: {flight.origin}</Typography>
          <Typography variant="body1">Destination: {flight.destination}</Typography>
          <Typography variant="body1">Departure Time: {flight.departureTime}</Typography>
          <Typography variant="body1">Arrival Time: {flight.arrivalTime}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Form;