import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import {
  Visibility,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useApp } from '../../contexts/AppContext';

const FinalApproval = () => {
  const { applications, updateApplicationStatus } = useApp();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionDialog, setActionDialog] = useState({ open: false, type: '', application: null });
  const [feedback, setFeedback] = useState('');

  // Filter applications that need final approval (data already verified)
  const pendingFinalApproval = applications.filter(app => 
    app.status === 'data_verified'
  );

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const handleActionDialog = (type, application) => {
    setActionDialog({ open: true, type, application });
    setFeedback('');
  };

  const handleCloseDialog = () => {
    setActionDialog({ open: false, type: '', application: null });
    setSelectedApplication(null);
    setFeedback('');
  };

  const handleStatusUpdate = async () => {
    const { type, application } = actionDialog;
    let newStatus = '';
    
    if (type === 'approve') {
      newStatus = 'approved';
    } else if (type === 'reject') {
      newStatus = 'rejected';
    }

    const result = await updateApplicationStatus(application.id, newStatus, feedback);
    if (result.success) {
      handleCloseDialog();
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        最终审批
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          待最终审批 ({pendingFinalApproval.length})
        </Typography>
        
        {pendingFinalApproval.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            没有待最终审批的申请。
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
                {pendingFinalApproval.map((app) => (
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
                        onClick={() => handleViewApplication(app)}
                        title="查看详情"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleActionDialog('approve', app)}
                        title="批准申请"
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleActionDialog('reject', app)}
                        title="拒绝申请"
                      >
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Application Details Dialog */}
      <Dialog
        open={!!selectedApplication}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              申请 #{selectedApplication.id} - {selectedApplication.businessName}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">申请人信息</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>姓名:</strong> {selectedApplication.applicantName}</Typography>
                    <Typography variant="body2"><strong>邮箱:</strong> {selectedApplication.email}</Typography>
                    <Typography variant="body2"><strong>电话:</strong> {selectedApplication.phone}</Typography>
                    <Typography variant="body2"><strong>地址:</strong> {selectedApplication.address}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">企业信息</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>企业名称:</strong> {selectedApplication.businessName}</Typography>
                    <Typography variant="body2"><strong>许可证类型:</strong> {selectedApplication.licenseType}</Typography>
                    <Typography variant="body2"><strong>企业地址:</strong> {selectedApplication.businessAddress}</Typography>
                    <Typography variant="body2"><strong>企业注册号:</strong> {selectedApplication.businessRegNumber || '未提供'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>审批历史</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2"><strong>文档验证:</strong> 已通过</Typography>
                    <Typography variant="body2"><strong>数据验证:</strong> 已通过</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>取消</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {actionDialog.type === 'approve' ? '批准申请' : '拒绝申请'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="反馈"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button 
            onClick={handleStatusUpdate}
            color={actionDialog.type === 'approve' ? 'primary' : 'error'}
            variant="contained"
          >
            {actionDialog.type === 'approve' ? '批准' : '拒绝'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinalApproval;