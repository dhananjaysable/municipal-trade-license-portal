import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import {
  Assignment,
  Payment,
  TrackChanges,
  Download,
  Upload,
  Refresh,
  Support,
  Business,
  CheckCircle,
  Schedule,
  Warning,
  Info,
  ArrowForward,
  Person,
  Phone,
  LocationOn,
  Description,
  Gavel
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CitizenDashboard = () => {
  const [citizenData, setCitizenData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsVisible(true);
    // Get verified citizen data from session storage
    const verifiedData = sessionStorage.getItem('citizenVerified');
    if (verifiedData) {
      setCitizenData(JSON.parse(verifiedData));
    } else {
      // Redirect to verification if not verified
      navigate('/citizen/verify');
    }
  }, [navigate]);

  const services = [
    {
      title: 'Apply Online Trade License',
      subtitle: 'New License Application',
      description: 'Submit new trade license application online with digital workflow',
      icon: <Assignment sx={{ fontSize: 40 }} />,
      path: '/citizen/apply',
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      category: 'primary',
      badge: 'Popular'
    },
    {
      title: 'Apply Online Renewal of License',
      subtitle: 'License Renewal',
      description: 'Renew your existing trade license quickly and securely',
      icon: <Refresh sx={{ fontSize: 40 }} />,
      path: '/citizen/renewal',
      color: '#388e3c',
      gradient: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
      category: 'primary'
    },
    {
      title: 'Online Payment',
      subtitle: 'Pay License Fees',
      description: 'Pay license fees and penalties through secure payment gateway',
      icon: <Payment sx={{ fontSize: 40 }} />,
      path: '/citizen/payment',
      color: '#f57c00',
      gradient: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)',
      category: 'primary'
    },
    {
      title: 'Download Receipt & Certificate',
      subtitle: 'Documents Download',
      description: 'Download official certificates and payment receipts',
      icon: <Download sx={{ fontSize: 40 }} />,
      path: '/citizen/download',
      color: '#7b1fa2',
      gradient: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
      category: 'primary'
    },
    {
      title: 'Track Application',
      subtitle: 'Status Tracking',
      description: 'Check real-time status of your license application',
      icon: <TrackChanges sx={{ fontSize: 40 }} />,
      path: '/citizen/track',
      color: '#d32f2f',
      gradient: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
      category: 'secondary'
    },
    {
      title: 'Upload & Document History',
      subtitle: 'Document Management',
      description: 'Manage documents and view upload history',
      icon: <Upload sx={{ fontSize: 40 }} />,
      path: '/citizen/documents',
      color: '#0288d1',
      gradient: 'linear-gradient(135deg, #0288d1 0%, #0277bd 100%)',
      category: 'secondary'
    },
    {
      title: 'RTS (Right to Service)',
      subtitle: 'Grievance Portal',
      description: 'Right to Service complaint and grievance redressal',
      icon: <Gavel sx={{ fontSize: 40 }} />,
      path: '/citizen/rts',
      color: '#5d4037',
      gradient: 'linear-gradient(135deg, #5d4037 0%, #4e342e 100%)',
      category: 'secondary'
    }
  ];

  const primaryServices = services.filter(s => s.category === 'primary');
  const secondaryServices = services.filter(s => s.category === 'secondary');

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, action: 'Application Submitted', type: 'TL-2024-001', status: 'Under Review', date: '2024-01-15' },
    { id: 2, action: 'Payment Completed', type: 'License Fee', status: 'Paid', date: '2024-01-14' },
    { id: 3, action: 'Document Uploaded', type: 'Business Registration', status: 'Verified', date: '2024-01-13' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return 'warning';
      case 'Paid': return 'success';
      case 'Verified': return 'info';
      default: return 'default';
    }
  };

  if (!citizenData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          py: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container>
          <Fade in={isVisible} timeout={1000}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      mr: 2,
                      fontSize: '1.5rem'
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      Welcome, {citizenData.data.citizenName}!
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      Trade License Portal Dashboard
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={() => {
                    sessionStorage.removeItem('citizenVerified');
                    navigate('/citizen/verify');
                  }}
                >
                  Switch Account
                </Button>
              </Box>

              {/* Verification Info */}
              <Paper
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ mr: 1, color: '#4caf50' }} />
                  <Typography variant="h6" fontWeight="600">
                    Verified via {citizenData.type === 'property' ? 'Property Number' : 
                                 citizenData.type === 'license' ? 'License Number' : 'Mobile Number'}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {citizenData.type === 'property' && `Property: ${citizenData.value}`}
                  {citizenData.type === 'license' && `License: ${citizenData.value}`}
                  {citizenData.type === 'mobile' && `Mobile: ${citizenData.value}`}
                </Typography>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* Quick Stats */}
        <Slide direction="up" in={isVisible} timeout={1200}>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" fontWeight="700" color="primary.main" gutterBottom>
                  2
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Active Licenses
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" fontWeight="700" color="warning.main" gutterBottom>
                  1
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Pending Applications
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" fontWeight="700" color="success.main" gutterBottom>
                  5
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Completed Transactions
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Slide>

        {/* Primary Services */}
        <Slide direction="up" in={isVisible} timeout={1400}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
              🏛️ Government Services
            </Typography>
            <Grid container spacing={4}>
              {primaryServices.map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '2px solid transparent',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 20px 60px ${service.color}30`,
                        border: `2px solid ${service.color}`,
                      },
                    }}
                    onClick={() => navigate(service.path)}
                  >
                    {service.badge && (
                      <Chip
                        label={service.badge}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: 16,
                          bgcolor: '#ff6b35',
                          color: 'white',
                          fontWeight: 700,
                          zIndex: 1
                        }}
                      />
                    )}
                    
                    <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: service.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          boxShadow: `0 15px 35px ${service.color}40`,
                          color: 'white',
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Typography variant="h6" fontWeight="700" gutterBottom sx={{ color: service.color, mb: 1 }}>
                        {service.title}
                      </Typography>
                      
                      <Typography variant="body2" fontWeight="600" sx={{ color: 'text.secondary', mb: 2, opacity: 0.8 }}>
                        {service.subtitle}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3, lineHeight: 1.6 }}>
                        {service.description}
                      </Typography>

                      <Button
                        variant="contained"
                        endIcon={<ArrowForward />}
                        fullWidth
                        sx={{
                          background: service.gradient,
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 3,
                          '&:hover': {
                            background: service.gradient,
                            filter: 'brightness(1.1)',
                          },
                        }}
                      >
                        Access Service
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        <Grid container spacing={4}>
          {/* Secondary Services */}
          <Grid item xs={12} md={8}>
            <Slide direction="up" in={isVisible} timeout={1600}>
              <Card>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h5" fontWeight="700" sx={{ color: 'primary.main' }}>
                    📋 Additional Services
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {secondaryServices.map((service, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            borderRadius: 3,
                            height: '100%',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: `0 12px 24px ${service.color}20`,
                            },
                          }}
                          onClick={() => navigate(service.path)}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box
                              sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                background: service.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                                color: 'white',
                              }}
                            >
                              {React.cloneElement(service.icon, { sx: { fontSize: 35 } })}
                            </Box>
                            <Typography variant="h6" fontWeight="600" gutterBottom sx={{ fontSize: '1.1rem' }}>
                              {service.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                              {service.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Card>
            </Slide>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={4}>
            <Slide direction="up" in={isVisible} timeout={1800}>
              <Card>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h5" fontWeight="700" sx={{ color: 'primary.main' }}>
                    📈 Recent Activities
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <List>
                    {recentActivities.map((activity, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'primary.50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'primary.main'
                            }}
                          >
                            {activity.action.includes('Application') && <Assignment />}
                            {activity.action.includes('Payment') && <Payment />}
                            {activity.action.includes('Document') && <Description />}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body1" fontWeight="600">
                                {activity.action}
                              </Typography>
                              <Chip
                                label={activity.status}
                                size="small"
                                color={getStatusColor(activity.status)}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {activity.type}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(activity.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CitizenDashboard;
