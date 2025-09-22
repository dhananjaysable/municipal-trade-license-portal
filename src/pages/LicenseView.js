// pages/LicenseView.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogContent,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  Download,
  Refresh,
  CheckCircle,
  Business,
  Person,
  DateRange,
  Assignment,
  Phone,
  Email,
  LocationOn,
  Share,
  Print,
  Verified,
  QrCode,
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { downloadCertificate } from '../utils/certificateGenerator';

const LicenseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById, showNotification } = useApp();
  const { user } = useAuth();
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const app = getApplicationById(parseInt(id));
    if (app && app.status === 'approved') {
      setApplication(app);
    }
  }, [id, getApplicationById]);

  const handleDownloadCertificate = async () => {
    setLoading(true);
    try {
      const result = await downloadCertificate(application);
      if (result.success) {
        showNotification('Certificate downloaded successfully!', 'success');
      } else {
        showNotification('Failed to download certificate', 'error');
      }
    } catch (error) {
      showNotification('Download failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Trade License Certificate',
          text: `Trade License for ${application.businessName} - License #${application.licenseNumber}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotification('License URL copied to clipboard!', 'info');
    }
  };

  if (!application) {
    return (
      <Fade in={true}>
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            License not found or not approved yet.
          </Alert>
          <Button 
            onClick={() => navigate('/dashboard')} 
            sx={{ mt: 2 }}
            startIcon={<ArrowBack />}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Slide direction="down" in={true} timeout={600}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton 
                onClick={() => navigate('/dashboard')}
                sx={{ 
                  mr: 2,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                  Trade License Certificate
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Digital certificate for {application.businessName}
                </Typography>
              </Box>
              <Chip
                label="APPROVED"
                color="success"
                icon={<Verified />}
                sx={{ 
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  height: 40,
                  '& .MuiChip-icon': { fontSize: 20 }
                }}
              />
            </Box>
          </Box>
        </Slide>

        <Grid container spacing={3}>
          {/* Certificate Preview */}
          <Grid item xs={12} lg={8}>
            <Slide direction="up" in={true} timeout={800}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F9FB 100%)',
                  border: '2px solid #E5E5EA',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Certificate Header */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    color: 'white',
                    p: 4,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Business sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="700" gutterBottom>
                    Government of India
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Municipal Corporation
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Trade License Certificate
                  </Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  {/* Certificate Title */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" fontWeight="700" color="primary" gutterBottom>
                      TRADE LICENSE CERTIFICATE
                    </Typography>
                    <Divider sx={{ my: 2, maxWidth: 300, mx: 'auto' }} />
                  </Box>

                  {/* License Details */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Assignment sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            License Number
                          </Typography>
                          <Typography variant="h6" fontWeight="600" color="primary">
                            {application.licenseNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <DateRange sx={{ mr: 2, color: 'success.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Valid Until
                          </Typography>
                          <Typography variant="h6" fontWeight="600" color="success.main">
                            {new Date(application.expiryDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Person sx={{ mr: 2, color: 'info.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            License Holder
                          </Typography>
                          <Typography variant="h6" fontWeight="600">
                            {application.applicantName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Business sx={{ mr: 2, color: 'warning.main', fontSize: 28 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Business Name
                          </Typography>
                          <Typography variant="h6" fontWeight="600">
                            {application.businessName}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Business Details Card */}
                  <Paper
                    sx={{
                      p: 3,
                      mt: 4,
                      backgroundColor: 'rgba(0, 122, 255, 0.04)',
                      border: '1px solid rgba(0, 122, 255, 0.12)',
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h6" fontWeight="600" gutterBottom sx={{ color: 'primary.main' }}>
                      Business Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Business Type
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.businessType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          License Type
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.licenseType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Business Address
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {application.businessAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Certificate Footer */}
                  <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #E5E5EA', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      This is a digitally generated certificate and is valid without signature
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Generated on: {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>

          {/* Action Panel */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Download Actions */}
              <Slide direction="left" in={true} timeout={800}>
                <Card sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Certificate Actions
                    </Typography>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                      onClick={handleDownloadCertificate}
                      disabled={loading}
                      sx={{
                        mb: 2,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0051D5 0%, #007AFF 100%)',
                        },
                      }}
                    >
                      {loading ? 'Generating...' : 'Download Certificate'}
                    </Button>

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Share />}
                          onClick={handleShare}
                          sx={{ py: 1 }}
                        >
                          Share
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Print />}
                          onClick={() => window.print()}
                          sx={{ py: 1 }}
                        >
                          Print
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Slide>

              {/* License Status */}
              <Slide direction="left" in={true} timeout={1000}>
                <Card sx={{ mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      License Status
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircle sx={{ color: 'success.main', mr: 2, fontSize: 32 }} />
                      <Box>
                        <Typography variant="h6" color="success.main" fontWeight="600">
                          Active & Valid
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          License is currently active
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Issue Date
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Expiry Date
                      </Typography>
                      <Typography variant="body2" fontWeight="500" color="success.main">
                        {new Date(application.expiryDate).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Days Remaining
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {Math.ceil((new Date(application.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Slide>

              {/* Contact Information */}
              <Slide direction="left" in={true} timeout={1200}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Need Help?
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ color: 'primary.main', mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone Support
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          +91-721-2530000
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ color: 'primary.main', mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email Support
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          licenses@municipal.gov.in
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LocationOn sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Office Address
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          Municipal Corporation Building,
                          Amravati, Maharashtra
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default LicenseView;
