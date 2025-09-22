// pages/TrackApplication.js
import React, { useState, useEffect } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Chip,
  Divider,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import {
  Search,
  Assignment,
  Person,
  Business,
  CheckCircle,
  Schedule,
  Cancel,
  Visibility,
  Phone,
  Email,
  LocationOn,
  Clear,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const TrackApplication = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'license');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const { applications } = useApp();

  useEffect(() => {
    if (searchParams.get('search')) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const filteredResults = applications.filter(app => 
        app.licenseNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.contactNumber?.includes(searchQuery) ||
        app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toString().includes(searchQuery)
      );

      if (filteredResults.length === 0) {
        setError('No applications found matching your search criteria');
      } else {
        setResults(filteredResults);
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'under review': return 'warning';
      case 'submitted': return 'info';
      case 'documents_verified': return 'info';
      case 'data_verified': return 'info';
      case 'documents_rejected': return 'error';
      case 'data_rejected': return 'error';
      default: return 'default';
    }
  };

  const getStepIcon = (step, completed) => {
    if (completed) return <CheckCircle />;
    return <Schedule />;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Track Your Application
        </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Enter your details to track application status
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
          <TextField
            fullWidth
            placeholder="Enter License Number, Email, or Mobile Number"
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
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Search />}
            sx={{
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            {loading ? 'Searching...' : 'Search Application'}
          </Button>
        </Box>
      </Paper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Search Results */}
      {results.map((application) => {
        // Generate steps based on application status
        const getApplicationSteps = (app) => {
          const steps = [
            { label: 'Application Submitted', completed: true, date: app.createdAt },
            { label: 'Document Verification', completed: ['documents_verified', 'data_verified', 'approved'].includes(app.status), date: null },
            { label: 'Data Verification', completed: ['data_verified', 'approved'].includes(app.status), date: null },
            { label: 'Final Approval', completed: app.status === 'approved', date: null },
          ];
          return steps;
        };

        const steps = getApplicationSteps(application);
        const currentStep = steps.findIndex(step => !step.completed);
        const activeStep = currentStep === -1 ? steps.length - 1 : currentStep;

        return (
          <Card key={application.id} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Application Details */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" fontWeight="700" gutterBottom>
                    Application Details
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Assignment sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Application ID
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                          {application.id}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Person sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Applicant Name
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.applicantName}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Business sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Business Name
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.businessName}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.contactNumber}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={application.status?.replace('_', ' ') || 'Unknown'}
                        color={getStatusColor(application.status)}
                        size="medium"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Box>
                </Grid>

                {/* Application Progress */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" fontWeight="700" gutterBottom>
                    Application Progress
                  </Typography>
                  
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel 
                          StepIconComponent={({ active, completed }) => (
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: completed 
                                  ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                                  : active 
                                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                    : '#e5e7eb',
                                color: completed || active ? 'white' : '#6b7280',
                              }}
                            >
                              {completed ? (
                                <CheckCircle sx={{ fontSize: 20 }} />
                              ) : (
                                <Typography variant="body2" fontWeight="600">
                                  {index + 1}
                                </Typography>
                              )}
                            </Box>
                          )}
                        >
                          <Typography variant="h6" fontWeight="600">
                            {step.label}
                          </Typography>
                          {step.date && (
                            <Typography variant="body2" color="text.secondary">
                              Completed on {new Date(step.date).toLocaleDateString()}
                            </Typography>
                          )}
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                            {step.completed ? 'Completed successfully' : 'In progress...'}
                          </Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(application.createdAt).toLocaleDateString()}
                </Typography>
                {application.status === 'approved' && (
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    }}
                  >
                    View License Certificate
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}

      {/* Help Section */}
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography variant="h5" gutterBottom>
          Need Help?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          If you can't find your application or need assistance, please contact our support team.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<Phone />}>
            Call: +91-721-2530000
          </Button>
          <Button variant="outlined" startIcon={<Email />}>
            Email: support@municipal.gov.in
          </Button>
        </Box>
      </Paper>
      </Container>
    </Box>
  );
};

export default TrackApplication;
