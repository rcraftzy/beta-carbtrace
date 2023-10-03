import React, { useState } from 'react';
import { Grid, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function Infor({ onSelectionChange }) {
  const [selection, setSelection] = useState('');
  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelection(value);
    onSelectionChange(value); // Notificar al componente padre sobre la selección
  };

  return (
    <>
      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
        Do you have the information on your scope 1 and 2 emissions? <strong style={{ color: 'red'}}>*</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <RadioGroup value={selection} onChange={handleSelectionChange}>
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}
