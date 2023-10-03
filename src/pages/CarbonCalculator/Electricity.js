import { Typography, MenuItem, TextField } from '@mui/material';
// components
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Electricity({ onElectricityResultChange }) {
  const { fuels, setFuels } = useFuels();
  const [selectedType, setSelectedType] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleCountryChange = useCallback((event) => {
    setSelectedType(event.target.value);
  }, []);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const adjustedFuel = useMemo(() => {
    const selectedTypeData = fuels.location.types[selectedType];
    return selectedTypeData?.tonnesFactor ? inputValue * selectedTypeData.tonnesFactor : 0;
  }, [fuels, selectedType, inputValue]);

  useEffect(() => {
    onElectricityResultChange(adjustedFuel.toFixed(2));
  }, [adjustedFuel, onElectricityResultChange]);

  function renderTypeOptions() {
    return Object.keys(fuels.location.types).map((type) => (
      <MenuItem key={type} value={type}>
        {fuels.location.types[type].label}
      </MenuItem>
    ));
  }

  return (
          <>
              <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                Electricity
              </Typography>
            <div>
            <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                Electricity: Enter monthly consumption of electricity.
              </Typography>
              <TextField
                select
                label="Select type"
                value={selectedType}
                onChange={handleCountryChange}
                sx={{ width: 400 }}
              >
                {renderTypeOptions()}
              </TextField>
              <Typography variant="subtitle1">{`Tonnes factor for ${fuels.location.types[selectedType]?.label}: ${fuels.location.types[selectedType]?.tonnesFactor}`}</Typography>
              <TextField
                label="Enter value"
                type='number'
                value={inputValue}
                onChange={handleInputChange}
                sx={{ width: 400 }}
              />
              <Typography variant="subtitle1">{`Result: ${adjustedFuel.toFixed(2)}`}</Typography>
            </div>
      </> 
  );
}