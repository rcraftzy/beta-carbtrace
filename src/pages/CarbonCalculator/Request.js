import React from 'react';
import { Typography, Stack } from '@mui/material';

export default function Request() {
  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
              Request to Share CO2 Emissions Data - Carbtrace
            </Typography>
          </Stack> 
          <Typography mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 900 }}>
           COMPANY A invites you to provide data on CO2 emissions for:
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
             Item: <strong>Pencil</strong>
          </Typography>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
             Quantity: <strong>2000</strong>
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
          To participate, click the "Next" button.
          </Typography>
    </> 
  );
}