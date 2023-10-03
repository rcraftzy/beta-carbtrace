import { Typography, TextField } from '@mui/material';
// components
import React, { useState } from 'react';

export default function Jets({ onHeatResultChange }) {
  const [inputValue, setInputValue] = useState('0');

  const handleInputChange = (event) => {
    const value = event.target.value;
    const result = parseFloat(value) * 17.07;
    setInputValue(value); 
    onHeatResultChange(result); 
  };

  return (
          <>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                Heat and Steam
              </Typography>
            <div>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                 Heat and Steam: Enter monthly consumption of electricity.
              </Typography>
              <TextField
                label="Enter value"
                type='number'
                value={inputValue}
                onChange={handleInputChange}
                sx={{ width: 400 }}
              />
            </div>
      </> 
  );
}