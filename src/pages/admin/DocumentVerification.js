import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import {
  Visibility,
  CheckCircle,
  Cancel,
  Description
} from '@mui/icons-material';
import { useApp } from '../../contexts/AppContext';

const DocumentVerification = () => {
  const { applications, updateApplicationStatus } = useApp();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionDialog, setActionDialog] = useState({ open: false, type: '', application: null });
  const [feedback, setFeedback] = useState('');

  // Filter applications that need document verification
  const pendingDocumentVerification = applications.filter(app => 
    ['submitted', 'under review'].includes(app.status)
  );

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleActionDialog = (type, application) => {
    setActionDialog({ open: true, type, application });
    setFeedback('');
  };

  const handleCloseDialog = () => {
    setActionDialog({ open: false, type: '', application: null });
    setSelectedApplication(null);
    setFeedback('');
  };

  const handleStatusUpdate = async () => {
    const { type, application } = actionDialog;
    let newStatus = '';
    
    if (type === 'approve') {
      newStatus = 'documents_verified';
    } else if (type === 'reject') {
      newStatus = 'documents_rejected';
    }

    const result = await updateApplicationStatus(application.id, newStatus, feedback);
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Document Verification
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Pending Document Verification ({pendingDocumentVerification.length})
        </Typography>
        
        {pendingDocumentVerification.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No applications pending document verification.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Applicant</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>License Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingDocumentVerification.map((app) => (
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
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleViewApplication(app)}
                        title="View Details"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleActionDialog('approve', app)}
                        title="Approve Documents"
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleActionDialog('reject', app)}
                        title="Reject Documents"
                      >
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

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
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Applicant Information</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>Name:</strong> {selectedApplication.applicantName}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {selectedApplication.email}</Typography>
                    <Typography variant="body2"><strong>Phone:</strong> {selectedApplication.phone}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {selectedApplication.address}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Business Information</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>Business Name:</strong> {selectedApplication.businessName}</Typography>
                    <Typography variant="body2"><strong>License Type:</strong> {selectedApplication.licenseType}</Typography>
                    <Typography variant="body2"><strong>Business Address:</strong> {selectedApplication.businessAddress}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Documents</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>ID Proof:</strong> {selectedApplication.idProof || 'Not provided'}</Typography>
                    <Typography variant="body2"><strong>Address Proof:</strong> {selectedApplication.addressProof || 'Not provided'}</Typography>
                    <Typography variant="body2"><strong>Business Registration:</strong> {selectedApplication.businessRegistration || 'Not provided'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
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
          {actionDialog.type === 'approve' ? 'Approve Documents' : 'Reject Documents'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleStatusUpdate}
            color={actionDialog.type === 'approve' ? 'primary' : 'error'}
            variant="contained"
          >
            {actionDialog.type === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentVerification;