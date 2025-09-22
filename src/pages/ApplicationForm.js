import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Fade,
  Slide,
  Chip,
  Divider,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Upload,
  ArrowBack,
  ArrowForward,
  Send,
  CheckCircle,
  Person,
  Business,
  Description,
  Visibility,
  Security,
  Speed,
  Support,
  Close,
  Info,
  Warning,
  Error,
  Star,
  TrendingUp,
  Assignment,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Description as DocIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import FileUpload from '../components/Forms/FileUpload';

const ApplicationForm = () => {
  const { user } = useAuth();
  const { submitApplication, loading } = useApp();
  const navigate = useNavigate();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: user?.name || '',
    businessName: '',
    businessType: '',
    businessAddress: '',
    contactNumber: user?.phone || '',
    email: user?.email || '',
    licenseType: '',
    businessDescription: '',
    expectedStartDate: '',
    documents: []
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    { 
      label: 'Personal Information', 
      icon: <Person />, 
      description: 'Your contact details',
      color: '#4285f4'
    },
    { 
      label: 'Business Details', 
      icon: <Business />, 
      description: 'Business information',
      color: '#34a853'
    },
    { 
      label: 'Document Upload', 
      icon: <Upload />, 
      description: 'Required documents',
      color: '#fbbc04'
    },
    { 
      label: 'Review & Submit', 
      icon: <CheckCircle />, 
      description: 'Final review',
      color: '#ea4335'
    }
  ];

  const businessTypes = [
    'Retail Shop',
    'Restaurant/Food Service',
    'Manufacturing',
    'Service Provider',
    'Trading Company',
    'Healthcare',
    'Education',
    'Technology',
    'Construction',
    'Other'
  ];

  const licenseTypes = [
    'General Trade License',
    'Food & Beverage License',
    'Manufacturing License',
    'Professional Service License',
    'Retail Trade License',
    'Wholesale Trade License',
    'Import/Export License'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Applicant Details
        if (!formData.applicantName.trim()) newErrors.applicantName = 'Name is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        break;

      case 1: // Business Information
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
        if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
        if (!formData.licenseType) newErrors.licenseType = 'License type is required';
        if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
        if (!formData.expectedStartDate) newErrors.expectedStartDate = 'Expected start date is required';
        break;

      case 2: // Documents
        if (formData.documents.length === 0) newErrors.documents = 'At least one document is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    const applicationData = {
      ...formData,
      applicantId: user?.id,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 year from now
    };

    const result = await submitApplication(applicationData);
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/citizen/application/${result.application.id}`);
      }, 2000);
    }
  };

  const handleDocumentUpload = (uploadedFiles) => {
    setFormData(prev => ({
      ...prev,
      documents: uploadedFiles
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Fade in={isVisible} timeout={600}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'visible',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${steps[0].color}, ${alpha(steps[0].color, 0.7)})`,
                  borderRadius: '16px 16px 0 0'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${steps[0].color}, ${alpha(steps[0].color, 0.8)})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      boxShadow: `0 8px 24px ${alpha(steps[0].color, 0.3)}`
                    }}
                  >
                    <Person sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'text.primary' }}>
                      Personal Information
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Tell us about yourself and your contact details
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                      error={!!errors.applicantName}
                      helperText={errors.applicantName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Contact Number"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      error={!!errors.contactNumber}
                      helperText={errors.contactNumber}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        );

      case 1:
        return (
          <Fade in={isVisible} timeout={600}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'visible',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${steps[1].color}, ${alpha(steps[1].color, 0.7)})`,
                  borderRadius: '16px 16px 0 0'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${steps[1].color}, ${alpha(steps[1].color, 0.8)})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      boxShadow: `0 8px 24px ${alpha(steps[1].color, 0.3)}`
                    }}
                  >
                    <Business sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'text.primary' }}>
                      Business Information
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Details about your business and license requirements
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Business Name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      error={!!errors.businessName}
                      helperText={errors.businessName}
                      InputProps={{
                        startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth 
                      required 
                      error={!!errors.businessType}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    >
                      <InputLabel>Business Type</InputLabel>
                      <Select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                      >
                        {businessTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Business Address"
                      multiline
                      rows={3}
                      value={formData.businessAddress}
                      onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                      error={!!errors.businessAddress}
                      helperText={errors.businessAddress}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary', mt: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl 
                      fullWidth 
                      required 
                      error={!!errors.licenseType}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    >
                      <InputLabel>License Type</InputLabel>
                      <Select
                        value={formData.licenseType}
                        onChange={(e) => handleInputChange('licenseType', e.target.value)}
                      >
                        {licenseTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expected Start Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.expectedStartDate}
                      onChange={(e) => handleInputChange('expectedStartDate', e.target.value)}
                      error={!!errors.expectedStartDate}
                      helperText={errors.expectedStartDate}
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Business Description"
                      multiline
                      rows={4}
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                      error={!!errors.businessDescription}
                      helperText={errors.businessDescription}
                      placeholder="Describe your business activities, services, or products..."
                      InputProps={{
                        startAdornment: <Description sx={{ mr: 1, color: 'text.secondary', mt: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                          },
                          '&.Mui-focused': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        );

      case 2:
        return (
          <Fade in={isVisible} timeout={600}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'visible',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${steps[2].color}, ${alpha(steps[2].color, 0.7)})`,
                  borderRadius: '16px 16px 0 0'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${steps[2].color}, ${alpha(steps[2].color, 0.8)})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      boxShadow: `0 8px 24px ${alpha(steps[2].color, 0.3)}`
                    }}
                  >
                    <Upload sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'text.primary' }}>
                      Document Upload
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Upload required documents for your license application
                    </Typography>
                  </Box>
                </Box>

                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 4, 
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.info.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Info sx={{ mr: 1, color: 'info.main' }} />
                    <Typography variant="body2">
                      <strong>Accepted formats:</strong> PDF, JPG, PNG (Max 10MB per file)
                    </Typography>
                  </Box>
                </Alert>

                <FileUpload
                  onFilesUploaded={handleDocumentUpload}
                  existingFiles={formData.documents}
                />
                {errors.documents && (
                  <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                    {errors.documents}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Fade>
        );

      case 3:
        return (
          <Fade in={isVisible} timeout={600}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                overflow: 'visible',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${steps[3].color}, ${alpha(steps[3].color, 0.7)})`,
                  borderRadius: '16px 16px 0 0'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${steps[3].color}, ${alpha(steps[3].color, 0.8)})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      boxShadow: `0 8px 24px ${alpha(steps[3].color, 0.3)}`
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'text.primary' }}>
                      Review Your Application
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Please review all information before submitting
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1, fontSize: 16 }} />
                        Applicant Name
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {formData.applicantName}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Business sx={{ mr: 1, fontSize: 16 }} />
                        Business Name
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {formData.businessName}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.success.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Business Type
                      </Typography>
                      <Chip 
                        label={formData.businessType} 
                        color="success" 
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.warning.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        License Type
                      </Typography>
                      <Chip 
                        label={formData.licenseType} 
                        color="warning" 
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.info.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                        Business Address
                      </Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        {formData.businessAddress}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ mr: 1, fontSize: 16 }} />
                        Contact Number
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        {formData.contactNumber}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ mr: 1, fontSize: 16 }} />
                        Email Address
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        {formData.email}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(theme.palette.secondary.main, 0.02) }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <DocIcon sx={{ mr: 1, fontSize: 16 }} />
                        Uploaded Documents ({formData.documents.length})
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {formData.documents.map((doc, index) => (
                          <Chip
                            key={index}
                            label={`${doc.name} (${doc.size})`}
                            variant="outlined"
                            sx={{ mr: 1, mb: 1 }}
                            icon={<DocIcon />}
                          />
                        ))}
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <Fade in={showSuccess} timeout={1000}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="sm">
            <Card
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  animation: 'pulse 2s infinite'
                }}
              >
                <CheckCircle sx={{ fontSize: 50, color: 'white' }} />
              </Box>
              <Typography variant="h3" fontWeight="700" gutterBottom sx={{ color: 'success.main' }}>
                Application Submitted!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Your trade license application has been successfully submitted and is under review.
              </Typography>
              <LinearProgress sx={{ mb: 4, borderRadius: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Redirecting to application details...
              </Typography>
            </Card>
          </Container>
        </Box>
      </Fade>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(21,101,192,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245,124,0,0.05) 0%, transparent 50%)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        {/* Header Section */}
        <Fade in={isVisible} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              fontWeight="900" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Trade License Application
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              Apply for your trade license in just a few simple steps
            </Typography>
            
            {/* Progress Indicator */}
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <LinearProgress 
                variant="determinate" 
                value={(activeStep + 1) * 25} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4, 
                  mb: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #1565c0, #0d47a1)'
                  }
                }} 
              />
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1} of {steps.length} • {Math.round(((activeStep + 1) / steps.length) * 100)}% Complete
              </Typography>
            </Box>
          </Box>
        </Fade>

        {/* Modern Stepper */}
        <Slide direction="up" in={isVisible} timeout={1000}>
          <Card
            sx={{
              mb: 4,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              overflow: 'visible'
            }}
          >
            <Box sx={{ p: 4 }}>
              <Grid container spacing={2}>
                {steps.map((step, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: activeStep >= index 
                          ? alpha(step.color, 0.1) 
                          : alpha(theme.palette.grey[500], 0.05),
                        border: activeStep >= index 
                          ? `2px solid ${alpha(step.color, 0.3)}` 
                          : `2px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: activeStep >= index 
                            ? `linear-gradient(135deg, ${step.color}, ${alpha(step.color, 0.8)})`
                            : alpha(theme.palette.grey[400], 0.3),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          boxShadow: activeStep >= index 
                            ? `0 8px 24px ${alpha(step.color, 0.3)}`
                            : 'none'
                        }}
                      >
                        {activeStep > index ? (
                          <CheckCircle sx={{ fontSize: 24, color: 'white' }} />
                        ) : (
                          React.cloneElement(step.icon, { 
                            sx: { 
                              fontSize: 24, 
                              color: activeStep >= index ? 'white' : theme.palette.grey[500] 
                            } 
                          })
                        )}
                      </Box>
                      <Typography variant="h6" fontWeight="600" gutterBottom sx={{ 
                        color: activeStep >= index ? step.color : 'text.secondary',
                        fontSize: '0.9rem'
                      }}>
                        {step.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        </Slide>

        {/* Step Content */}
        <Slide direction="up" in={isVisible} timeout={1200}>
          <Box sx={{ mb: 4 }}>
            {renderStepContent()}
          </Box>
        </Slide>

        {/* Action Buttons */}
        <Slide direction="up" in={isVisible} timeout={1400}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              p: 3
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                Back
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                      boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(76, 175, 80, 0.4)',
                      },
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(21, 101, 192, 0.4)',
                      },
                    }}
                  >
                    Next Step
                  </Button>
                )}
              </Box>
            </Box>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default ApplicationForm;
