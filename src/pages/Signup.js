import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Fade,
  Slide,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  PersonAdd,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  LocationOn,
  Business,
  CheckCircle,
  ArrowForward,
  Security,
  Speed,
  Support
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
    });
    if (error) setError('');
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.name && formData.email && /\S+@\S+\.\S+/.test(formData.email);
      case 1:
        return formData.phone && formData.address;
      case 2:
        return formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword && 
               formData.password.length >= 6 && formData.agreeToTerms;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;

    setLoading(true);
    setError('');

    try {
      const { confirmPassword, agreeToTerms, ...userData } = formData;
      const result = await signup(userData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: 'Account Information',
      description: 'Basic account details',
    },
    {
      label: 'Contact Details',
      description: 'Phone and address',
    },
    {
      label: 'Security & Terms',
      description: 'Password and agreement',
    },
  ];

  const benefits = [
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Fast Setup',
      description: 'Get started in under 2 minutes',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security for your data',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <Support sx={{ fontSize: 48 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance when you need it',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              error={formData.email && !/\S+@\S+\.\S+/.test(formData.email)}
              helperText={formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'Please enter a valid email' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              error={formData.password && formData.password.length < 6}
              helperText={formData.password && formData.password.length < 6 ? 'Password must be at least 6 characters' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  name="agreeToTerms"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Typography component="span" color="primary.main" fontWeight="600">
                    Terms of Service
                  </Typography>
                  {' '}and{' '}
                  <Typography component="span" color="primary.main" fontWeight="600">
                    Privacy Policy
                  </Typography>
                </Typography>
              }
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 80%, white 2px, transparent 2px),
                           radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          animation: 'float 25s ease-in-out infinite',
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh' }}>
          {/* Left Side - Benefits */}
          <Grid item xs={12} lg={6}>
            <Fade in={isVisible} timeout={1000}>
              <Box sx={{ color: 'white', pr: { lg: 6 } }}>
                <Slide direction="right" in={isVisible} timeout={800}>
                  <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '20px',
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(20px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Business sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="h2" fontWeight="800" gutterBottom>
                          Join Municipal Pro
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                          Start your licensing journey today
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h4" sx={{ mb: 4, fontWeight: 300, lineHeight: 1.4 }}>
                      Create your account and unlock the future of 
                      <Box component="span" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {' '}business licensing
                      </Box>
                    </Typography>
                  </Box>
                </Slide>

                {/* Benefits */}
                <Grid container spacing={3}>
                  {benefits.map((benefit, index) => (
                    <Grid item xs={12} key={index}>
                      <Slide direction="right" in={isVisible} timeout={1000 + index * 200}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 4,
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateX(10px)',
                              background: 'rgba(255, 255, 255, 0.15)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 90,
                              height: 90,
                              borderRadius: 3,
                              background: benefit.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 3,
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            {benefit.icon}
                          </Box>
                          <Box>
                            <Typography variant="h5" fontWeight="700" gutterBottom>
                              {benefit.title}
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                              {benefit.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Signup Form */}
          <Grid item xs={12} lg={6}>
            <Slide direction="left" in={isVisible} timeout={800}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, sm: 5 },
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h3" fontWeight="800" gutterBottom>
                    Create Account
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    Join thousands of businesses already using our platform
                  </Typography>
                </Box>

                {error && (
                  <Fade in={true}>
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                      {error}
                    </Alert>
                  </Fade>
                )}

                {/* Stepper */}
                <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        StepIconComponent={({ active, completed }) => (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: completed 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : active 
                                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                  : '#e2e8f0',
                              color: completed || active ? 'white' : '#64748b',
                              fontWeight: 600,
                            }}
                          >
                            {completed ? <CheckCircle sx={{ fontSize: 20 }} /> : index + 1}
                          </Box>
                        )}
                      >
                        <Typography variant="h6" fontWeight="600">
                          {step.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Box sx={{ mt: 2, mb: 2 }}>
                          {renderStepContent(index)}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                            disabled={!validateStep(index) || loading}
                            endIcon={index === steps.length - 1 ? null : <ArrowForward />}
                            sx={{
                              mr: 1,
                              px: 4,
                              py: 1.5,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              index === steps.length - 1 ? 'Create Account' : 'Continue'
                            )}
                          </Button>
                          <Button
                            disabled={index === 0 || loading}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                {/* Login Link */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Typography component="span" color="primary.main" fontWeight="700">
                        Sign In
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Signup;
