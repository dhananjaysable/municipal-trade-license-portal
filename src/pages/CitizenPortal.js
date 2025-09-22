// pages/CitizenPortal.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search,
  Assignment,
  Payment,
  TrackChanges,
  Business,
  Download,
  Upload,
  Refresh,
  Support,
  ArrowForward,
  CheckCircle,
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Gavel,
  ExpandMore,
  Security,
  Speed,
  Star,
  TrendingUp,
  Info,
  HelpOutline,
  Login,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CitizenPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      path: '/citizen/track',
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
    },
    {
      title: 'Customer Support',
      subtitle: '24/7 Support',
      description: 'Get help and support for your queries and issues',
      icon: <Support sx={{ fontSize: 40 }} />,
      path: '/support',
      color: '#455a64',
      gradient: 'linear-gradient(135deg, #455a64 0%, #37474f 100%)',
      category: 'secondary'
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/citizen/verify?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const primaryServices = services.filter(s => s.category === 'primary');
  const secondaryServices = services.filter(s => s.category === 'secondary');

  const faqs = [
    {
      question: 'How long does it take to process a trade license application?',
      answer: 'Typically, trade license applications are processed within 7-10 working days from the date of submission, provided all required documents are submitted correctly.'
    },
    {
      question: 'What documents are required for trade license application?',
      answer: 'Required documents include: Business registration certificate, Identity proof (Aadhar/PAN), Address proof, Property documents, Passport size photographs, and business-specific certificates.'
    },
    {
      question: 'Can I track my application status online?',
      answer: 'Yes, you can track your application status in real-time using your application ID, email address, or mobile number through our Track Application service.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major payment methods including Credit/Debit cards, UPI (PhonePe, GPay, Paytm), Net Banking, and Digital Wallets for your convenience.'
    }
  ];

  return (
    <Box>
      {/* Government Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          py: 1.5,
          textAlign: 'center',
          borderBottom: '3px solid #ffd700',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #ffd700, #ff6f00, #ffd700)',
          }
        }}
      >
        <Container>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Business sx={{ fontSize: 36, mr: 2 }} />
                <Box>
                  <Typography variant="h5" fontWeight="bold">Municipal Trade License Portal</Typography>
                  <Typography variant="subtitle2">Government of Maharashtra</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<Login />}
                onClick={() => navigate('/login?role=admin')}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                Admin Access
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          position: 'relative',
          py: { xs: 6, md: 10 },
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
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {/* Government Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #ffd700, transparent, #ffd700)',
                        zIndex: -1,
                      }
                    }}
                  >
                    <Business sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="900" color="primary.main" sx={{ lineHeight: 1.1 }}>
                      Municipal Portal
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Trade License Management System
                    </Typography>
                  </Box>
                </Box>

                <Typography 
                  variant="h2" 
                  fontWeight="900" 
                  gutterBottom 
                  sx={{ 
                    fontSize: { xs: '2rem', md: '3rem' },
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                  }}
                >
                  Digital Trade Licensing
                </Typography>

                <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, fontWeight: 500 }}>
                  Streamlined online portal for trade license applications, renewals, payments, and tracking. 
                  Serving citizens with transparency and digital convenience.
                </Typography>

                {/* Key Features */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[
                    { icon: <Security />, text: 'Secure & Trusted' },
                    { icon: <Speed />, text: 'Fast Processing' },
                    { icon: <Support />, text: '24/7 Support' },
                  ].map((feature, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            bgcolor: 'primary.50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1,
                            color: 'primary.main'
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography variant="caption" fontWeight="600">
                          {feature.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Assignment />}
                  onClick={() => navigate('/citizen/verify')}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    boxShadow: '0 8px 32px rgba(21, 101, 192, 0.4)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(21, 101, 192, 0.5)',
                    }
                  }}
                >
                  Access Services Now
                </Button>
              </Box>
            </Grid>

            {/* Search Section */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(21, 101, 192, 0.1)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h5" fontWeight="700" gutterBottom sx={{ color: 'primary.main' }}>
                  🔍 Quick Search Portal
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Search your license or application using any of the following
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter License Number, Email, Mobile Number, or Business Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'primary.main' }} />
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
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                  startIcon={<Search />}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)',
                    mb: 3,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Search License / Application
                </Button>

                {/* Quick Stats */}
                <Grid container spacing={2}>
                  {[
                    { label: 'Active Licenses', value: '25,000+', icon: <CheckCircle />, color: '#2e7d32' },
                    { label: 'Processing Time', value: '3-5 Days', icon: <Speed />, color: '#1565c0' },
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                        <Box sx={{ color: stat.color, mb: 1 }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="h6" fontWeight="700" color={stat.color}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Primary Services Section */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight="900" gutterBottom sx={{ color: 'primary.main' }}>
              🏛️ Government Services
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Access all trade license services through our digital platform
            </Typography>
          </Box>

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
                    {/* Service Icon */}
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
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -2,
                          borderRadius: '50%',
                          background: `conic-gradient(from 180deg, ${service.color}, transparent, ${service.color})`,
                          zIndex: -1,
                          opacity: 0.5,
                        }
                      }}
                    >
                      {service.icon}
                    </Box>

                    {/* Service Content */}
                    <Typography variant="h6" fontWeight="700" gutterBottom sx={{ color: service.color, mb: 1 }}>
                      {service.title}
                    </Typography>
                    
                    <Typography variant="body2" fontWeight="600" sx={{ color: 'text.secondary', mb: 2, opacity: 0.8 }}>
                      {service.subtitle}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3, lineHeight: 1.6 }}>
                      {service.description}
                    </Typography>

                    {/* Action Button */}
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
        </Container>
      </Box>

      {/* Secondary Services */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="700" gutterBottom sx={{ mb: 6, color: 'primary.main' }}>
            📋 Additional Services
          </Typography>
          <Grid container spacing={3}>
            {secondaryServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="700" gutterBottom sx={{ color: 'primary.main' }}>
              ❓ Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get answers to common questions about trade licensing
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} elevation={0} sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'primary.50' }
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact & Support Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container>
          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="700" gutterBottom>
                📞 Contact Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ fontSize: 24 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Helpline</Typography>
                    <Typography variant="h6" fontWeight="600">+91-721-2530000</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ fontSize: 24 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Email Support</Typography>
                    <Typography variant="h6" fontWeight="600">licenses@municipal.gov.in</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOn sx={{ fontSize: 24, mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Address</Typography>
                    <Typography variant="body1" fontWeight="500">
                      Municipal Corporation Building<br />
                      Amravati, Maharashtra 444601
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccessTime sx={{ fontSize: 24 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Office Hours</Typography>
                    <Typography variant="body1" fontWeight="500">Mon-Fri: 9:00 AM - 6:00 PM</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="700" gutterBottom>
                🔗 Quick Links
              </Typography>
              <List>
                {[
                  'Trade License Guidelines',
                  'Fee Structure & Payment',
                  'Required Documents',
                  'Processing Timeline',
                  'Renewal Procedures',
                  'Grievance Redressal',
                ].map((link, index) => (
                  <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                    <ListItemIcon>
                      <ArrowForward sx={{ color: 'white', fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={link}
                      primaryTypographyProps={{
                        sx: { fontSize: '0.95rem', '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* AI Support */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="700" gutterBottom>
                🤖 AI Assistant
              </Typography>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: 'white' }}>
                  24/7 Smart Support
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  Get instant help with our AI chatbot:
                </Typography>
                <List dense>
                  {[
                    'License search & tracking',
                    'Application guidance',
                    'Payment assistance',
                    'Document requirements',
                    'Real-time status updates',
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ sx: { fontSize: '0.85rem', color: 'white' } }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '& .MuiAlert-icon': { color: 'primary.main' }
                  }}
                >
                  <Typography variant="body2">
                    <strong>Pro Tip:</strong> Click the chat icon (bottom right) to start!
                  </Typography>
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, bgcolor: '#0d47a1', color: 'white', textAlign: 'center' }}>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" fontWeight="600">
                🏛️ Municipal Trade License Portal
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Serving citizens with digital excellence and transparency
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2025 Municipal Corporation. All rights reserved.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                🇮🇳 Powered by Digital India Initiative
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CitizenPortal;
