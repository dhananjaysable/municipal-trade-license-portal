import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Paper
} from '@mui/material';
// Import Timeline components from @mui/lab
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  ArrowBack,
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  InsertDriveFile,
  CheckCircle,
  Schedule,
  Cancel,
  Feedback
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

// Rest of the component remains the same...
const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById } = useApp();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const app = getApplicationById(id);
    console.log('Looking for application with ID:', id);
    console.log('Found application:', app);
    setApplication(app);
  }, [id, getApplicationById]);

  if (!application) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Application not found. ID: {id}
        </Alert>
        <Button 
          onClick={() => navigate('/citizen/dashboard')} 
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'under review': return 'warning';
      case 'verified': return 'info';
      case 'submitted': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle />;
      case 'rejected': return <Cancel />;
      case 'under review': return <Schedule />;
      case 'verified': return <CheckCircle />;
      case 'submitted': return <Schedule />;
      default: return <Schedule />;
    }
  };

  const getTimelineSteps = () => {
    const steps = [
      {
        label: 'Application Submitted',
        completed: true,
        date: application.createdAt
      },
      {
        label: 'Under Review',
        completed: ['under review', 'verified', 'approved'].includes(application.status),
        date: application.status !== 'submitted' ? application.updatedAt : null
      },
      {
        label: 'Document Verification',
        completed: ['verified', 'approved'].includes(application.status),
        date: application.status === 'verified' || application.status === 'approved' ? application.updatedAt : null
      },
      {
        label: application.status === 'rejected' ? 'Application Rejected' : 'License Approved',
        completed: application.status === 'approved' || application.status === 'rejected',
        date: ['approved', 'rejected'].includes(application.status) ? application.updatedAt : null
      }
    ];
    return steps;
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/citizen/dashboard')}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4">
          Application #{application.id}
        </Typography>
        <Chip
          label={application.status}
          color={getStatusColor(application.status)}
          icon={getStatusIcon(application.status)}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Applicant Name
                      </Typography>
                      <Typography variant="body1">
                        {application.applicantName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Business Name
                      </Typography>
                      <Typography variant="body1">
                        {application.businessName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {application.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact Number
                      </Typography>
                      <Typography variant="body1">
                        {application.contactNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <LocationOn sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Business Address
                      </Typography>
                      <Typography variant="body1">
                        {application.businessAddress}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {application.businessType}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    License Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {application.licenseType}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Expected Start Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(application.expectedStartDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    License Number
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {application.licenseNumber}
                  </Typography>
                </Grid>
                {application.businessDescription && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Business Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {application.businessDescription}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {application.documents && application.documents.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Uploaded Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {application.documents.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <InsertDriveFile color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.name}
                        secondary={doc.size}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Timeline
              </Typography>
              <Timeline>
                {getTimelineSteps().map((step, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={step.completed ? 'primary' : 'grey'}>
                        {step.completed && <CheckCircle fontSize="small" />}
                      </TimelineDot>
                      {index < getTimelineSteps().length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2">
                        {step.label}
                      </Typography>
                      {step.date && (
                        <Typography variant="body2" color="text.secondary">
                          {new Date(step.date).toLocaleDateString()}
                        </Typography>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>

          {application.feedback && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Feedback sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Feedback
                  </Typography>
                </Box>
                <Paper sx={{ p: 2, backgroundColor: 'action.hover' }}>
                  <Typography variant="body2">
                    {application.feedback}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          )}

          {application.status === 'approved' && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  License Approved!
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Your license has been approved and is now active.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/license/${application.id}`)}
                  sx={{ mt: 2 }}
                >
                  View License
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetails;
