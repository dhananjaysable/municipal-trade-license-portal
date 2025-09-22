import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error,
  Info,
  Visibility,
  Edit,
  Assignment,
  Description,
  Gavel,
  Person,
  Business,
  Phone,
  Email,
  LocationOn,
  Schedule,
  Close
} from '@mui/icons-material';

const ThreeStepApproval = ({ application, onStatusUpdate, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [documentStatus, setDocumentStatus] = useState('pending');
  const [dataStatus, setDataStatus] = useState('pending');
  const [approvalStatus, setApprovalStatus] = useState('pending');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState('');

  const steps = [
    {
      label: 'Document Verification',
      description: 'Verify all required documents are submitted and valid',
      icon: <Description />,
      status: documentStatus,
      officer: 'Document Verification Officer'
    },
    {
      label: 'Data Verification',
      description: 'Verify application data accuracy and completeness',
      icon: <Edit />,
      status: dataStatus,
      officer: 'Data Verification Officer'
    },
    {
      label: 'Final Approval',
      description: 'Approve or reject the application with feedback',
      icon: <Gavel />,
      status: approvalStatus,
      officer: 'Approval Officer'
    }
  ];

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'default';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'rejected': return <Error />;
      case 'in-progress': return <Warning />;
      default: return <Info />;
    }
  };

  const handleStepAction = (stepIndex, action) => {
    setCurrentAction(action);
    setActiveStep(stepIndex);
    setShowFeedbackDialog(true);
  };

  const handleStatusUpdate = async () => {
    let newStatus = '';
    let stepStatus = '';

    switch (activeStep) {
      case 0:
        stepStatus = currentAction === 'approve' ? 'completed' : 'rejected';
        setDocumentStatus(stepStatus);
        newStatus = currentAction === 'approve' ? 'documents_verified' : 'documents_rejected';
        break;
      case 1:
        stepStatus = currentAction === 'approve' ? 'completed' : 'rejected';
        setDataStatus(stepStatus);
        newStatus = currentAction === 'approve' ? 'data_verified' : 'data_rejected';
        break;
      case 2:
        stepStatus = currentAction === 'approve' ? 'completed' : 'rejected';
        setApprovalStatus(stepStatus);
        newStatus = currentAction === 'approve' ? 'approved' : 'rejected';
        break;
      default:
        return;
    }

    await onStatusUpdate(application.id, newStatus, feedback);
    setShowFeedbackDialog(false);
    setFeedback('');
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const canProceedToNext = (stepIndex) => {
    switch (stepIndex) {
      case 0: return documentStatus === 'completed';
      case 1: return dataStatus === 'completed';
      case 2: return false; // Final step
      default: return false;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="700" color="primary.main">
          Three-Step Approval Process
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Application Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Application Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">Applicant:</Typography>
              </Box>
              <Typography variant="body1" fontWeight="600">{application.applicantName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Business sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">Business:</Typography>
              </Box>
              <Typography variant="body1" fontWeight="600">{application.businessName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">Contact:</Typography>
              </Box>
              <Typography variant="body1">{application.contactNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">Email:</Typography>
              </Box>
              <Typography variant="body1">{application.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stepper */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStepColor(step.status) === 'success' ? 'success.main' :
                             getStepColor(step.status) === 'error' ? 'error.main' :
                             getStepColor(step.status) === 'warning' ? 'warning.main' : 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {getStepIcon(step.status)}
                </Box>
              )}
            >
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {step.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Officer: {step.officer}
                </Typography>
              </Box>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {step.label === 'Document Verification' && (
                    <>
                      <Typography variant="h6" gutterBottom>Required Documents:</Typography>
                      <List dense>
                        {application.documents?.map((doc, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <Description fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={doc.name}
                              secondary={`Size: ${doc.size}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                  
                  {step.label === 'Data Verification' && (
                    <>
                      <Typography variant="h6" gutterBottom>Application Data:</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Business Type:</Typography>
                          <Typography variant="body1" fontWeight="600">{application.businessType}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">License Type:</Typography>
                          <Typography variant="body1" fontWeight="600">{application.licenseType}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">Business Address:</Typography>
                          <Typography variant="body1">{application.businessAddress}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  
                  {step.label === 'Final Approval' && (
                    <>
                      <Typography variant="h6" gutterBottom>Final Review:</Typography>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        All previous steps must be completed before final approval.
                      </Alert>
                    </>
                  )}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleStepAction(index, 'approve')}
                    disabled={step.status === 'completed' || step.status === 'rejected'}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Error />}
                    onClick={() => handleStepAction(index, 'reject')}
                    disabled={step.status === 'completed' || step.status === 'rejected'}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => handleStepAction(index, 'view')}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceedToNext(activeStep)}
            sx={{ mr: 1 }}
          >
            Next Step
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>

      {/* Feedback Dialog */}
      <Dialog
        open={showFeedbackDialog}
        onClose={() => setShowFeedbackDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentAction === 'approve' ? 'Approve' : 'Reject'} - {steps[activeStep]?.label}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom sx={{ mb: 2 }}>
            {currentAction === 'approve' 
              ? `Are you sure you want to approve this ${steps[activeStep]?.label.toLowerCase()}?`
              : `Are you sure you want to reject this ${steps[activeStep]?.label.toLowerCase()}?`
            }
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Feedback (Required)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide detailed feedback for your decision..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFeedbackDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            color={currentAction === 'approve' ? 'success' : 'error'}
            disabled={!feedback.trim()}
          >
            {currentAction === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThreeStepApproval;
