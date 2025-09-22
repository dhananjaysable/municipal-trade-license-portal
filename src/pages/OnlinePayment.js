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
    // Simulate API call
    setTimeout(() => {
      const foundApplication = applications.find(app => 
        app.id.toString().includes(searchQuery) ||
        app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.contactNumber?.includes(searchQuery)
      );

      if (foundApplication) {
        // Add payment-related fields to the application
        const applicationWithPayment = {
          ...foundApplication,
          feeAmount: 5000, // Fixed fee amount
          pendingAmount: 5000,
          paymentStatus: 'pending'
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
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      // Update application status to paid
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
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Search Your Application
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
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
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchQuery('')}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSearch}
        disabled={loading || !searchQuery.trim()}
        startIcon={loading ? <CircularProgress size={20} /> : <Search />}
        sx={{
          px: 4,
          py: 1.5,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        }}
      >
        {loading ? 'Searching...' : 'Search Application'}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 3, maxWidth: 500, mx: 'auto' }}>
          {error}
        </Alert>
      )}
    </Paper>
  );

  const renderPaymentStep = () => (
    <Grid container spacing={4}>
      {/* Application Details */}
      <Grid item xs={12} md={5}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Application Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                License Number
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {selectedApplication.licenseNumber}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Applicant Name
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {selectedApplication.applicantName}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Business Name
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {selectedApplication.businessName}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                License Type
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {selectedApplication.licenseType}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">License Fee:</Typography>
              <Typography variant="body1" fontWeight="600">
                ₹{selectedApplication.feeAmount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Processing Fee:</Typography>
              <Typography variant="body1" fontWeight="600">₹500</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="700">Total Amount:</Typography>
              <Typography variant="h6" fontWeight="700" color="primary">
                ₹{(selectedApplication.feeAmount + 500).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Form */}
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Select Payment Method"
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
                    onChange={(e) => setPaymentDetails(prev => ({...prev, holderName: e.target.value}))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails(prev => ({...prev, cardNumber: e.target.value}))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails(prev => ({...prev, expiryDate: e.target.value}))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails(prev => ({...prev, cvv: e.target.value}))}
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
                onChange={(e) => setPaymentDetails(prev => ({...prev, upiId: e.target.value}))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {paymentMethod === 'netbanking' && (
              <FormControl fullWidth>
                <InputLabel>Select Bank</InputLabel>
                <Select
                  label="Select Bank"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalance />
                      </InputAdornment>
                    ),
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
              startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
              sx={{
                mt: 3,
                py: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
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
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
        <Typography variant="h4" fontWeight="700" gutterBottom color="success.main">
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your payment has been processed successfully. You will receive a confirmation email shortly.
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">
                Transaction ID
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight="700">
                  {transactionId}
                </Typography>
                <IconButton size="small" onClick={() => copyTransactionId(transactionId)}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">
                Amount Paid
              </Typography>
              <Typography variant="h6" fontWeight="700" color="success.main">
                ₹{(selectedApplication.feeAmount + 500).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Receipt />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            Download Receipt
          </Button>
          <Button variant="outlined">
            Track Application Status
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Online Payment Portal
      </Typography>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      {activeStep === 0 && renderSearchStep()}
      {activeStep === 1 && renderPaymentStep()}
      {activeStep === 2 && renderConfirmationStep()}

      {/* Help Section */}
      <Paper sx={{ p: 4, mt: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Payment Support
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          For payment related queries, contact our support team
        </Typography>
        <Chip label="24/7 Support Available" color="primary" />
      </Paper>
    </Box>
  );
};

export default OnlinePayment;
