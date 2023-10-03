import React from 'react';
import { TextField, Grid } from '@mui/material';

export default function MaterialName({ materialData, onMaterialChange }) {
  const { materialName, email } = materialData;

  const handleMaterialNameChange = (event) => {
    const newMaterialName = event.target.value;
    onMaterialChange({ ...materialData, materialName: newMaterialName });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    onMaterialChange({ ...materialData, email: newEmail });
  };

  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={6}>
          <TextField
            type="text"
            placeholder="Name"
            sx={{ width: '100%' }}
            value={materialName}
            onChange={handleMaterialNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            placeholder="Email"
            sx={{ width: '100%' }}
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
      </Grid>
    </>
  );
};
