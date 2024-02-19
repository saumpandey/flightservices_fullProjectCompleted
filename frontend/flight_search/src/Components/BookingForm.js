import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookFlight() {
  const location = useLocation();
  const history = useNavigate();

  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleClose = () => {
    setOpen(false);
    history('/user/search');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userObject = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      gender: inputs.gender,
      email: inputs.email,
      phoneNo: inputs.phoneNo,
      requiredSeats: inputs.requiredSeats,
      flightId: location.state.flight.flightId,
    };

    try {
      const response = await axios.post('http://localhost:8084/booking/book', userObject);
      setBookingId(response.data.bookingId);
    displayRazorpay(location.state.flight.fare)
    } catch (error) {
      console.log(error);
    }
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNo: '',
    requiredSeats: '',
  });

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
  };
  function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        }

        async function displayRazorpay(fare) {
                    const res = await loadScript(
                        "https://checkout.razorpay.com/v1/checkout.js"
                    );
            
                    if (!res) {
                        alert("Razorpay SDK failed to load. Are you online?");
                        return false;
                    }
            
                    // creating a new order
                    const result = await axios.post("http://localhost:5000/payment/orders");
            
                    if (!result) {
                        alert("Server error. Are you online?");
                        return false;
                    }
            
                    // Getting the order details back
                    const { amount, id: order_id, currency } = result.data;
            
                    const options = {
                        key: "rzp_test_NvZP37F5pncHC3", // Enter the Key ID generated from the Dashboard
                        amount: fare.toString(),
                        currency: currency,
                        name: "capgemini pay",
                        description: "Test Transaction",
                        image: {  },
                        order_id: order_id,
                        handler: async function (response) {
                            const data = {
                                orderCreationId: order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            };
                            setOpen(true);
                            const result = await axios.post("http://localhost:5000/payment/success", data);
                            console.log(data);
                            if (result.data.success) {
                                const userObject = {
                                    firstName: inputs.firstName,
                                    lastName: inputs.lastName,
                                    gender: inputs.gender,
                                    email: inputs.email,
                                    phoneNo: inputs.phoneNo,
                                    requiredSeats: inputs.requiredSeats,
                                    flightId: location.state.flight.flightId
                                };
            
                                axios.post('http://localhost:8084/booking/book', userObject)
                                    .then((res) => {
                                        console.log(res.data);
                                        setBookingId(res.data.bookingId);
                                        setOpen(true);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                            } else {
                                alert("Payment unsuccessful. Please try again.");
                            }
                        },
                        prefill: {
                            name: "saum",
                            email: "saum@example.com",
                            contact: "9999999999",
                        },
                        notes: {
                            address: "Capgemini Ecospace 6B",
                        },
                        theme: {
                            color: "#000000",
                        },
                    };
            
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                }
            

  return (
    <Box component={Paper} elevation={5} sx={{ height:650, width:600, backgroundColor: 'white', borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ m: 2, mt:6.5 }} alignItems="center" direction="column" spacing={2}>
          <Stack sx={{ m: 1 }} alignItems="center" direction="column" spacing={0}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AirplaneTicketIcon fontSize="medium" />
            </Avatar>
            <Typography component="h1" variant="h5" color="black">
              Book Flight
            </Typography>
            <Typography variant="caption">
              {location.state.flight.flightName} flight {location.state.flight.flightId} from {location.state.flight.origin} to {location.state.flight.destination}
            </Typography>
          </Stack>
          <Stack sx={{ m: 1, width: 'stretch' }} alignItems="center" direction="row" spacing={2}>
            <TextField
              required
              fullWidth
              autoFocus
              id="outlined-required-firstName"
              label="First Name"
              name="firstName"
              value={inputs.firstName}
              inputProps={{ pattern: '[a-zA-Z]{3,16}$' }}
              onChange={handleChange('firstName')}
              helperText="3-16 alphabetic chars only"
            />
            <TextField
              required
              fullWidth
              id="outlined-required-lastName"
              label="Last Name"
              name="lastName"
              value={inputs.lastName}
              inputProps={{ pattern: '[a-zA-Z]{3,16}$' }}
              onChange={handleChange('lastName')}
              helperText="3-16 alphabetic chars only"
            />
          </Stack>
          <TextField
            required
            fullWidth
            id="outlined-required-email"
            label="Email"
            name="email"
            value={inputs.email}
            inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9\-]+\.[a-z]{2,4}$'}}
            onChange={handleChange('email')}
            helperText="abc@xyc.com format."
          />
          <TextField
            required
            fullWidth
            id="outlined-required-phoneNo"
            label="Phone Number"
            name="phoneNo"
            value={inputs.phoneNo}
            inputProps={{ pattern: '[0-9]{10}$' }}
            onChange={handleChange('phoneNo')}
            helperText="9876543210 format"
          />
          <Stack alignItems="center" direction="row" spacing={2}>
            <FormControl>
              <FormLabel sx={{ fontSize: 'small' }} id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <ToggleButtonGroup color="primary" size="small" value={inputs.gender} exclusive onChange={handleChange('gender')} aria-label="gender">
                <ToggleButton value="Male">Male</ToggleButton>
                <ToggleButton value="Female">Female</ToggleButton>
                <ToggleButton value="Other">Other</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            <FormControl sx={{ width: '20ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Passengers</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                required
                fullWidth
                type="number"
                value={inputs.requiredSeats}
                onChange={handleChange('requiredSeats')}
                label="Required Seats"
              />
            </FormControl>
          </Stack>
          <Button variant="contained" type="submit">
            Book Flight
          </Button>
          <Stack direction="row" spacing={1}>
            <Link href="/" variant="caption">
              Go back
            </Link>
          </Stack>
        </Stack>
      </form>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle align="center">Booking Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your booking for {location.state.flight.flightName} flight {location.state.flight.flightId} from {location.state.flight.origin} to {location.state.flight.destination} has been confirmed with Booking ID: {bookingId}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BookFlight;
