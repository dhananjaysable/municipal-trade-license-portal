// pages/RTSComplaint.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import {
  Gavel,
  Assignment,
  Schedule,
  CheckCircle,
  Phone,
  Email,
} from '@mui/icons-material';

const RTSComplaint = () => {
  const [complaint, setComplaint] = useState({
    type: '',
    applicationId: '',
    description: '',
    contactMethod: 'email'
  });

  const complaintTypes = [
    'Delay in Processing',
    'Document Issues',
    'Payment Problems',
    'Staff Behavior',
    'Technical Issues',
    'Other'
  ];

  const rtsSteps = [
    'Submit Complaint',
    'Acknowledgment',
    'Investigation',
    'Resolution'
  ];

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: 'primary.50' }}>
        <Gavel sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight="700" gutterBottom>
          Right to Service (RTS)
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Grievance Redressal & Service Guarantee
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="700">
                File RTS Complaint
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Complaint Type</InputLabel>
                    <Select
                      value={complaint.type}
                      onChange={(e) => setComplaint({...complaint, type: e.target.value})}
                      label="Complaint Type"
                    >
                      {complaintTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application/License ID"
                    value={complaint.applicationId}
                    onChange={(e) => setComplaint({...complaint, applicationId: e.target.value})}
                    placeholder="e.g., TL-2025-001"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Describe your complaint"
                    value={complaint.description}
                    onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                    placeholder="Please provide detailed information about your complaint..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Preferred Contact Method</InputLabel>
                    <Select
                      value={complaint.contactMethod}
                      onChange={(e) => setComplaint({...complaint, contactMethod: e.target.value})}
                      label="Preferred Contact Method"
                    >
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="phone">Phone</MenuItem>
                      <MenuItem value="sms">SMS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Assignment />}
                    sx={{ mr: 2 }}
                  >
                    Submit Complaint
                  </Button>
                  <Button variant="outlined" size="large">
                    Reset Form
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                RTS Process Timeline
              </Typography>
              <Stepper activeStep={0} alternativeLabel>
                {rtsSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Guarantees
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle sx={{ color: 'success.main' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      New License
                    </Typography>
                    <Typography variant="caption">7-10 working days</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle sx={{ color: 'success.main' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      License Renewal
                    </Typography>
                    <Typography variant="caption">3-5 working days</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle sx={{ color: 'success.main' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      RTS Response
                    </Typography>
                    <Typography variant="caption">48 hours</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact RTS Cell
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2">RTS Helpline</Typography>
                    <Typography variant="body1" fontWeight="600">
                      +91-721-2530100
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2">RTS Email</Typography>
                    <Typography variant="body1" fontWeight="600">
                      rts@municipal.gov.in
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                RTS complaints are processed within 48 hours as per government guidelines.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RTSComplaint;
