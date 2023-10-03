import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';

export default function InforKnow() {
  const [scope1, setScope1] = useState('');
  const [scope2, setScope2] = useState(''); 
  return (
    <>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                What are your scope 1 and 2 emissions <strong style={{ color: 'red'}}>*</strong>
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What is your total Scope 1?</Typography>
                <TextField
                    type="text"
                    placeholder="0 %"
                    value={scope1}
                />
                </Grid>
                <Grid item xs={6}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What is your total Scope 2?</Typography>
                <TextField
                    type="text"
                    placeholder="0 %"
                    value={scope2}
                />
                </Grid>
            </Grid>
    </> 
  );
}