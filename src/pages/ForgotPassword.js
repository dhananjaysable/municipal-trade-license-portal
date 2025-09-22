// pages/ForgotPassword.js
import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  Slide,
  Fade,
} from '@mui/material';
import {
  LockReset,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
  CheckCircle,
  Send,
  Security,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const steps = ['Verify Email', 'Enter Code', 'Reset Password'];

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      strength: [minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length,
      checks: { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar }
    };
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return '#ef4444';
    if (strength <= 3) return '#f59e0b';
    if (strength <= 4) return '#3b82f6';
    return '#10b981';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        // Generate a random 6-digit code for demo
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        setMessage(`Verification code sent to ${email}. Demo code: ${code}`);
        setActiveStep(1);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (verificationCode !== generatedCode) {
      setError('Invalid verification code. Please check and try again.');
      setLoading(false);
      return;
    }

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage('Code verified successfully!');
    setActiveStep(2);
    setLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const passwordValidation = validatePassword(newPassword);
    
    if (!passwordValidation.isValid) {
      setError('Password does not meet security requirements');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword(email, newPassword);
      if (result.success) {
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Enter your email address and we'll send you a verification code to reset your password.
            </Typography>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={email && !validateEmail(email)}
              helperText={email && !validateEmail(email) ? 'Please enter a valid email address' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !validateEmail(email)}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </Box>
        );
      
      case 1:
        return (
          <Box component="form" onSubmit={handleCodeVerification}>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Enter the 6-digit verification code sent to your email address.
            </Typography>
            <TextField
              required
              fullWidth
              name="verificationCode"
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              disabled={loading}
              placeholder="000000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Security sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& input': {
                  fontSize: '1.25rem',
                  letterSpacing: '0.5rem',
                  textAlign: 'center',
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || verificationCode.length !== 6}
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              sx={{ py: 1.5, mb: 2 }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setActiveStep(0)}
              disabled={loading}
            >
              Use Different Email
            </Button>
          </Box>
        );

      case 2:
        const passwordValidation = validatePassword(newPassword);
        
        return (
          <Box component="form" onSubmit={handlePasswordReset}>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Create a new secure password for your account.
            </Typography>
            
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              sx={{ mb: 2 }}
            />

            {/* Password Strength Indicator */}
            {newPassword && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Password Strength
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: getPasswordStrengthColor(passwordValidation.strength) }}
                  >
                    {getPasswordStrengthText(passwordValidation.strength)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Box
                      key={level}
                      sx={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: level <= passwordValidation.strength 
                          ? getPasswordStrengthColor(passwordValidation.strength)
                          : '#e2e8f0',
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries({
                    'minLength': '8+ characters',
                    'hasUpperCase': 'Uppercase letter',
                    'hasLowerCase': 'Lowercase letter',
                    'hasNumbers': 'Number',
                    'hasSpecialChar': 'Special character'
                  }).map(([key, label]) => (
                    <Typography
                      key={key}
                      variant="caption"
                      sx={{
                        color: passwordValidation.checks[key] ? 'success.main' : 'text.secondary',
                        fontSize: '0.75rem'
                      }}
                    >
                      {passwordValidation.checks[key] ? '✓' : '○'} {label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
            
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              error={confirmPassword && newPassword !== confirmPassword}
              helperText={confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !passwordValidation.isValid || newPassword !== confirmPassword}
              startIcon={loading ? <CircularProgress size={20} /> : <LockReset />}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Slide direction="up" in={true} timeout={800}>
          <Paper 
            elevation={24}
            sx={{ 
              p: 4, 
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <LockReset sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" fontWeight="700" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Secure password reset for your account
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Messages */}
            {message && (
              <Fade in={true}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  {message}
                </Alert>
              </Fade>
            )}

            {error && (
              <Fade in={true}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Step Content */}
            {renderStepContent()}

            {/* Back to Login */}
            <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #e2e8f0' }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/login')}
                variant="text"
                sx={{ color: 'text.secondary' }}
              >
                Back to Login
              </Button>
            </Box>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
