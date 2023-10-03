import React, { useState } from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, TextField } from '@mui/material';
import useFuels from '../../_mock/FactorData';

export default function BusinessTravel() {
  const { fuels, setFuels } = useFuels();
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [fuelValues, setFuelValues] = useState({});

  const businessTravelTypes = fuels.businessTravel.types;

  const handleFuelChange = (event, fuelCategory) => {
    const fuelType = event.target.value;
    const newFuels = { ...fuels };
    const { selected: selectedFuels, carbonFootprints } = newFuels[fuelCategory];
    const fuelData = businessTravelTypes[fuelType];
  
    if (event.target.checked) {
      if (!selectedFuels.includes(fuelType)) {
        newFuels[fuelCategory].selected = [...selectedFuels, fuelType];
        carbonFootprints[fuelType] = fuelData.tonnesFactor;
        newFuels[fuelCategory].types[fuelType].menuOpen = false;
      }
    } else if (selectedFuels.includes(fuelType)) {
      newFuels[fuelCategory].selected = selectedFuels.filter(fuel => fuel !== fuelType);
      const newCarbonFootprints = { ...carbonFootprints };
      delete newCarbonFootprints[fuelType];
      newFuels[fuelCategory].carbonFootprints = newCarbonFootprints;
    }
  
    setSelectedFuels(newFuels[fuelCategory].selected);
    setFuels((prevFuels) => ({ ...prevFuels, ...newFuels }));
  };

  return (
    <div>
      <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom color="black">
          How employees commute to work
        </Typography>
        <Grid container spacing={1}>
          {Object.keys(businessTravelTypes).map((fuelType, index) => (
            <Grid item xs={6} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    id={fuelType}
                    name="businessTravel"
                    value={fuelType}
                    onChange={(event) => handleFuelChange(event, 'businessTravel')}
                  />
                }
                label={businessTravelTypes[fuelType].label}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {Object.keys(businessTravelTypes).map((fuelType) => (
        selectedFuels.includes(fuelType) && (
          <div key={fuelType}>
            <Typography>Distance travelled by employees through {businessTravelTypes[fuelType].label}</Typography>
            <TextField
              type='number'
              placeholder='Enter value'
              value={fuelValues[fuelType] || ''}
              onChange={(event) => setFuelValues((prevFuelValues) => ({ ...prevFuelValues, [fuelType]: event.target.value }))}
            />
            <TextField
              value={businessTravelTypes[fuelType].tonnesFactor}
            />
            <TextField
              label='Result'
              value={fuelValues[fuelType] ? fuelValues[fuelType] * businessTravelTypes[fuelType].tonnesFactor : ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )
      ))}
    </div>
  );
}