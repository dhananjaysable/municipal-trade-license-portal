import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Grid
} from '@mui/material';
import {
  Visibility,
  Assignment
} from '@mui/icons-material';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { applications, getApplicationStats } = useApp();
  const navigate = useNavigate();
  const stats = getApplicationStats();

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

  // Filter applications for different approval stages
  const documentVerificationApps = applications.filter(app => 
    ['submitted', 'under review'].includes(app.status)
  ).slice(0, 5);

  const dataVerificationApps = applications.filter(app => 
    app.status === 'documents_verified'
  ).slice(0, 5);

  const finalApprovalApps = applications.filter(app => 
    app.status === 'data_verified'
  ).slice(0, 5);

  const handleNavigateToDetails = (path) => {
    navigate(path);
  };

  const ApplicationsTable = ({ apps, title, emptyMessage, navigatePath }) => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
          {title} ({apps.length})
        </Typography>
        {apps.length > 0 && (
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={() => handleNavigateToDetails(navigatePath)}
          >
            查看全部
          </Typography>
        )}
      </Box>
      
      {apps.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>申请人</TableCell>
                <TableCell>企业名称</TableCell>
                <TableCell>许可证类型</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>日期</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apps.map((app) => (
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
                      onClick={() => handleNavigateToDetails(navigatePath)}
                      title="查看详情"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        管理员仪表板
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                总申请数
              </Typography>
              <Typography variant="h4" component="div">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                待处理申请
              </Typography>
              <Typography variant="h4" component="div">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                已批准申请
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {stats.approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                已拒绝申请
              </Typography>
              <Typography variant="h4" component="div" color="error.main">
                {stats.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Document Verification Applications */}
      <ApplicationsTable 
        apps={documentVerificationApps} 
        title="待文档验证" 
        emptyMessage="没有待文档验证的申请" 
        navigatePath="/admin/document-verification" 
      />

      {/* Data Verification Applications */}
      <ApplicationsTable 
        apps={dataVerificationApps} 
        title="待数据验证" 
        emptyMessage="没有待数据验证的申请" 
        navigatePath="/admin/data-verification" 
      />

      {/* Final Approval Applications */}
      <ApplicationsTable 
        apps={finalApprovalApps} 
        title="待最终审批" 
        emptyMessage="没有待最终审批的申请" 
        navigatePath="/admin/final-approval" 
      />
    </Box>
  );
};

export default AdminDashboard;