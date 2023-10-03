import { Grid, Typography, Checkbox, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Vehicles({ onVehicleResultChange }) {
  const { fuels, setFuels } = useFuels();
  const [selectedFuels, setSelectedFuels] = useState({});

  const handleFuelChange = (event, fuelCategory) => {
    const fuelType = event.target.value;
    const newFuels = { ...fuels };
    const fuelData = newFuels[fuelCategory].types[fuelType];
    if (event.target.checked) {
      newFuels[fuelCategory].selected.push(fuelType);
      newFuels[fuelCategory].carbonFootprints[fuelType] = fuelData.tonnesFactor;
      newFuels[fuelCategory].types[fuelType].menuOpen = false;
      setFuels(newFuels);
      setSelectedFuels((prevSelectedFuels) => ({
        ...prevSelectedFuels,
        [fuelType]: {
          carsOwned: '',
          distanceTraveled: '',
        },
      }));
    } else {
      const index = newFuels[fuelCategory].selected.indexOf(fuelType);
      if (index !== -1) {
        newFuels[fuelCategory].selected.splice(index, 1);
        delete newFuels[fuelCategory].carbonFootprints[fuelType];
        setFuels(newFuels);
        setSelectedFuels((prevSelectedFuels) => {
          const { [fuelType]: removedFuelType, ...updatedSelectedFuels } = prevSelectedFuels;
          return updatedSelectedFuels;
        });
      }
    }
  };

  const handleInputChange = (event, fuelType) => {
    const { name, value } = event.target;
    setSelectedFuels((prevSelectedFuels) => ({
      ...prevSelectedFuels,
      [fuelType]: {
        ...prevSelectedFuels[fuelType],
        [name]: value,
      },
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(selectedFuels).forEach((fuelType) => {
      const fuelData = fuels.vehicles.types[fuelType];
      const { carsOwned, distanceTraveled } = selectedFuels[fuelType];
      const result = fuelData.tonnesFactor * carsOwned * distanceTraveled;
      total += result;
    });
    return total;
  };

  useEffect(() => {
    const totalVehicle = calculateTotal();
    onVehicleResultChange(totalVehicle);
  }, [fuels]);

  // Calcula la suma total de todos los resultados

  return (
    <div>
                  <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                    Owned Vehicles
                  </Typography>
      <div>
        <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
          Owned Vehicles: Enter the monthly data for the vehicles you own.
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(fuels.vehicles.types).map((fuelType, index) => (
            <Grid item xs={6} key={index}>
              <Checkbox
                id={fuelType}
                name="vehicles"
                value={fuelType}
                onChange={(event) => handleFuelChange(event, 'vehicles')}
              />
              {fuels.vehicles.types[fuelType].label}
            </Grid>
          ))}
        </Grid>
      </div>
      {Object.keys(selectedFuels).map((fuelType, index) => {
        const firstWord = fuels.vehicles.types[fuelType].label.split(' ')[0];
        const fuelData = fuels.vehicles.types[fuelType];
        const { carsOwned, distanceTraveled } = selectedFuels[fuelType];
        const result = fuelData.tonnesFactor * carsOwned * distanceTraveled;
        return (
            <div key={index}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <Typography>Number of {firstWord} cars you own</Typography>
                <TextField
                    type="number"
                    placeholder="0.0"
                    fullWidth
                    name="carsOwned"
                    value={carsOwned}
                    onChange={(event) => handleInputChange(event, fuelType)}
                />
                </Grid>
                <Grid item xs={6}>
                <Typography>Average distance a single car traveled per month</Typography>
                <TextField
                    type="number"
                    placeholder="0.0"
                    fullWidth
                    name="distanceTraveled"
                    value={distanceTraveled}
                    onChange={(event) => handleInputChange(event, fuelType)}
                />
                </Grid>
            </Grid>
            </div>
        );
        })}
    </div>
  );
}
