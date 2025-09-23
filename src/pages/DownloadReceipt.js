
import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Container,
  Alert,
  Snackbar,
  CircularProgress,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  GetApp,
  Receipt,
  Assignment,
  CheckCircle,
  Download,
  Close,
  Print,
  Share,
  FileCopy,
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import jsPDF from 'jspdf';

const DownloadReceipt = () => {
  const theme = useTheme();
  const { applications } = useApp();
  const [loading, setLoading] = useState({ license: false, payment: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const licenseRef = useRef(null);
  const receiptRef = useRef(null);

  // Mock data for demonstration - replace with actual data from context/props
  const sampleApplication = {
    id: 'APP2025001',
    licenseNumber: 'LIC-2025-001',
    applicantName: 'John Doe',
    businessName: 'Tech Solutions Pvt Ltd',
    licenseType: 'Business License',
    issueDate: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    feeAmount: 5000,
    processingFee: 500,
    transactionId: 'TXN' + Date.now(),
    paymentDate: new Date().toLocaleDateString(),
    paymentMethod: 'Credit Card',
    status: 'Active'
  };

  const handleShowSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const generateLicensePDF = async () => {
    setLoading({ ...loading, license: true });

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, 210, 30, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('BUSINESS LICENSE', 105, 20, { align: 'center' });

      // Reset color for body
      doc.setTextColor(0, 0, 0);

      // License details
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('License Information', 20, 50);

      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(`License Number: ${sampleApplication.licenseNumber}`, 20, 65);
      doc.text(`Applicant Name: ${sampleApplication.applicantName}`, 20, 75);
      doc.text(`Business Name: ${sampleApplication.businessName}`, 20, 85);
      doc.text(`License Type: ${sampleApplication.licenseType}`, 20, 95);
      doc.text(`Issue Date: ${sampleApplication.issueDate}`, 20, 105);
      doc.text(`Valid Until: ${sampleApplication.validUntil}`, 20, 115);
      doc.text(`Status: ${sampleApplication.status}`, 20, 125);

      // Footer
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 260, 210, 37, 'F');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.text('This is a computer generated license. No signature required.', 105, 280, { align: 'center' });
      doc.text('For queries, contact: support@municipality.gov', 105, 290, { align: 'center' });

      doc.save(`License_${sampleApplication.licenseNumber}.pdf`);
      handleShowSnackbar('License downloaded successfully!');
    } catch (error) {
      handleShowSnackbar('Error downloading license. Please try again.', 'error');
    } finally {
      setLoading({ ...loading, license: false });
    }
  };

  const generatePaymentReceiptPDF = async () => {
    setLoading({ ...loading, payment: true });

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header
      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, 210, 30, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('PAYMENT RECEIPT', 105, 20, { align: 'center' });

      // Reset color for body
      doc.setTextColor(0, 0, 0);

      // Payment details
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Payment Information', 20, 50);

      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(`Transaction ID: ${sampleApplication.transactionId}`, 20, 65);
      doc.text(`Application ID: ${sampleApplication.id}`, 20, 75);
      doc.text(`Applicant Name: ${sampleApplication.applicantName}`, 20, 85);
      doc.text(`Payment Date: ${sampleApplication.paymentDate}`, 20, 95);
      doc.text(`Payment Method: ${sampleApplication.paymentMethod}`, 20, 105);

      // Amount breakdown
      doc.setFont(undefined, 'bold');
      doc.text('Amount Breakdown', 20, 125);
      doc.setFont(undefined, 'normal');
      doc.text(`License Fee: ₹${sampleApplication.feeAmount.toLocaleString()}`, 20, 140);
      doc.text(`Processing Fee: ₹${sampleApplication.processingFee.toLocaleString()}`, 20, 150);

      doc.line(20, 155, 100, 155);
      doc.setFont(undefined, 'bold');
      doc.text(`Total Amount: ₹${(sampleApplication.feeAmount + sampleApplication.processingFee).toLocaleString()}`, 20, 165);

      // Footer
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 260, 210, 37, 'F');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.text('This is a computer generated receipt. No signature required.', 105, 280, { align: 'center' });
      doc.text('For queries, contact: support@municipality.gov', 105, 290, { align: 'center' });

      doc.save(`Receipt_${sampleApplication.transactionId}.pdf`);
      handleShowSnackbar('Payment receipt downloaded successfully!');
    } catch (error) {
      handleShowSnackbar('Error downloading receipt. Please try again.', 'error');
    } finally {
      setLoading({ ...loading, payment: false });
    }
  };

  const handlePrintLicense = () => {
    window.print();
    handleShowSnackbar('Print dialog opened');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight="700"
          gutterBottom
          sx={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Download Documents
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Download your official license and payment receipts instantly
        </Typography>
      </Box>

      <Grid container spacing={6} sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* License Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Assignment sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h5" fontWeight="700" color="white">
                Business License
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Official license certificate
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  License Details
                </Typography>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                  {sampleApplication.licenseNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sampleApplication.businessName}
                </Typography>
                <Chip 
                  label={sampleApplication.status}
                  color="success"
                  size="small"
                  sx={{ mt: 1, fontWeight: 600 }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={generateLicensePDF}
                  disabled={loading.license}
                  startIcon={loading.license ? <CircularProgress size={20} /> : <Download />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    },
                  }}
                >
                  {loading.license ? 'Generating...' : 'Download License'}
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Print />}
                    onClick={handlePrintLicense}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Print
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Share />}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Share
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Receipt Card */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
              },
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Receipt sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h5" fontWeight="700" color="white">
                Payment Receipt
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Official payment confirmation
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Transaction Details
                </Typography>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                  {sampleApplication.transactionId}
                </Typography>
                <Typography variant="h6" fontWeight="700" color="success.main">
                  ₹{(sampleApplication.feeAmount + sampleApplication.processingFee).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Paid on {sampleApplication.paymentDate}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={generatePaymentReceiptPDF}
                  disabled={loading.payment}
                  startIcon={loading.payment ? <CircularProgress size={20} /> : <Download />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #22c55e 100%)',
                    },
                  }}
                >
                  {loading.payment ? 'Generating...' : 'Download Receipt'}
                </Button>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<FileCopy />}
                    onClick={() => {
                      navigator.clipboard.writeText(sampleApplication.transactionId);
                      handleShowSnackbar('Transaction ID copied to clipboard');
                    }}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Copy ID
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Share />}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Share
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Information Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 8,
          maxWidth: 600,
          mx: 'auto',
          textAlign: 'center',
          bgcolor: 'grey.50',
          borderRadius: 3,
        }}
      >
        <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Secure & Instant Downloads
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          All documents are generated securely and are available for immediate download. 
          Your documents are official and can be used for verification purposes.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip
            label="✓ Official Documents"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="✓ Instant Download"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="✓ 24/7 Available"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2, fontWeight: 600 }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DownloadReceipt;
