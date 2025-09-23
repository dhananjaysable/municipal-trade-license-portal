// pages/OnlinePayment.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  InputAdornment,
  IconButton,
  Chip,
  Container,
  useTheme,
} from '@mui/material';
import {
  Search,
  Payment,
  CreditCard,
  AccountBalance,
  Phone,
  CheckCircle,
  Receipt,
  Clear,
  ContentCopy,
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';

const OnlinePayment = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    upiId: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState('');
  const { applications, updateApplicationStatus } = useApp();

  const steps = ['Search Application', 'Payment Details', 'Payment Confirmation'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setTimeout(() => {
      const foundApplication = applications.find(app =>
        app.id.toString().includes(searchQuery) ||
        app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.contactNumber?.includes(searchQuery)
      );

      if (foundApplication) {
        const applicationWithPayment = {
          ...foundApplication,
          feeAmount: 5000,
          pendingAmount: 5000,
          paymentStatus: 'pending',
        };
        setSelectedApplication(applicationWithPayment);
        setActiveStep(1);
      } else {
        setError('No application found with the provided details. Please check your information and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentStatus('success');
      if (selectedApplication) {
        updateApplicationStatus(selectedApplication.id, 'payment_completed');
      }
      setActiveStep(2);
      setLoading(false);
    }, 3000);
  };

  const generateTransactionId = () => {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const copyTransactionId = (txnId) => {
    navigator.clipboard.writeText(txnId);
  };

  const renderSearchStep = () => (
    <Paper sx={{
      p: 5,
      textAlign: 'center',
      maxWidth: 600,
      mx: 'auto',
      borderRadius: 3,
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      backgroundColor: theme.palette.background.paper,
    }}>
      <Typography variant="h4" fontWeight="600" gutterBottom>
        Search Your Application
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        Enter your application details to proceed with payment
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter Application ID, Name, Email, or Phone Number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchQuery('')} edge="end" aria-label="Clear search input">
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSearch}
        disabled={loading || !searchQuery.trim()}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 6px 15px rgb(139 92 246 / 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 8px 20px rgb(124 58 237 / 0.6)',
          },
        }}
      >
        {loading ? 'Searching...' : 'Search Application'}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 4, fontWeight: 500 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );

  const renderPaymentStep = () => (
    <Grid container spacing={6} sx={{ maxWidth: 960, mx: 'auto' }}>
      {/* Application Details */}
      <Grid item xs={12} md={5}>
        <Card elevation={3} sx={{ borderRadius: 3, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="700" gutterBottom>
              Application Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                License Number
              </Typography>
              <Typography variant="subtitle1" fontWeight="600">
                {selectedApplication.licenseNumber}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                Applicant Name
              </Typography>
              <Typography variant="subtitle1" fontWeight="500">
                {selectedApplication.applicantName}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                Business Name
              </Typography>
              <Typography variant="subtitle1" fontWeight="500">
                {selectedApplication.businessName}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                License Type
              </Typography>
              <Typography variant="subtitle1" fontWeight="500">
                {selectedApplication.licenseType}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">License Fee:</Typography>
              <Typography variant="body1" fontWeight="700">
                ₹{selectedApplication.feeAmount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Processing Fee:</Typography>
              <Typography variant="body1" fontWeight="700">₹500</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="800">Total Amount:</Typography>
              <Typography variant="h6" fontWeight="800" color="primary">
                ₹{(selectedApplication.feeAmount + 500).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Form */}
      <Grid item xs={12} md={7}>
        <Card elevation={3} sx={{ borderRadius: 3, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="700" gutterBottom>
              Payment Method
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Select Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Select Payment Method"
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.grey[400],
                  }
                }}
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="netbanking">Net Banking</MenuItem>
              </Select>
            </FormControl>

            {paymentMethod === 'card' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Holder Name"
                    value={paymentDetails.holderName}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, holderName: e.target.value }))}
                    variant="outlined"
                    margin="dense"
                    sx={{ borderRadius: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            )}

            {paymentMethod === 'upi' && (
              <TextField
                fullWidth
                label="UPI ID"
                placeholder="username@paytm"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="dense"
                sx={{ mt: 1 }}
                InputLabelProps={{ shrink: true }}
              />
            )}

            {paymentMethod === 'netbanking' && (
              <FormControl fullWidth>
                <InputLabel>Select Bank</InputLabel>
                <Select
                  label="Select Bank"
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.grey[400],
                    }
                  }}
                >
                  <MenuItem value="sbi">State Bank of India</MenuItem>
                  <MenuItem value="hdfc">HDFC Bank</MenuItem>
                  <MenuItem value="icici">ICICI Bank</MenuItem>
                  <MenuItem value="axis">Axis Bank</MenuItem>
                </Select>
              </FormControl>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePayment}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Payment />}
              sx={{
                mt: 4,
                py: 1.8,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                boxShadow: '0 6px 15px rgb(52 211 153 / 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #22c55e 100%)',
                  boxShadow: '0 8px 20px rgb(34 197 94 / 0.7)',
                },
              }}
            >
              {loading ? 'Processing Payment...' : `Pay ₹${(selectedApplication.feeAmount + 500).toLocaleString()}`}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderConfirmationStep = () => {
    const transactionId = generateTransactionId();

    return (
      <Paper sx={{
        p: 6,
        maxWidth: 600,
        mx: 'auto',
        textAlign: 'center',
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        backgroundColor: theme.palette.background.paper,
      }}>
        <CheckCircle sx={{ fontSize: 90, color: 'success.main', mb: 4 }} />
        <Typography variant="h4" fontWeight="700" gutterBottom color="success.main">
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          Your payment has been processed successfully. You will receive a confirmation email shortly.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                Transaction ID
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="h6" fontWeight="700" sx={{ userSelect: 'text' }}>
                  {transactionId}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyTransactionId(transactionId)}
                  aria-label="Copy transaction id"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.5 }}>
                Amount Paid
              </Typography>
              <Typography variant="h6" fontWeight="700" color="success.main" sx={{ mt: 1 }}>
                ₹{(selectedApplication.feeAmount + 500).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Receipt />}
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              textTransform: 'none',
              fontWeight: 600,
              px: 5,
              py: 1.8,
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              },
            }}
          >
            Download Receipt
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 5,
              py: 1.8,
              textTransform: 'none',
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Track Application Status
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 10 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="700"
        gutterBottom
        sx={{ mb: 6, fontFamily: "'Roboto', sans-serif" }}
      >
        Online Payment Portal
      </Typography>

      {/* Stepper */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 6,
          maxWidth: 700,
          mx: 'auto',
          borderRadius: 8,
          backgroundColor: 'background.paper',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{
                '& .MuiStepLabel-label': {
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      {activeStep === 0 && renderSearchStep()}
      {activeStep === 1 && renderPaymentStep()}
      {activeStep === 2 && renderConfirmationStep()}

      {/* Help Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 10,
          textAlign: 'center',
          bgcolor: 'grey.100',
          borderRadius: 3,
          maxWidth: 500,
          mx: 'auto',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.03)',
        }}
      >
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Payment Support
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          For payment related queries, contact our support team
        </Typography>
        <Chip
          label="24/7 Support Available"
          color="primary"
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 2,
            py: 0.5,
            borderRadius: 5,
            boxShadow: '0 3px 15px rgb(99 102 241 / 0.35)',
          }}
        />
      </Paper>
    </Container>
  );
};

export default OnlinePayment;
