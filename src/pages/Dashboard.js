import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
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
  Tooltip
} from '@mui/material';
import {
  Add,
  Visibility,
  TrendingUp,
  PendingActions,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { applications, getUserApplications, getApplicationStats } = useApp();
  const navigate = useNavigate();
  
  const [userApps, setUserApps] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });

  useEffect(() => {
    if (user?.role === 'admin') {
      setStats(getApplicationStats());
    } else {
      const apps = getUserApplications(user?.id);
      setUserApps(apps);
    }
  }, [applications, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'under review': return 'warning';
      case 'verified': return 'info';
      default: return 'default';
    }
  };

  const chartData = [
    { name: 'Total', value: stats.total, color: '#8884d8' },
    { name: 'Approved', value: stats.approved, color: '#82ca9d' },
    { name: 'Pending', value: stats.pending, color: '#ffc658' },
    { name: 'Rejected', value: stats.rejected, color: '#ff7300' }
  ];

  const monthlyData = applications.reduce((acc, app) => {
    const month = new Date(app.createdAt).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.applications += 1;
    } else {
      acc.push({ month, applications: 1 });
    }
    return acc;
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (user?.role === 'admin') {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Municipal Trade License Management System
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Applications"
              value={stats.total}
              icon={<TrendingUp sx={{ fontSize: 40 }} />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Approved"
              value={stats.approved}
              icon={<CheckCircle sx={{ fontSize: 40 }} />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Review"
              value={stats.pending}
              icon={<PendingActions sx={{ fontSize: 40 }} />}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Rejected"
              value={stats.rejected}
              icon={<Cancel sx={{ fontSize: 40 }} />}
              color="error.main"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Applications Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="applications" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Application Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/admin')}
            sx={{ mr: 2 }}
          >
            Manage Applications
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.name || user?.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your trade license applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/apply')}
        >
          New Application
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Applications"
            value={userApps.length}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Approved"
            value={userApps.filter(app => app.status === 'approved').length}
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={userApps.filter(app => app.status === 'under review' || app.status === 'submitted').length}
            icon={<PendingActions sx={{ fontSize: 40 }} />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rejected"
            value={userApps.filter(app => app.status === 'rejected').length}
            icon={<Cancel sx={{ fontSize: 40 }} />}
            color="error.main"
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My Applications
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>License Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>#{app.id}</TableCell>
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
                      <Tooltip title="View Details">
                        <IconButton
                          onClick={() => navigate(`/application/${app.id}`)}
                          size="small"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {userApps.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                No applications found. Start by applying for a new license.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
