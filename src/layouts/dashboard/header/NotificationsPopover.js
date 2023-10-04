import React, { useState, useEffect, useCallback } from 'react';
// @mui
import {
  Box,
  Badge,
  Button,
  Grid,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
} from '@mui/material';
import axios from 'axios';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [requests, setRequests] = useState([]);

  const totalUnRead = 5;
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };


  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const fetchRequests = useCallback(async () => {
    try {
      const token = getToken();

      const response = await axios.get('/api/notification', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data.requests);
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleMarkAllAsRead = async () => {
    try {
      const token = getToken();
  
      // Actualizar las solicitudes en el backend
      await axios.put('/api/mark-all-as-read', {
        requests: requests.map((request) => ({
          ...request,
          viewed: "si",
        })),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Actualizar el estado local de las solicitudes
      setRequests(requests.map((request) => ({
        ...request,
        viewed: "si",
      })));
  
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={requests.length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {requests.length} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {requests.map((request) => (
                      <Grid container spacing={0} key={request.id}>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <img src="/assets/icons/ic_notification_package.svg" alt="Imagen" style={{ width: '50%' }} />
                        </Grid>
            
                        <Grid item xs={8}>
                          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', px: 2 }}>
                            <Typography variant="body1">You have a new request from {request.claimant_email} of {request.quantity} of {request.name}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
              ))}          
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

