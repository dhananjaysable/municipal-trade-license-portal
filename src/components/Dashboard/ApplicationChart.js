import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const ApplicationChart = ({ applications, type = 'bar' }) => {
  const theme = useTheme();
  
  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main
  ];

  // Prepare monthly data
  const getMonthlyData = () => {
    const monthlyStats = {};
    applications.forEach(app => {
      const date = new Date(app.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthName,
          total: 0,
          approved: 0,
          pending: 0,
          rejected: 0
        };
      }
      
      monthlyStats[monthKey].total++;
      monthlyStats[monthKey][app.status === 'approved' ? 'approved' : 
                             app.status === 'rejected' ? 'rejected' : 'pending']++;
    });
    
    return Object.values(monthlyStats).sort((a, b) => a.month.localeCompare(b.month));
  };

  // Prepare status distribution data
  const getStatusData = () => {
    const statusCount = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(statusCount).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  };

  // Prepare business type data
  const getBusinessTypeData = () => {
    const typeCount = applications.reduce((acc, app) => {
      acc[app.businessType] = (acc[app.businessType] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(typeCount).map(([type, count]) => ({
      name: type,
      value: count
    }));
  };

  const monthlyData = getMonthlyData();
  const statusData = getStatusData();
  const businessTypeData = getBusinessTypeData();

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill={colors[0]} name="Total Applications" />
        <Bar dataKey="approved" fill={colors[1]} name="Approved" />
        <Bar dataKey="pending" fill={colors[2]} name="Pending" />
        <Bar dataKey="rejected" fill={colors[3]} name="Rejected" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke={colors[0]} strokeWidth={2} name="Total Applications" />
        <Line type="monotone" dataKey="approved" stroke={colors[1]} strokeWidth={2} name="Approved" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="total" stackId="1" stroke={colors[0]} fill={colors[0]} fillOpacity={0.6} name="Total" />
        <Area type="monotone" dataKey="approved" stackId="2" stroke={colors[1]} fill={colors[1]} fillOpacity={0.6} name="Approved" />
        <Area type="monotone" dataKey="pending" stackId="3" stroke={colors[2]} fill={colors[2]} fillOpacity={0.6} name="Pending" />
        <Area type="monotone" dataKey="rejected" stackId="4" stroke={colors[3]} fill={colors[3]} fillOpacity={0.6} name="Rejected" />
      </AreaChart>
    </ResponsiveContainer>
  );

  const getChartTitle = () => {
    switch (type) {
      case 'pie': return 'Application Status Distribution';
      case 'line': return 'Application Trends Over Time';
      case 'area': return 'Application Status Breakdown';
      default: return 'Monthly Application Statistics';
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'pie': return renderPieChart();
      case 'line': return renderLineChart();
      case 'area': return renderAreaChart();
      default: return renderBarChart();
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {getChartTitle()}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {applications.length > 0 ? renderChart() : (
            <Box sx={{ 
              height: 300, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary' 
            }}>
              <Typography>No data available</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationChart;
