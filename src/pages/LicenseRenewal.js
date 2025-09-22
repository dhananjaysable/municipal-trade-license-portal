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
} from '@mui/material';
import {
  Refresh,
  Search,
  CheckCircle,
  Payment,
  Download,
} from '@mui/icons-material';

const LicenseRenewal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundLicense, setFoundLicense] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Search License', 'Review Details', 'Make Payment', 'Download Certificate'];

  const handleSearch = () => {
    // Mock search - in real app, this would call an API
    if (searchQuery.includes('TL-2024-001')) {
      setFoundLicense({
        licenseNumber: 'TL-2024-001',
        businessName: 'ABC Traders',
        applicantName: 'John Doe',
        expiryDate: '2025-12-31',
        renewalFee: 5000,
        status: 'active'
      });
      setActiveStep(1);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: 'success.50' }}>
        <Refresh sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" fontWeight="700" gutterBottom>
          License Renewal
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Renew your trade license online quickly and securely
        </Typography>
      </Paper>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Search Your License
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Enter License Number (e.g., TL-2024-001)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  startIcon={<Search />}
                  sx={{ height: '56px' }}
                >
                  Search License
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {foundLicense && activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              License Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">License Number</Typography>
                <Typography variant="h6">{foundLicense.licenseNumber}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">Business Name</Typography>
                <Typography variant="h6">{foundLicense.businessName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">Applicant Name</Typography>
                <Typography variant="h6">{foundLicense.applicantName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">Current Expiry</Typography>
                <Typography variant="h6">{foundLicense.expiryDate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  Renewal Fee: ₹{foundLicense.renewalFee.toLocaleString()}
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Payment />}
                  onClick={() => setActiveStep(2)}
                  sx={{ mr: 2 }}
                >
                  Proceed to Payment
                </Button>
                <Button variant="outlined" onClick={() => setActiveStep(0)}>
                  Search Different License
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default LicenseRenewal;
