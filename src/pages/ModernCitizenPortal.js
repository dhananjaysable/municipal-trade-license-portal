import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  alpha,
  useTheme,
  Paper,
} from '@mui/material';
import { Search, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ModernServiceCard from '../components/ModernServiceCard';

const servicesData = [
  {
    title: 'Apply for New License',
    description: 'Start your business journey with a new trade license application',
    path: '/citizen/apply',
    gradient: 'linear-gradient(135deg, #0066CC 0%, #47a3ff 100%)',
    icon: '🏢',
  },
  {
    title: 'Renew License',
    description: 'Quick and easy renewal process for your existing trade license',
    path: '/citizen/renewal',
    gradient: 'linear-gradient(135deg, #34A853 0%, #66BB6A 100%)',
    icon: '🔄',
  },
  {
    title: 'Track Application',
    description: 'Real-time tracking of your license application status',
    path: '/citizen/track',
    gradient: 'linear-gradient(135deg, #4285F4 0%, #7BAAF7 100%)',
    icon: '📱',
  },
  {
    title: 'Make Payment',
    description: 'Secure payment gateway for license fees and renewals',
    path: '/citizen/payment',
    gradient: 'linear-gradient(135deg, #FBBC04 0%, #FDD663 100%)',
    icon: '💳',
  },
];

const ModernCitizenPortal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/citizen/verify?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '40px', md: '56px' },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Municipal Trade License Portal
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      display: 'block',
                    }}
                  >
                    Made Simple
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  Streamlined digital services for business licenses, renewals, and more.
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 500,
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Search by license number or business name"
                    variant="standard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <Search
                          sx={{
                            mr: 1,
                            color: theme.palette.text.secondary,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      mx: 2,
                      '& input': {
                        py: 1.5,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      borderRadius: '12px',
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Search
                  </Button>
                </Paper>
              </Box>
            </Grid>

            {/* Hero Image/Illustration would go here */}
            <Grid item xs={12} md={6}>
              {/* Add hero illustration or image */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 8,
              fontSize: { xs: '32px', md: '48px' },
              fontWeight: 700,
            }}
          >
            Our Services
          </Typography>

          <Grid container spacing={4}>
            {servicesData.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ModernServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  gradient={service.gradient}
                  onClick={() => navigate(service.path)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '32px', md: '48px' },
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                Why Choose Our Portal?
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Fast Processing',
                    description: 'Get your license processed in just 3-5 business days',
                    icon: '⚡',
                  },
                  {
                    title: 'Secure Platform',
                    description: 'End-to-end encryption for all your sensitive data',
                    icon: '🔒',
                  },
                  {
                    title: '24/7 Support',
                    description: 'Round-the-clock assistance for all your queries',
                    icon: '💬',
                  },
                ].map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h1" sx={{ mb: 2, fontSize: '40px' }}>
                        {feature.icon}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add features illustration */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              fontWeight: 700,
              mb: 3,
              color: 'white',
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of businesses who trust our platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/citizen/apply')}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ModernCitizenPortal;