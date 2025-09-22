import React from 'react';
import { Box, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { 
  Dashboard, 
  Description, 
  FactCheck, 
  Verified, 
  Gavel 
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const AdminNavigation = () => {
  const location = useLocation();
  
  const menuItems = [
    { text: '仪表板概览', icon: <Dashboard />, path: '/admin' },
    { text: '文档验证', icon: <Description />, path: '/admin/document-verification' },
    { text: '数据验证', icon: <FactCheck />, path: '/admin/data-verification' },
    { text: '最终审批', icon: <Gavel />, path: '/admin/final-approval' },
  ];

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              component={Link} 
              to={item.path} 
              key={item.text}
              selected={location.pathname === item.path}
              sx={{
                mb: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'white' : 'inherit',
                minWidth: '40px'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default AdminNavigation;