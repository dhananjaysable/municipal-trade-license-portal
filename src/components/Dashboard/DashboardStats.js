import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  PendingActions,
  Cancel,
  Assignment,
  Business
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={color}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ color: color, opacity: 0.7 }}>
          {React.cloneElement(icon, { sx: { fontSize: 48 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardStats = ({ stats, userRole = 'user' }) => {
  const adminStats = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: <Assignment />,
      color: 'primary.main',
      subtitle: 'All time applications'
    },
    {
      title: 'Approved Licenses',
      value: stats.approved,
      icon: <CheckCircle />,
      color: 'success.main',
      subtitle: 'Successfully approved'
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: <PendingActions />,
      color: 'warning.main',
      subtitle: 'Awaiting review'
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: <Cancel />,
      color: 'error.main',
      subtitle: 'Applications rejected'
    }
  ];

  const userStats = [
    {
      title: 'My Applications',
      value: stats.total,
      icon: <Assignment />,
      color: 'primary.main',
      subtitle: 'Total submissions'
    },
    {
      title: 'Approved',
      value: stats.approved,
      icon: <CheckCircle />,
      color: 'success.main',
      subtitle: 'Active licenses'
    },
    {
      title: 'Under Review',
      value: stats.pending,
      icon: <PendingActions />,
      color: 'warning.main',
      subtitle: 'Being processed'
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: <Cancel />,
      color: 'error.main',
      subtitle: 'Need revision'
    }
  ];

  const statsToShow = userRole === 'admin' ? adminStats : userStats;

  return (
    <Grid container spacing={3}>
      {statsToShow.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;
