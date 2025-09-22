import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Grid,
  Fade,
  Slide,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Business,
  Speed,
  Security,
  CheckCircle,
  ArrowForward,
  Google,
  GitHub,
  Apple
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  useEffect(() => {
    setIsVisible(true);
    // If user is already logged in and is an admin, redirect to admin dashboard
    if (user && user.role === 'admin') {
      const redirectPath = location.state?.from?.pathname || '/admin/dashboard';
      navigate(redirectPath, { replace: true });
    }
    // If no role specified or not admin, redirect to citizen portal
    else if (!role || role !== 'admin') {
      navigate('/citizen', { replace: true });
    }
  }, [user, navigate, location, role]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Admin login attempt with:', formData.email);
      const result = await login(formData.email, formData.password);
      console.log('Login result:', result);
      
      if (result.success) {
        // Ensure we have the user object and role
        if (!result.user) {
          console.error('User object missing in login result');
          setError('Login successful but user data is missing');
          setLoading(false);
          return;
        }
        
        // Only allow admin login
        if (result.user.role === 'admin') {
          const redirectPath = location.state?.from?.pathname || '/admin/dashboard';
          console.log('Redirecting to:', redirectPath, 'User role:', result.user.role);
          navigate(redirectPath, { replace: true });
        } else {
          setError('Only administrators can login to this portal');
          console.log('Non-admin login attempt rejected');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    const credentials = role === 'admin' 
      ? { email: 'admin@portal.com', password: 'admin123' }
      : { email: 'user@portal.com', password: 'user123' };
    
    console.log('Demo login with:', credentials);
    const result = await login(credentials.email, credentials.password);
    console.log('Demo login result:', result);
    if (result.success) {
      const redirectPath = location.state?.from?.pathname || 
                        (role === 'admin' ? '/admin/dashboard' : '/citizen/dashboard');
      console.log('Redirecting to:', redirectPath);
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
    setLoading(false);
  };

  const features = [
    { 
      icon: <Speed sx={{ fontSize: 40 }} />, 
      title: 'Lightning Fast', 
      desc: 'Process applications in minutes, not days',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      icon: <Security sx={{ fontSize: 40 }} />, 
      title: 'Bank-Grade Security', 
      desc: 'Your data is protected with enterprise security',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      icon: <CheckCircle sx={{ fontSize: 40 }} />, 
      title: '99.9% Uptime', 
      desc: 'Reliable service you can count on 24/7',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const socialLogins = [
    { icon: <Google />, name: 'Google', color: '#4285f4' },
    { icon: <GitHub />, name: 'GitHub', color: '#333' },
    { icon: <Apple />, name: 'Apple', color: '#000' }
  ];

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
      {/* Animated Background Elements */}
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

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 100, md: 200 },
            height: { xs: 100, md: 200 },
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${0.05 + i * 0.02})`,
            backdropFilter: 'blur(10px)',
            left: `${10 + i * 20}%`,
            top: `${10 + i * 15}%`,
            animation: `float ${10 + i * 2}s ease-in-out infinite`,
            transform: `rotate(${i * 45}deg)`,
          }}
        />
      ))}

      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh' }}>
          {/* Left Side - Features & Branding */}
          <Grid item xs={12} lg={7}>
            <Fade in={isVisible} timeout={1000}>
              <Box sx={{ color: 'white', pr: { lg: 8 } }}>
                {/* Logo & Title */}
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
                          Municipal Pro
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                          Trade License Management Platform
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 300, lineHeight: 1.4 }}>
                      Transform your business licensing experience with our 
                      <Box component="span" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {' '}next-generation platform
                      </Box>
                    </Typography>
                  </Box>
                </Slide>

                {/* Features Grid */}
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Slide direction="right" in={isVisible} timeout={1000 + index * 200}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 3,
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
                              width: 80,
                              height: 80,
                              borderRadius: 3,
                              background: feature.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 3,
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                              {feature.title}
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                              {feature.desc}
                            </Typography>
                          </Box>
                        </Box>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>

                {/* Stats */}
                <Slide direction="right" in={isVisible} timeout={1600}>
                  <Grid container spacing={4} sx={{ mt: 4 }}>
                    {[
                      { number: '10K+', label: 'Active Users' },
                      { number: '25K+', label: 'Licenses Processed' },
                      { number: '99.9%', label: 'Uptime' },
                      { number: '24/7', label: 'Support' }
                    ].map((stat, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" fontWeight="800" gutterBottom>
                            {stat.number}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Slide>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} lg={5}>
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
                  <Typography variant="h3" fontWeight="800" gutterBottom sx={{ color: 'text.primary' }}>
                    Welcome Back! 👋
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    Sign in to continue to your dashboard
                  </Typography>
                </Box>

                {/* Social Login */}
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  {socialLogins.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      startIcon={social.icon}
                      sx={{
                        py: 1.5,
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: social.color,
                          color: social.color,
                          bgcolor: `${social.color}05`,
                        },
                      }}
                    >
                      {social.name}
                    </Button>
                  ))}
                </Stack>

                <Divider sx={{ mb: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Or continue with email
                  </Typography>
                </Divider>

                {error && (
                  <Fade in={true}>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3, 
                        borderRadius: 3,
                        '& .MuiAlert-message': {
                          fontSize: '0.9rem'
                        }
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                {/* Login Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'action.active' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        height: 56,
                      }
                    }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
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
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        height: 56,
                      }
                    }}
                  />

                  {/* Remember Me & Forgot Password */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          Remember me
                        </Typography>
                      }
                    />
                    <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" color="primary.main" fontWeight="600">
                        Forgot password?
                      </Typography>
                    </Link>
                  </Box>
                  
                  {/* Login Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={loading ? null : <ArrowForward />}
                    sx={{
                      py: 2,
                      mb: 3,
                      fontSize: '1rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  {/* Demo Accounts */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
                      Try demo accounts
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('admin')}
                        disabled={loading}
                        sx={{
                          py: 1.2,
                          borderColor: 'primary.200',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'primary.50',
                          },
                        }}
                      >
                        Admin Demo
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('user')}
                        disabled={loading}
                        sx={{
                          py: 1.2,
                          borderColor: 'primary.200',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'primary.50',
                          },
                        }}
                      >
                        User Demo
                      </Button>
                    </Stack>
                  </Box>

                  {/* Sign Up Link */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Typography component="span" color="primary.main" fontWeight="700">
                          Create Account
                        </Typography>
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
