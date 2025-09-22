// pages/DocumentManagement.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Upload,
  Download,
  Visibility,
  Delete,
  CheckCircle,
  Cancel,
  Schedule,
  CloudUpload,
} from '@mui/icons-material';

const DocumentManagement = () => {
  const [uploadDialog, setUploadDialog] = useState(false);
  const [documents] = useState([
    {
      id: 1,
      name: 'Business Registration Certificate',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      status: 'verified',
      applicationId: 'TL-2025-001'
    },
    {
      id: 2,
      name: 'Identity Proof - Aadhar',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2025-01-15',
      status: 'pending',
      applicationId: 'TL-2025-001'
    },
    {
      id: 3,
      name: 'Property Documents',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2025-01-16',
      status: 'rejected',
      applicationId: 'TL-2025-002',
      feedback: 'Document unclear, please re-upload with better quality'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle />;
      case 'rejected': return <Cancel />;
      case 'pending': return <Schedule />;
      default: return <Schedule />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="700">
        Document Management
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="600">
                Upload Documents
              </Typography>
              <Button
                variant="contained"
                onClick={() => setUploadDialog(true)}
                sx={{ mt: 2 }}
              >
                Upload New
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="600">Verified</Typography>
              <Typography variant="h4" color="success.main">
                {documents.filter(doc => doc.status === 'verified').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="600">Pending</Typography>
              <Typography variant="h4" color="warning.main">
                {documents.filter(doc => doc.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Cancel sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="600">Rejected</Typography>
              <Typography variant="h4" color="error.main">
                {documents.filter(doc => doc.status === 'rejected').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Document History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {doc.name}
                      </Typography>
                      {doc.feedback && (
                        <Typography variant="caption" color="error">
                          {doc.feedback}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{doc.applicationId}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(doc.status)}
                        label={doc.status}
                        color={getStatusColor(doc.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                      {doc.status === 'rejected' && (
                        <IconButton size="small" color="primary">
                          <Upload />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialog}
        onClose={() => setUploadDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload Documents</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3, textAlign: 'center', border: '2px dashed #ccc', borderRadius: 2 }}>
            <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag & Drop files here or click to browse
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Supported formats: PDF, JPG, PNG (Max size: 5MB)
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Select Files
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DocumentManagement;
