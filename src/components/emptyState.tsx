import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionText?: string;
  actionTo?: string;
  icon?: React.ReactNode;
};

export function EmptyState({
  title = 'Записей не найдено',
  description = 'Здесь будут отображаться ваши записи, когда они появятся',
  actionText,
  actionTo,
  icon,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        my: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      {icon && (
        <Box sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}>{icon}</Box>
      )}

      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>

      <Typography variant='body1' color='text.secondary' paragraph>
        {description}
      </Typography>

      {actionText && actionTo && (
        <Button
          component={Link}
          to={actionTo}
          variant='contained'
          sx={{ mt: 2 }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
}
