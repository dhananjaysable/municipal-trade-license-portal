// App.js - Restructured for Citizen and Admin modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ChatProvider } from './contexts/ChatContext';
import Layout from './components/Layout/Layout';
import PublicLayout from './components/Layout/PublicLayout';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import ChatBot from './components/ChatBot/ChatBot';

// Import all pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationDetails from './pages/ApplicationDetails';
import AdminPanel from './pages/AdminPanel';
import LicenseView from './pages/LicenseView';
import CitizenPortal from './pages/CitizenPortal';
import CitizenVerification from './pages/CitizenVerification';
import CitizenDashboard from './pages/CitizenDashboard';
import TrackApplication from './pages/TrackApplication';
import OnlinePayment from './pages/OnlinePayment';
import LicenseRenewal from './pages/LicenseRenewal';
import DocumentManagement from './pages/DocumentManagement';
import RTSComplaint from './pages/RTSComplaint';

// Import admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import DocumentVerification from './pages/admin/DocumentVerification';
import DataVerification from './pages/admin/DataVerification';
import FinalApproval from './pages/admin/FinalApproval';

// Enhanced theme matching the design
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#0d47a1',
      50: '#e3f2fd',
    },
    secondary: {
      main: '#f57c00',
      light: '#ffad42',
      dark: '#ef6c00',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <AppProvider>
            <ChatProvider>
              <Routes>
                {/* Auth Routes - Admin Only */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Public Citizen Portal - Landing Page */}
                <Route path="/citizen" element={<CitizenPortal />} />
                
                {/* Citizen Verification - Required before accessing services */}
                <Route path="/citizen/verify" element={<CitizenVerification />} />
                
                {/* Citizen Services - All require verification */}
                <Route element={<PublicLayout />}>
                  <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
                  <Route path="/citizen/apply" element={<ApplicationForm />} />
                  <Route path="/citizen/application/:id" element={<ApplicationDetails />} />
                  <Route path="/citizen/renewal" element={<LicenseRenewal />} />
                  <Route path="/citizen/payment" element={<OnlinePayment />} />
                  <Route path="/citizen/download" element={<TrackApplication />} />
                  <Route path="/citizen/track" element={<TrackApplication />} />
                  <Route path="/citizen/documents" element={<DocumentManagement />} />
                  <Route path="/citizen/rts" element={<RTSComplaint />} />
                </Route>

                {/* Redirect root to citizen portal */}
                <Route path="/" element={<Navigate to="/citizen" replace />} />
                
                {/* Admin Protected Routes */}
                <Route element={<Layout />}>
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute requiredRole="admin">
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/applications" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/application/:id" element={
                    <ProtectedRoute requiredRole="admin">
                      <ApplicationDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/license/:id" element={
                    <ProtectedRoute requiredRole="admin">
                      <LicenseView />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/document-verification" element={
                    <ProtectedRoute requiredRole="admin">
                      <DocumentVerification />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/data-verification" element={
                    <ProtectedRoute requiredRole="admin">
                      <DataVerification />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/final-approval" element={
                    <ProtectedRoute requiredRole="admin">
                      <FinalApproval />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
              <ChatBot />
            </ChatProvider>
          </AppProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
