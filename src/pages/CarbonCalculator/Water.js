import { Grid, Typography, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
// components
import React, { useState } from 'react';

export default function Water() {
  const [selectedOption, setSelectedOption] = useState('no');
  const [showInput, setShowInput] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowInput(event.target.value === 'si');
  };

  return (
          <>
            <div>
              <Typography variant="h4" color="#Cccccc">
                Do you do water treatment?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Si" />
                  </RadioGroup>
                </Grid>
              </Grid>
              {showInput && (
                <TextField
                  label="Entra el monto"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                />
              )}
            </div>
      </> 
  );
}