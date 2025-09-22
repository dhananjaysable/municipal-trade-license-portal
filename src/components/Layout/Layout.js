import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import Navigation from './Navigation';
import { useApp } from '../../contexts/AppContext';

const Layout = () => {
  const { notification, hideNotification } = useApp();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Outlet />
      </Container>
      
      <Snackbar
        open={notification?.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification?.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;
