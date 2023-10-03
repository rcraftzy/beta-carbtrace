import { Grid, Typography, FormControlLabel, Checkbox, FormControl, Menu, IconButton, MenuItem, TextField, InputAdornment } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
// components
import React, { useRef, useEffect } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Refrigerants({ onRefrigerantsResultChange }) {
  const { fuels, setFuels } = useFuels();
  const anchorRef = useRef(null);

  const handleFuelChange = (event, fuelCategory) => {
    const fuelType = event.target.value;
    const newFuels = { ...fuels };
    const { selected: selectedFuels, carbonFootprints } = newFuels[fuelCategory];
    const fuelData = newFuels[fuelCategory].types[fuelType];
    if (event.target.checked) {
      if (!selectedFuels.includes(fuelType)) {
        selectedFuels.push(fuelType);
        carbonFootprints[fuelType] = fuelData.tonnesFactor;
        newFuels[fuelCategory].types[fuelType].menuOpen = false;
        setFuels((prevFuels) => ({
          ...prevFuels,
          [fuelCategory]: {
            ...prevFuels[fuelCategory],
            [fuelType]: {
              amount: '',
              selectedOption: 'toneladas',
              menuOpen: false,
            },
          },
        }));
      }
    } else {
      const index = selectedFuels.indexOf(fuelType);
      if (index !== -1) {
        selectedFuels.splice(index, 1);
        delete carbonFootprints[fuelType];
        setFuels((prevFuels) => {
          const newFuels = { ...prevFuels };
          delete newFuels[fuelType];
          return newFuels;
        });
      }
    }
    setFuels(newFuels);
  };
  const handleAmountChange = (event, fuelType, fuelCategory, fuelData, fuelState) => {
    const amount = event.target.value;
    setFuels((prevFuels) => ({
      ...prevFuels,
      [fuelCategory]: {
        ...prevFuels[fuelCategory],
        types: {
          ...prevFuels[fuelCategory].types,
          [fuelType]: {
            ...prevFuels[fuelCategory].types[fuelType],
            amount,
          },
        },
      },
    }));
    const newFuels = { ...fuels };
    const factor = fuelState.types[fuelType].selectedOption === 'toneladas' ? fuelData.tonnesFactor : fuelState.types[fuelType].selectedOption === 'litres' ? fuelData.litresFactor : fuelData.kwhFactor;
    newFuels[fuelCategory].carbonFootprints[fuelType] = amount * factor;
    setFuels(newFuels);
  };
  const handleOptionSelect = (option, fuelType, fuelCategory) => {
    setFuels((prevFuels) => {
      const newFuels = { ...prevFuels };
      newFuels[fuelCategory].types[fuelType].selectedOption = option === 'toneladas' ? 'toneladas' : option;
      return newFuels;
    });
  };
  const handleMenuOpen = (event, fuelType, fuelCategory) => {
    setFuels((prevFuels) => {
      const newFuels = { ...prevFuels };
      newFuels[fuelCategory].types[fuelType].menuOpen = true;
      return newFuels;
    });
  };
  const handleMenuClose = (fuelType, fuelCategory) => {
    setFuels((prevFuels) => {
      const newFuels = { ...prevFuels };
      newFuels[fuelCategory].types[fuelType].menuOpen = false;
      return newFuels;
    });
  };

  const calculateTotal = (fuelCategory) => {
    const selectedFuels = fuels[fuelCategory].selected;
    const total = selectedFuels.reduce((acc, fuelType) => {
      const fuelData = fuels[fuelCategory].types[fuelType];
      const fuelTotal = fuelData.amount * fuelData.tonnesFactor;
      return acc + fuelTotal;
    }, 0);
    return total;
  };

  useEffect(() => {
    const totalVans = calculateTotal('refrigerants');
    onRefrigerantsResultChange(totalVans);
  }, [fuels]);

  // Calcula la suma total para la categoría 'refrigerants'

  return (
          <>
            <div>
                  <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                    Refrigerants
                  </Typography>
                  <div>
                    <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                       Refrigerants: Enter the monthly usage of refrigerants and other chemicals
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.refrigerants.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="refrigerants" value={fuelType} onChange={(event) => handleFuelChange(event, 'refrigerants')} />}
                                  label={fuels.refrigerants.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                    </div>
                    {fuels.refrigerants.selected.map((fuelType, index) => {
                          const fuelData = fuels.refrigerants.types[fuelType];
                          if (!fuelData) {
                            return null;
                          }
                          return (
                            <div key={index}>
                              <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                                Amount of {fuelData.label}
                              </Typography>
                              <FormControl>
                                <TextField
                                  type="number"
                                  placeholder="0.0"
                                  style={{ width: 400 }}
                                  value={fuelData.amount}
                                  onChange={(event) => handleAmountChange(event, fuelType, 'refrigerants', 'refrigerants', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'Kg' : fuelData.selectedOption === 'litres' ? 'litres' : 'Kg'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'refrigerants')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'refrigerants')}
                                          anchorEl={anchorRef.current}
                                          anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            position: 'relative',
                                          }}
                                          transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                          }}
                                        >
                                          <MenuItem
                                            value="tonnes"
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'refrigerants')}
                                            variant="outlined"
                                          >
                                            Kilogramos
                                          </MenuItem>
                                        </Menu>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </FormControl>
                            </div>
                          );
                  })}
            </div>
      </> 
  );
}