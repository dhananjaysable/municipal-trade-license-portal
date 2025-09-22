import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import {
  Search,
  Business,
  Phone,
  Home,
  Assignment,
  CheckCircle,
  Security,
  Speed,
  Support,
  ArrowForward,
  VerifiedUser,
  LocationOn,
  Description
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CitizenVerification = () => {
  const [verificationType, setVerificationType] = useState('property');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const verificationTypes = [
    {
      value: 'property',
      label: 'Property Number',
      icon: <Home sx={{ fontSize: 30 }} />,
      placeholder: 'Enter Property Number (e.g., PROP-2024-001)',
      description: 'Verify using your property registration number'
    },
    {
      value: 'license',
      label: 'License Number',
      icon: <Assignment sx={{ fontSize: 30 }} />,
      placeholder: 'Enter License Number (e.g., TL-2024-001)',
      description: 'Verify using your existing trade license number'
    },
    {
      value: 'mobile',
      label: 'Mobile Number',
      icon: <Phone sx={{ fontSize: 30 }} />,
      placeholder: 'Enter Mobile Number (e.g., 9876543210)',
      description: 'Verify using your registered mobile number'
    }
  ];

  const handleVerification = async () => {
    if (!searchValue.trim()) {
      setError('Please enter a valid value');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock verification - in real app, this would call your backend
      const mockData = {
        property: { verified: true, citizenName: 'Rajesh Kumar', address: '123 Main Street, Amravati' },
        license: { verified: true, citizenName: 'Priya Sharma', businessName: 'Sharma Electronics' },
        mobile: { verified: true, citizenName: 'Amit Patel', mobile: searchValue }
      };

      if (mockData[verificationType]?.verified) {
        // Store verification data in session storage
        sessionStorage.setItem('citizenVerified', JSON.stringify({
          type: verificationType,
          value: searchValue,
          data: mockData[verificationType],
          timestamp: new Date().toISOString()
        }));
        
        navigate('/citizen/dashboard');
      } else {
        setError('Verification failed. Please check your details and try again.');
      }
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerification();
    }
  };

  const currentType = verificationTypes.find(type => type.value === verificationType);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #1976d2 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />

      <Container maxWidth="md">
        <Fade in={isVisible} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Slide direction="down" in={isVisible} timeout={800}>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
                    }}
                  >
                    <VerifiedUser sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" fontWeight="800" gutterBottom sx={{ color: 'primary.main' }}>
                    Citizen Verification Portal
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Verify your identity to access trade license services
                  </Typography>
                </Box>
              </Slide>
            </Box>

            {/* Verification Type Selection */}
            <Slide direction="up" in={isVisible} timeout={1000}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: 'primary.main' }}>
                  Select Verification Method
                </Typography>
                <Grid container spacing={2}>
                  {verificationTypes.map((type) => (
                    <Grid item xs={12} sm={4} key={type.value}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: verificationType === type.value ? '2px solid #1565c0' : '2px solid transparent',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(21, 101, 192, 0.2)',
                          },
                        }}
                        onClick={() => {
                          setVerificationType(type.value);
                          setError('');
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Box sx={{ color: verificationType === type.value ? 'primary.main' : 'text.secondary', mb: 2 }}>
                            {type.icon}
                          </Box>
                          <Typography variant="h6" fontWeight="600" gutterBottom>
                            {type.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {type.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Slide>

            <Divider sx={{ my: 4 }} />

            {/* Verification Form */}
            <Slide direction="up" in={isVisible} timeout={1200}>
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: 'primary.main' }}>
                  Enter Your {currentType?.label}
                </Typography>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  placeholder={currentType?.placeholder}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currentType?.icon}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'white',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(21, 101, 192, 0.1)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 12px rgba(21, 101, 192, 0.2)',
                      }
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerification}
                  disabled={loading || !searchValue.trim()}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                  endIcon={!loading && <ArrowForward />}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(21, 101, 192, 0.4)',
                    },
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </Box>
            </Slide>

            {/* Features */}
            <Slide direction="up" in={isVisible} timeout={1400}>
              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ textAlign: 'center', color: 'primary.main' }}>
                  Why Verify Your Identity?
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { icon: <Security />, title: 'Secure Access', desc: 'Protect your personal information' },
                    { icon: <Speed />, title: 'Fast Processing', desc: 'Quick verification and service access' },
                    { icon: <Support />, title: '24/7 Support', desc: 'Get help whenever you need it' }
                  ].map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: 'primary.50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: 'primary.main'
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Slide>

            {/* Help Section */}
            <Slide direction="up" in={isVisible} timeout={1600}>
              <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: 'primary.main' }}>
                  Need Help?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  If you're having trouble verifying your identity, please contact our support team:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Chip
                    icon={<Phone />}
                    label="Helpline: +91-721-2530000"
                    variant="outlined"
                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                  />
                  <Chip
                    icon={<LocationOn />}
                    label="Visit Municipal Office"
                    variant="outlined"
                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                  />
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default CitizenVerification;
