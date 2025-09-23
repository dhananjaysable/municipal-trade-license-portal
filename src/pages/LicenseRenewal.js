// pages/LicenseRenewal.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import {
  Refresh,
  Search,
  CheckCircle,
  Payment,
  Download,
  Description,
  Receipt,
  ArrowForward,
} from '@mui/icons-material';
import { generateModernCertificate, downloadCertificate } from '../utils/certificateGenerator';

// Local storage keys
const STORAGE_KEYS = {
  LICENSES: 'trade_licenses',
  RENEWALS: 'license_renewals',
  DOCUMENTS: 'license_documents'
};

// Function to generate random license data for any license number [web:6]
const generateLicenseData = (licenseNumber) => {
  const businessNames = [
    'ABC Traders', 'XYZ Commerce', 'Global Enterprises', 'City Mart',
    'Premium Services', 'Elite Solutions', 'Modern Business Co.',
    'Tech Innovators', 'Smart Retail Ltd', 'Future Corp'
  ];
  
  const applicantNames = [
    'John Doe', 'Jane Smith', 'Michael Johnson', 'Sarah Williams',
    'David Brown', 'Lisa Davis', 'Robert Wilson', 'Emily Taylor',
    'James Anderson', 'Maria Garcia'
  ];
  
  const categories = ['Retail', 'Wholesale', 'Services', 'Manufacturing', 'Technology'];
  const addresses = [
    '123 Main Street, City', '456 Business Ave, Downtown',
    '789 Commerce Blvd, Metro', '321 Trade Center, Plaza',
    '654 Market Square, Central'
  ];

  // Generate random data based on license number [web:6]
  const randomIndex = Math.abs(licenseNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0));
  
  return {
    licenseNumber,
    businessName: businessNames[randomIndex % businessNames.length],
    applicantName: applicantNames[randomIndex % applicantNames.length],
    expiryDate: generateRandomExpiryDate(),
    renewalFee: generateRenewalFee(),
    status: 'active',
    category: categories[randomIndex % categories.length],
    address: addresses[randomIndex % addresses.length],
    issueDate: generateRandomIssueDate()
  };
};

// Generate random expiry date (past or near future)
const generateRandomExpiryDate = () => {
  const today = new Date();
  const daysOffset = Math.floor(Math.random() * 365) - 180; // Random date within ±6 months
  const expiryDate = new Date(today.getTime() + (daysOffset * 24 * 60 * 60 * 1000));
  return expiryDate.toISOString().split('T')[0];
};

// Generate random issue date (1-3 years ago)
const generateRandomIssueDate = () => {
  const today = new Date();
  const yearsBack = Math.floor(Math.random() * 3) + 1;
  const issueDate = new Date(today.getFullYear() - yearsBack, today.getMonth(), today.getDate());
  return issueDate.toISOString().split('T')[0];
};

// Generate renewal fee based on license type
const generateRenewalFee = () => {
  const baseFees = [3000, 5000, 7500, 10000, 12500, 15000];
  return baseFees[Math.floor(Math.random() * baseFees.length)];
};

// Validate license number format [web:7]
const validateLicenseNumber = (licenseNumber) => {
  if (!licenseNumber || licenseNumber.trim().length === 0) {
    return { isValid: false, message: 'License number is required' };
  }
  
  if (licenseNumber.trim().length < 3) {
    return { isValid: false, message: 'License number must be at least 3 characters' };
  }
  
  if (licenseNumber.trim().length > 20) {
    return { isValid: false, message: 'License number cannot exceed 20 characters' };
  }
  
  // Allow alphanumeric characters, hyphens, and underscores
  const validPattern = /^[A-Za-z0-9\-_]+$/;
  if (!validPattern.test(licenseNumber.trim())) {
    return { isValid: false, message: 'License number can only contain letters, numbers, hyphens, and underscores' };
  }
  
  return { isValid: true, message: '' };
};

