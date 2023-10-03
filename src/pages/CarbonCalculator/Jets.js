import { Typography, TextField } from '@mui/material';
// components
import React, { useState } from 'react';

export default function Jets({ onJetsResultChange }) {
  const [inputValue, setInputValue] = useState('0');

  const handleInputChange = (event) => {
    const value = event.target.value;
    const result = parseFloat(value) * 2;
    setInputValue(value); 
    onJetsResultChange(result); 
  };

  return (
          <>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                Private Jets
              </Typography>
            <div>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                If you do possess the private jets, provide details: number of hours of flying of all the jets owned per month
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