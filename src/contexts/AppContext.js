import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApplications, updateApplication, createApplication, deleteApplication } from '../utils/localStorageHelpers';

const AppContext = createContext({});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const apps = getApplications();
    setApplications(apps);
  };

  const submitApplication = async (applicationData) => {
    setLoading(true);
    try {
      const newApplication = await createApplication(applicationData);
      setApplications(prev => [...prev, newApplication]);
      showNotification('Application submitted successfully!', 'success');
      return { success: true, application: newApplication };
    } catch (error) {
      showNotification('Failed to submit application', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status, feedback = '') => {
    setLoading(true);
    try {
      const updatedApp = await updateApplication(id, { status, feedback, updatedAt: new Date().toISOString() });
      setApplications(prev => prev.map(app => app.id === id ? updatedApp : app));
      showNotification(`Application ${status} successfully!`, 'success');
      return { success: true };
    } catch (error) {
      showNotification('Failed to update application', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteApp = async (id) => {
    setLoading(true);
    try {
      await deleteApplication(id);
      setApplications(prev => prev.filter(app => app.id !== id));
      showNotification('Application deleted successfully!', 'success');
      return { success: true };
    } catch (error) {
      showNotification('Failed to delete application', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getApplicationById = (id) => {
    // Handle both string and number IDs
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    console.log('Searching for application with ID:', id, 'converted to:', numericId);
    console.log('Available applications:', applications.map(app => ({ id: app.id, type: typeof app.id })));
    const found = applications.find(app => app.id === numericId);
    console.log('Found application:', found);
    return found;
  };

  const getUserApplications = (userId) => {
    return applications.filter(app => app.applicantId === userId);
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const pending = applications.filter(app => app.status === 'under review').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    return { total, approved, pending, rejected };
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ message, severity, open: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const value = {
    applications,
    loading,
    notification,
    submitApplication,
    updateApplicationStatus,
    deleteApp,
    getApplicationById,
    getUserApplications,
    getApplicationStats,
    showNotification,
    hideNotification,
    loadApplications
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