const LicenseRenewal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundLicense, setFoundLicense] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState({
    certificate: null,
    receipt: null,
    summary: null,
  });
  const [renewalDetails, setRenewalDetails] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Initialize local storage
  React.useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.LICENSES)) {
      localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RENEWALS)) {
      localStorage.setItem(STORAGE_KEYS.RENEWALS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify({}));
    }
  }, []);

  const steps = ['Search License', 'Review Details', 'Make Payment', 'Download Documents'];

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setValidationError('');
    
    // Validate license number format [web:7]
    const validation = validateLicenseNumber(searchQuery);
    if (!validation.isValid) {
      setValidationError(validation.message);
      setLoading(false);
      return;
    }
    
    try {
      const trimmedQuery = searchQuery.trim().toUpperCase();
      
      // Get existing licenses from local storage
      const existingLicenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSES) || '{}');
      
      let license;
      if (existingLicenses[trimmedQuery]) {
        // Use existing license data
        license = existingLicenses[trimmedQuery];
      } else {
        // Generate new license data for any entered number [web:6]
        license = generateLicenseData(trimmedQuery);
        
        // Store the generated license for future reference
        existingLicenses[trimmedQuery] = license;
        localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify(existingLicenses));
      }

      // Check if license was recently renewed
      const renewals = JSON.parse(localStorage.getItem(STORAGE_KEYS.RENEWALS) || '[]');
      const recentRenewal = renewals.find(r => 
        r.licenseNumber === license.licenseNumber && 
        new Date(r.renewalDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      );

      if (recentRenewal) {
        setError('This license was recently renewed within the last 30 days. Please wait before applying for another renewal.');
        setLoading(false);
        return;
      }

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      setFoundLicense(license);
      setActiveStep(1);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const currentExpiry = new Date(foundLicense.expiryDate);
      const newExpiryDate = new Date(currentExpiry);
      
      // If license is expired, renew from current date, otherwise extend from expiry date
      if (currentExpiry < new Date()) {
        newExpiryDate.setTime(Date.now());
      }
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      
      const renewalInfo = {
        applicationId: 'REN' + Date.now() + Math.floor(Math.random() * 1000),
        licenseNumber: foundLicense.licenseNumber,
        renewalFee: foundLicense.renewalFee,
        previousExpiryDate: foundLicense.expiryDate,
        newExpiryDate: newExpiryDate.toISOString().split('T')[0],
        renewalDate: new Date().toISOString(),
        paymentDetails: {
          transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 10000),
          amount: foundLicense.renewalFee,
          method: 'Online Payment',
          date: new Date().toISOString(),
          status: 'Success'
        }
      };
      
      // Update license expiry in local storage
      const existingLicenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSES) || '{}');
      if (existingLicenses[foundLicense.licenseNumber]) {
        existingLicenses[foundLicense.licenseNumber].expiryDate = renewalInfo.newExpiryDate;
        existingLicenses[foundLicense.licenseNumber].lastRenewalDate = renewalInfo.renewalDate;
        localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify(existingLicenses));
      }

      // Store renewal info
      const renewals = JSON.parse(localStorage.getItem(STORAGE_KEYS.RENEWALS) || '[]');
      renewals.push(renewalInfo);
      localStorage.setItem(STORAGE_KEYS.RENEWALS, JSON.stringify(renewals));

      setRenewalDetails(renewalInfo);
      await generateDocuments(renewalInfo);
      setActiveStep(3);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateDocuments = async (renewalInfo) => {
    try {
      // Generate certificate
      const certificate = await generateModernCertificate({
        type: 'RENEWAL_CERTIFICATE',
        ...foundLicense,
        newExpiryDate: renewalInfo.newExpiryDate,
        renewalDate: renewalInfo.renewalDate,
        applicationId: renewalInfo.applicationId
      });
      
      // Generate payment receipt
      const receipt = await generateModernCertificate({
        type: 'PAYMENT_RECEIPT',
        ...foundLicense,
        ...renewalInfo.paymentDetails,
        applicationId: renewalInfo.applicationId
      });
      
      // Generate application summary
      const summary = await generateModernCertificate({
        type: 'APPLICATION_SUMMARY',
        ...foundLicense,
        ...renewalInfo,
      });
      
      const generatedDocs = {
        certificate,
        receipt,
        summary,
      };

      // Store documents in local storage
      const allDocuments = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || '{}');
      allDocuments[renewalInfo.applicationId] = generatedDocs;
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(allDocuments));
      
      setDocuments(generatedDocs);
    } catch (err) {
      console.error('Document generation error:', err);
      setError('Error generating documents. Please contact support.');
    }
  };

  const downloadDocument = async (docType, fileName) => {
    const doc = documents[docType];
    if (!doc) {
      setError('Document not available for download.');
      return;
    }
    
    try {
      await downloadCertificate(doc, fileName);
    } catch (err) {
      console.error('Download error:', err);
      setError('Error downloading document. Please try again.');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setFoundLicense(null);
    setActiveStep(0);
    setError('');
    setValidationError('');
    setDocuments({
      certificate: null,
      receipt: null,
      summary: null,
    });
    setRenewalDetails(null);
  };

  // Handle Enter key press for search [web:7]
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !loading && searchQuery.trim()) {
      handleSearch();
    }
  };

  const renderSearchStep = () => (
    <Container maxWidth="md">
      <Card 
        sx={{ 
          borderRadius: '32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #1a73e8, #34a853, #fbbc04, #ea4335)',
          }
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              fontWeight="700"
              sx={{
                background: 'linear-gradient(135deg, #202124 0%, #5f6368 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Search Your License
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '500px', margin: '0 auto' }}
            >
              Enter any license number to begin the renewal process. The system accepts various formats.
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Enter License Number (e.g., TL-2024-001, ABC123, LIC_789)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setValidationError('');
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                error={!!validationError}
                helperText={validationError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'primary.main' }}/>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    height: '56px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover, &.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                disabled={loading || !searchQuery.trim()}
                startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                sx={{
                  height: '56px',
                  background: 'linear-gradient(135deg, #1a73e8 0%, #174ea6 100%)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(26, 115, 232, 0.25)',
                  },
                  '&:disabled': {
                    background: '#e0e0e0',
                  }
                }}
              >
                {loading ? 'Searching...' : 'Search License'}
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 4, 
                borderRadius: '16px',
              }}
            >
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );

  const renderDetailsStep = () => (
    <Container maxWidth="md">
      <Card 
        sx={{ 
          borderRadius: '32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle at top right, rgba(26, 115, 232, 0.08), transparent)',
            borderRadius: '50%',
            transform: 'translate(20%, -20%)',
          }}
        />
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ mb: 4, position: 'relative' }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              fontWeight="700"
              sx={{
                background: 'linear-gradient(135deg, #202124 0%, #5f6368 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              License Details
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Review your license information before proceeding with renewal
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 3, 
            bgcolor: 'rgba(26, 115, 232, 0.03)', 
            borderRadius: '24px',
            mb: 4,
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    License Number
                  </Typography>
                  <Typography variant="h6" fontWeight="600" color="primary.main">
                    {foundLicense.licenseNumber}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Business Name
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    {foundLicense.businessName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Category
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {foundLicense.category}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Applicant Name
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    {foundLicense.applicantName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Expiry
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontWeight="600" 
                    color={new Date(foundLicense.expiryDate) < new Date() ? "error.main" : "warning.main"}
                  >
                    {foundLicense.expiryDate}
                    {new Date(foundLicense.expiryDate) < new Date() && (
                      <Typography variant="caption" display="block" color="error.main">
                        (Expired)
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {foundLicense.address}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Alert 
            severity="info" 
            icon={<Payment sx={{ fontSize: 28 }} />}
            sx={{ 
              borderRadius: '16px',
              mb: 4,
              py: 2,
              backgroundColor: 'primary.50',
              '& .MuiAlert-icon': { 
                fontSize: '24px',
                color: 'primary.main',
              }
            }}
          >
            <Typography variant="subtitle1" fontWeight="600">
              Renewal Fee: ₹{foundLicense.renewalFee.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New expiry date will be one year from {new Date(foundLicense.expiryDate) < new Date() ? 'today' : 'current expiry'}
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Payment />}
              endIcon={<ArrowForward />}
              onClick={handlePayment}
              disabled={loading}
              sx={{
                flex: 2,
                py: 2,
                background: 'linear-gradient(135deg, #1a73e8 0%, #174ea6 100%)',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(26, 115, 232, 0.25)',
                }
              }}
            >
              {loading ? 'Processing Payment...' : 'Proceed to Payment'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setActiveStep(0)}
              sx={{
                flex: 1,
                py: 2,
                borderRadius: '28px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                }
              }}
            >
              Search Again
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );

  const renderDocumentsStep = () => (
    <Container maxWidth="md">
      <Card sx={{ 
        borderRadius: '24px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
      }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="700">
              Renewal Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your license has been renewed successfully. Download your documents below.
            </Typography>
            {renewalDetails && (
              <Box sx={{ mt: 3, p: 3, bgcolor: 'rgba(52, 168, 83, 0.05)', borderRadius: '16px' }}>
                <Typography variant="subtitle1" color="success.main" gutterBottom>
                  Application ID: {renewalDetails.applicationId}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Transaction ID: {renewalDetails.paymentDetails.transactionId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  New Expiry Date: {renewalDetails.newExpiryDate}
                </Typography>
              </Box>
            )}
          </Box>

          <List>
            <ListItem>
              <ListItemIcon>
                <Description color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Renewed License Certificate" 
                secondary="Official trade license certificate with new expiry date"
              />
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => downloadDocument('certificate', `${foundLicense.licenseNumber}_certificate.pdf`)}
                sx={{ borderRadius: '12px' }}
              >
                Download
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Receipt color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Payment Receipt" 
                secondary="Proof of renewal fee payment with transaction details"
              />
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => downloadDocument('receipt', `${foundLicense.licenseNumber}_receipt.pdf`)}
                sx={{ borderRadius: '12px' }}
              >
                Download
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Description color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Application Summary" 
                secondary="Complete renewal application details and history"
              />
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => downloadDocument('summary', `${foundLicense.licenseNumber}_summary.pdf`)}
                sx={{ borderRadius: '12px' }}
              >
                Download
              </Button>
            </ListItem>
          </List>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1a73e8 0%, #174ea6 100%)',
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              Renew Another License
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0}
          sx={{ 
            p: 6, 
            mb: 4, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(52, 168, 83, 0.05) 100%)',
            borderRadius: '32px',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(26, 115, 232, 0.1), transparent 70%)',
              zIndex: 1,
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Refresh 
              sx={{ 
                fontSize: 80, 
                color: 'primary.main',
                mb: 3,
                filter: 'drop-shadow(0 4px 20px rgba(26, 115, 232, 0.2))',
              }} 
            />
            <Typography 
              variant="h2" 
              fontWeight="800" 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #1a73e8 0%, #34a853 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              License Renewal
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Renew any trade license online quickly and securely with our modern platform
            </Typography>
          </Box>
        </Paper>

        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(26, 115, 232, 0.1)',
          }}
        >
          <Stepper 
            activeStep={activeStep}
            sx={{
              '& .MuiStepLabel-root': {
                flexDirection: 'column',
                '& .MuiStepLabel-labelContainer': {
                  marginTop: 1,
                  '& .MuiStepLabel-label': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'text.secondary',
                    '&.Mui-active': {
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                    '&.Mui-completed': {
                      color: 'success.main',
                      fontWeight: 600,
                    },
                  },
                },
                '& .MuiStepIcon-root': {
                  width: '40px',
                  height: '40px',
                  transition: 'all 0.3s ease',
                  '&.Mui-active': {
                    color: 'primary.main',
                    filter: 'drop-shadow(0 4px 8px rgba(26, 115, 232, 0.3))',
                    transform: 'scale(1.2)',
                  },
                  '&.Mui-completed': {
                    color: 'success.main',
                  },
                },
                '& .MuiStepConnector-line': {
                  borderColor: 'rgba(26, 115, 232, 0.2)',
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {activeStep === 0 && renderSearchStep()}
        {activeStep === 1 && renderDetailsStep()}
        {activeStep === 3 && renderDocumentsStep()}
      </Container>
    </Box>
  );
};

export default LicenseRenewal;
