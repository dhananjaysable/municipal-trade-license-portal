import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  Badge,
  Fade,
  Slide
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  Add,
  AdminPanelSettings,
  Logout,
  Menu as MenuIcon,
  NotificationsOutlined,
  Business
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const navigationItems = user?.role === 'admin' ? [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard /> },
    { label: 'Applications', path: '/admin/applications', icon: <AdminPanelSettings /> },
  ] : [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'New Application', path: '/apply', icon: <Add /> },
  ];

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 2,
          mt: 1,
          '& .MuiMenuItem-root': {
            borderRadius: 1,
            margin: '4px 8px',
          },
        },
      }}
    >
      {navigationItems.map((item) => (
        <MenuItem
          key={item.path}
          onClick={() => {
            navigate(item.path);
            handleMobileMenuClose();
          }}
          selected={location.pathname === item.path}
          sx={{
            gap: 2,
            minWidth: 200,
          }}
        >
          {item.icon}
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 2,
          mt: 1,
          '& .MuiMenuItem-root': {
            borderRadius: 1,
            margin: '4px 8px',
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary">
          Signed in as
        </Typography>
        <Typography variant="body2" fontWeight="600">
          {user?.name || user?.email}
        </Typography>
      </Box>
      <MenuItem onClick={() => { 
        navigate(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'); 
        handleMenuClose(); 
      }} sx={{ gap: 2 }}>
        <Dashboard fontSize="small" />
        Dashboard
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ gap: 2, color: 'error.main' }}>
        <Logout fontSize="small" />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Business sx={{ color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Municipal Portal
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Trade License Management
              </Typography>
            </Box>
          </Box>

          {user && (
            <>
              {isMobile ? (
                <IconButton
                  onClick={handleMobileMenuOpen}
                  edge="end"
                  sx={{
                    bgcolor: 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      startIcon={item.icon}
                      onClick={() => navigate(item.path)}
                      variant={location.pathname === item.path ? 'contained' : 'text'}
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        color: location.pathname === item.path ? 'white' : 'text.primary',
                        '&:hover': {
                          backgroundColor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Notifications">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <Badge badgeContent={2} color="error">
                      <NotificationsOutlined />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 0,
                      ml: 1,
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                        fontWeight: 600,
                      }}
                    >
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
        
        {renderMobileMenu}
        {renderProfileMenu}
      </AppBar>
    </Slide>
  );
};

export default Navigation;
