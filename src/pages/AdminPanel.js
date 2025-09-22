import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tabs,
  Tab,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  Schedule,
  Assignment,
  Description,
  Gavel,
  Person,
  Business,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import ThreeStepApproval from '../components/Admin/ThreeStepApproval';

const AdminPanel = () => {
  const { applications, updateApplicationStatus, deleteApp, getApplicationStats } = useApp();
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionDialog, setActionDialog] = useState({ open: false, type: '', application: null });
  const [feedback, setFeedback] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [showThreeStepApproval, setShowThreeStepApproval] = useState(false);

  const stats = getApplicationStats();

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleThreeStepApproval = (application) => {
    setSelectedApplication(application);
    setShowThreeStepApproval(true);
  };

  const handleActionDialog = (type, application) => {
    setActionDialog({ open: true, type, application });
    setFeedback(application?.feedback || '');
  };

  const handleCloseDialog = () => {
    setActionDialog({ open: false, type: '', application: null });
    setSelectedApplication(null);
    setFeedback('');
  };

  const handleCloseThreeStepApproval = () => {
    setShowThreeStepApproval(false);
    setSelectedApplication(null);
  };

  const handleStatusUpdate = async () => {
    const { type, application } = actionDialog;
    let newStatus = type;
    
    if (type === 'verify') {
      newStatus = 'verified';
    }

    const result = await updateApplicationStatus(application.id, newStatus, feedback);
    if (result.success) {
      handleCloseDialog();
    }
  };

  const handleDeleteApplication = async () => {
    const result = await deleteApp(actionDialog.application.id);
    if (result.success) {
      handleCloseDialog();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'under review': return 'warning';
      case 'verified': return 'info';
      case 'submitted': return 'default';
      case 'documents_verified': return 'info';
      case 'data_verified': return 'info';
      case 'documents_rejected': return 'error';
      case 'data_rejected': return 'error';
      default: return 'default';
    }
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const pendingApplications = applications.filter(app => 
    ['submitted', 'under review', 'documents_verified', 'data_verified'].includes(app.status)
  );

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  const ApplicationsTable = ({ apps, showActions = true }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Applicant</TableCell>
            <TableCell>Business Name</TableCell>
            <TableCell>License Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            {showActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>#{app.id}</TableCell>
              <TableCell>{app.applicantName}</TableCell>
              <TableCell>{app.businessName}</TableCell>
              <TableCell>{app.licenseType}</TableCell>
              <TableCell>
                <Chip
                  label={app.status}
                  color={getStatusColor(app.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              {showActions && (
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleViewApplication(app)}
                    title="View Details"
                  >
                    <Visibility />
                  </IconButton>
                  {['submitted', 'under review', 'documents_verified', 'data_verified'].includes(app.status) && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleThreeStepApproval(app)}
                      title="Three-Step Approval Process"
                    >
                      <Assignment />
                    </IconButton>
                  )}
                  {app.status === 'submitted' && (
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => handleActionDialog('under review', app)}
                      title="Start Review"
                    >
                      <Schedule />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleActionDialog('delete', app)}
                    title="Delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage trade license applications
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h4">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Review
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`Pending Review (${pendingApplications.length})`} />
            <Tab label={`All Applications (${applications.length})`} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {pendingApplications.length > 0 ? (
            <ApplicationsTable apps={pendingApplications} />
          ) : (
            <Alert severity="info">
              No applications pending review
            </Alert>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Filter Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="submitted">Submitted</MenuItem>
                <MenuItem value="under review">Under Review</MenuItem>
                <MenuItem value="documents_verified">Documents Verified</MenuItem>
                <MenuItem value="data_verified">Data Verified</MenuItem>
                <MenuItem value="verified">Verified</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="documents_rejected">Documents Rejected</MenuItem>
                <MenuItem value="data_rejected">Data Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ApplicationsTable apps={filteredApplications} />
        </TabPanel>
      </Card>

      {/* Application Details Dialog */}
      <Dialog
        open={!!selectedApplication}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              Application #{selectedApplication.id} - {selectedApplication.businessName}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Applicant Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedApplication.applicantName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedApplication.businessType}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Number
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedApplication.contactNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedApplication.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Business Address
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedApplication.businessAddress}
                  </Typography>
                </Grid>
                {selectedApplication.businessDescription && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Business Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedApplication.businessDescription}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Documents ({selectedApplication.documents?.length || 0})
                  </Typography>
                  {selectedApplication.documents?.map((doc, index) => (
                    <Typography key={index} variant="body2">
                      • {doc.name} ({doc.size})
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {actionDialog.type === 'delete' ? 'Delete Application' : 
           actionDialog.type === 'approved' ? 'Approve Application' :
           actionDialog.type === 'rejected' ? 'Reject Application' :
           actionDialog.type === 'verify' ? 'Verify Application' :
           'Update Application Status'}
        </DialogTitle>
        <DialogContent>
          {actionDialog.type === 'delete' ? (
            <Typography>
              Are you sure you want to delete this application? This action cannot be undone.
            </Typography>
          ) : (
            <Box>
              <Typography gutterBottom>
                {actionDialog.type === 'approved' ? 'Approve this application?' :
                 actionDialog.type === 'rejected' ? 'Reject this application?' :
                 actionDialog.type === 'verify' ? 'Mark this application as verified?' :
                 'Update application status?'}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Feedback (Optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="Add feedback or comments..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={actionDialog.type === 'delete' ? handleDeleteApplication : handleStatusUpdate}
            color={actionDialog.type === 'delete' || actionDialog.type === 'rejected' ? 'error' : 'primary'}
            variant="contained"
          >
            {actionDialog.type === 'delete' ? 'Delete' : 
             actionDialog.type === 'approved' ? 'Approve' :
             actionDialog.type === 'rejected' ? 'Reject' :
             'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Three-Step Approval Dialog */}
      <Dialog
        open={showThreeStepApproval}
        onClose={handleCloseThreeStepApproval}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedApplication && (
            <ThreeStepApproval
              application={selectedApplication}
              onStatusUpdate={updateApplicationStatus}
              onClose={handleCloseThreeStepApproval}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
