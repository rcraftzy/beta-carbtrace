import { Grid, Typography, FormControlLabel, Checkbox, FormControl, Menu, IconButton, MenuItem, TextField, InputAdornment } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
// components
import React, { useRef, useEffect } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Fuels({ onFuelResultChange }) {
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
    const totalLiquid = calculateTotal('liquid');
    const totalGaseous = calculateTotal('gaseous');
    const totalSolid = calculateTotal('solid');
    const total = totalLiquid + totalGaseous + totalSolid;
    // Llamamos a la función para pasar la suma total como argumento
    onFuelResultChange(total);
  }, [fuels]);

  return (
          <>
                <div>
                  <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                      Fuels
                  </Typography>
                  <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                         Fuels Consumed: Enter the monthly consumption values
                      </Typography>
                      <FormControl>
                        <FormControlLabel
                          control={<Checkbox id="liquid" name="liquid" value="liquid" />}
                          label="Liquid fuels"
                          onChange={handleFuelTypeChange}
                        />
                        <FormControlLabel
                          control={<Checkbox id="gaseous" name="gaseous" value="gaseous" />}
                          label="Gaseous fuels"
                          onChange={handleFuelTypeChange}
                        />
                        <FormControlLabel
                          control={<Checkbox id="solid" name="solid" value="solid" />}
                          label="Solid fuels"
                          onChange={handleFuelTypeChange}
                        />
                      </FormControl>
                  </div>   
                  {fuels.liquid.show && (
                    <div>
                          <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                              Select the liquid fuels consumed
                          </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.liquid.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="liquid" value={fuelType} onChange={(event) => handleFuelChange(event, 'liquid')} />}
                                  label={fuels.liquid.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                    </div>
                  )}
                  {fuels.liquid.selected.map((fuelType, index) => {
                    const fuelData = fuels.liquid.types[fuelType];
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
                            onChange={(event) => handleAmountChange(event, fuelType, 'liquid', 'liquid', fuelData)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {fuelData.selectedOption === 'toneladas' ? 'tonnes' : fuelData.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                  <IconButton
                                    ref={anchorRef}
                                    onClick={(event) => handleMenuOpen(event, fuelType, 'liquid')}
                                    aria-controls={`menu-${fuelType}`}
                                    aria-haspopup="true"
                                  >
                                    <ArrowDropDown />
                                  </IconButton>
                                  <Menu
                                    id={`menu-${fuelType}`}
                                    open={fuelData.menuOpen}
                                    onClose={() => handleMenuClose(fuelType, 'liquid')}
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
                                      onClick={() => handleOptionSelect('toneladas', fuelType, 'liquid')}
                                      variant="outlined"
                                    >
                                      Tonnes
                                    </MenuItem>
                                    <MenuItem
                                      value="litres"
                                      onClick={() => handleOptionSelect('litres', fuelType, 'liquid')}
                                      variant="outlined"
                                    >
                                      Litres
                                    </MenuItem>
                                    <MenuItem
                                      value="kilowatt"
                                      onClick={() => handleOptionSelect('kWh', fuelType, 'liquid')}
                                      variant="outlined"
                                    >
                                      kWh
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

                  {fuels.gaseous.show && (
                  <div>
                    <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                      Select the gaseous fuels consumed
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.gaseous.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="gaseous" value={fuelType} onChange={(event) => handleFuelChange(event, 'gaseous')} />}
                                  label={fuels.gaseous.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                  {fuels.gaseous.selected.map((fuelType, index) => {
                          const fuelData = fuels.gaseous.types[fuelType];
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
                                  onChange={(event) => handleAmountChange(event, fuelType, 'gaseous', 'gaseous', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'tonnes' : fuelData.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'gaseous')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'gaseous')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'gaseous')}
                                            variant="outlined"
                                          >
                                            Tonnes
                                          </MenuItem>
                                          <MenuItem
                                            value="litres"
                                            onClick={() => handleOptionSelect('litres', fuelType, 'gaseous')}
                                            variant="outlined"
                                          >
                                            Litres
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'gaseous')}
                                            variant="outlined"
                                          >
                                            kWh
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

                  {fuels.solid.show && (
                  <div>
                    <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                      Select the solid fuels consumed
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.solid.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="solid" value={fuelType} onChange={(event) => handleFuelChange(event, 'solid')} />}
                                  label={fuels.solid.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                  {fuels.solid.selected.map((fuelType, index) => {
                          const fuelData = fuels.solid.types[fuelType];
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
                                  onChange={(event) => handleAmountChange(event, fuelType, 'solid', 'solid', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'tonnes' : fuelData.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'solid')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'solid')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'solid')}
                                            variant="outlined"
                                          >
                                            Tonnes
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'solid')}
                                            variant="outlined"
                                          >
                                            kWh
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