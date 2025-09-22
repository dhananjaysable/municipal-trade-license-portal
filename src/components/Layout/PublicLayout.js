// components/Layout/PublicLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Business, Login, Menu, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PublicLayout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/citizen' },
    { label: 'Apply License', path: '/citizen/apply' },
    { label: 'Track Application', path: '/citizen/track' },
    { label: 'Make Payment', path: '/citizen/payment' },
    { label: 'Renewal', path: '/citizen/renewal' },
    { label: 'Support', path: '/citizen/rts' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Enhanced Header */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(21, 101, 192, 0.1)',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              flexGrow: 1,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/citizen')}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
              }}
            >
              <Business sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="700" sx={{ color: 'primary.main' }}>
                Municipal Portal
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Government of Maharashtra
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {menuItems.slice(0, 5).map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Login Button */}
          <Box>
            <Button
              variant="contained"
              startIcon={<Login />}
              onClick={() => navigate('/login?role=admin')}
              sx={{
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                }
              }}
            >
              Admin Login
            </Button>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'block', md: 'none' }, ml: 1 }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280, bgcolor: 'background.paper' }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="700">Menu</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'primary.50' } }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default PublicLayout;
