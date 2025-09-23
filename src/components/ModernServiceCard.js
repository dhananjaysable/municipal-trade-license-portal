import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const ModernServiceCard = ({ title, description, icon, gradient, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        cursor: 'pointer',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          },
          '& .card-bg': {
            opacity: 1,
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Box
        className="card-bg"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: gradient,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 0,
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.03)',
              display: 'inline-flex',
            }}
          >
            {icon}
          </Box>
          <IconButton
            className="arrow-icon"
            sx={{
              background: theme.palette.primary.main,
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: theme.palette.primary.dark,
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ModernServiceCard;