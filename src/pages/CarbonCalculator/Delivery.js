import { Grid, Typography, FormControlLabel, Checkbox, FormControl, Menu, IconButton, MenuItem, TextField, InputAdornment } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
// components
import React, { useRef, useEffect } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Delivery({ onDeliveryResultChange }) {
  const { fuels, setFuels } = useFuels();
  const anchorRef = useRef(null);

  const handleFuelTypeChange = (event) => {
    const { name: fuelCategory } = event.target;
    const newFuels = { ...fuels };
    if (event.target.checked) {
      newFuels[fuelCategory].show = true;
    } else {
      newFuels[fuelCategory].show = false;
      newFuels[fuelCategory].selected = [];
    }
    setFuels(newFuels);
  };

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
      const factor = fuelData.selectedOption === 'toneladas' ? fuelData.tonnesFactor : fuelData.selectedOption === 'litres' ? fuelData.litresFactor : fuelData.kwhFactor;
      const fuelTotal = fuelData.amount * factor;
      return acc + fuelTotal;
    }, 0);
    return total;
  };

  useEffect(() => {
    const totalVans = calculateTotal('vans');
    const totalHgv = calculateTotal('hgv');
    const total = totalVans + totalHgv;
    onDeliveryResultChange(total);
  }, [fuels]);



  return (
          <>
              <div>
                      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                         Delivery Vehicles
                      </Typography>
                  <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                        Delivery Vehicles: Enter the monthly data
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox id="liquid" name="vans" value="liquid" />}
                        label="Vans"
                        onChange={handleFuelTypeChange}
                      />
                      <FormControlLabel
                        control={<Checkbox id="gaseous" name="hgv" value="gaseous" />}
                        label="HGV"
                        onChange={handleFuelTypeChange}
                      />
                  </div>

                  {fuels.vans.show && (
                  <div>
                    <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                      Capacity of delivery vans
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.vans.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="vans" value={fuelType} onChange={(event) => handleFuelChange(event, 'vans')} />}
                                  label={fuels.vans.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                  {fuels.vans.selected.map((fuelType, index) => {
                          const fuelData = fuels.vans.types[fuelType];
                          if (!fuelData) {
                            return null;
                          }
                          return (
                            <div key={index}>
                              <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                              Distance travelled by {fuelData.label} (total by all vans)
                              </Typography>
                              <FormControl>
                                <TextField
                                  type="number"
                                  placeholder="0.0"
                                  style={{ width: 400 }}
                                  value={fuelData.amount}
                                  onChange={(event) => handleAmountChange(event, fuelType, 'vans', 'vans', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'Km' : fuelData.selectedOption === 'litres' ? 'litres' : 'Miles'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'vans')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'vans')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'vans')}
                                            variant="outlined"
                                          >
                                            Km
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'vans')}
                                            variant="outlined"
                                          >
                                            Miles
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
                         
                  {fuels.hgv.show && (
                  <div>
                    <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                      Select the hgv fuels consumed
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.hgv.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="hgv" value={fuelType} onChange={(event) => handleFuelChange(event, 'hgv')} />}
                                  label={fuels.hgv.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                  {fuels.hgv.selected.map((fuelType, index) => {
                          const fuelData = fuels.hgv.types[fuelType];
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
                                  onChange={(event) => handleAmountChange(event, fuelType, 'hgv', 'hgv', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'Km' : fuelData.selectedOption === 'litres' ? 'litres' : 'Miles'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'hgv')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'hgv')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'hgv')}
                                            variant="outlined"
                                          >
                                            Kilometers
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'hgv')}
                                            variant="outlined"
                                          >
                                            Miles
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