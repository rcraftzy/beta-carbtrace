import React, { useState } from 'react';
import { Grid, Typography, Link, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

export default function Welcome( { onSelectionChange }) {
  const [selection, setSelection] = useState('');
  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelection(value);
    onSelectionChange(value);
  };
  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
               Welcome to Carbtrace!
            </Typography>
          </Stack> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
          Carbtrace is a <strong>cross-platform productivity tool</strong> that automates <strong>requests for and submissions
           of CO2 emissions information</strong>, in accordance with the GHG Protocol.
          </Typography>  
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
          By creating a free account with us, you can effortlessly <strong>share product's CO2 emissions 
          information with a single click</strong>, while also enjoying numerous additional benefits.
          </Typography>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
          For more information, you can visit <Link href="https://www.carbtrace.com" target="_blank" rel="noopener">
        Carbtrace
      </Link>{" "}
          </Typography>
          <Typography  gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em', fontWeight: 700 }}>
            Would you like to register an account? <strong style={{ color: 'red'}}>*</strong>
          </Typography> 
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <RadioGroup value={selection} onChange={handleSelectionChange}>
                    <FormControlLabel value="no" control={<Radio />} label="I wish to create an account" />
                    <FormControlLabel value="yes" control={<Radio />} label="I prefer to proceed without creating an account" />
                  </RadioGroup>
                </Grid>
              </Grid>
    </> 
  );
}