export const initializeData = () => {
  const users = localStorage.getItem('users');
  const applications = localStorage.getItem('applications');

  if (!users) {
    const defaultUsers = [
      {
        id: 1,
        email: 'admin@portal.com',
        password: 'admin123',
        role: 'admin',
        name: 'Municipal Administrator',
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 2,
        email: 'user@portal.com',
        password: 'user123',
        role: 'user',
        name: 'John Doe',
        phone: '+91-9876543210',
        address: 'Amravati, Maharashtra',
        createdAt: '2025-01-02T00:00:00Z'
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }

  if (!applications) {
    const defaultApplications = [
      {
        id: 101,
        applicantId: 2,
        applicantName: 'John Doe',
        businessName: 'ABC Traders',
        businessType: 'Retail Shop',
        businessAddress: 'Main Market, Amravati',
        contactNumber: '+91-9876543210',
        email: 'john@abctraders.com',
        licenseType: 'General Trade License',
        status: 'under review',
        createdAt: '2025-01-10T10:00:00Z',
        updatedAt: '2025-01-10T10:00:00Z',
        documents: [
          { name: 'business_registration.pdf', url: 'blob:license-1', size: '2.5MB' },
          { name: 'identity_proof.pdf', url: 'blob:license-2', size: '1.2MB' }
        ],
        feedback: '',
        expiryDate: '2026-01-10',
        licenseNumber: 'TL-2025-001'
      },
      {
        id: 102,
        applicantId: 2,
        applicantName: 'John Doe',
        businessName: 'XYZ Services',
        businessType: 'Service Provider',
        businessAddress: 'IT Park, Amravati',
        contactNumber: '+91-9876543210',
        email: 'john@xyzservices.com',
        licenseType: 'Professional Service License',
        status: 'approved',
        createdAt: '2025-01-05T14:30:00Z',
        updatedAt: '2025-01-08T16:45:00Z',
        documents: [
          { name: 'service_agreement.pdf', url: 'blob:license-3', size: '1.8MB' }
        ],
        feedback: 'All documents verified and approved.',
        expiryDate: '2026-01-05',
        licenseNumber: 'PSL-2025-001'
      }
    ];
    localStorage.setItem('applications', JSON.stringify(defaultApplications));
  }
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const updateUser = (id, userData) => {
  const users = getUsers();
  const updatedUsers = users.map(user => 
    user.id === id ? { ...user, ...userData } : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return updatedUsers.find(user => user.id === id);
};

export const getApplications = () => {
  return JSON.parse(localStorage.getItem('applications') || '[]');
};

export const createApplication = (applicationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applications = getApplications();
      const newApplication = {
        id: Date.now(),
        ...applicationData,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        licenseNumber: `TL-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, '0')}`
      };
      
      console.log('Creating new application with ID:', newApplication.id);
      console.log('Application data:', newApplication);
      
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
      resolve(newApplication);
    }, 1000);
  });
};

export const updateApplication = (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applications = getApplications();
      const updatedApplications = applications.map(app =>
        app.id === id ? { ...app, ...updates } : app
      );
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      resolve(updatedApplications.find(app => app.id === id));
    }, 500);
  });
};

export const deleteApplication = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applications = getApplications();
      const filteredApplications = applications.filter(app => app.id !== id);
      localStorage.setItem('applications', JSON.stringify(filteredApplications));
      resolve();
    }, 500);
  });
};

export const uploadFile = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileData = {
        name: file.name,
        url: `blob:${Date.now()}`,
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`
      };
      resolve(fileData);
    }, 1000);
  });
};
