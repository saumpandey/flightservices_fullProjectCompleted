import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { isLoggedIn } from './auth';

const StaticAppBar = () => {

  const handleLogout = () =>{
    localStorage.clear()
    console.log("Logged Out!!")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ backgroundColor: '#222', color: '#fff' }}>
          <Tooltip title="Home">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                ml: 10,
                mr: 2,
                animation: 'flight 3s infinite',
                '@keyframes flight': {
                  '0%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' },
                  '100%': { transform: 'translateY(0)' },
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Typography
            fontFamily="Montserrat, sans-serif"
            fontWeight={600}
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Universal Airlines
          </Typography>
          <Button
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            size="large"
            href="/about"
            color="inherit"
          >
            About us
          </Button>
          
          {isLoggedIn() ? (
            <Button
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                mr: 10,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              size="large"
              href="/"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
            <Button
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            size="large"
            href="/register"
            color="inherit"
          >
            Sign Up
          </Button>
            <Button
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                mr: 10,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              size="large"
              href="/"
              color="inherit"
            >
              Login
            </Button></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default StaticAppBar;
