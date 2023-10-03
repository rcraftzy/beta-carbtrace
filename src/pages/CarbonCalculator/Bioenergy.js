import { Grid, Typography, FormControlLabel, Checkbox, FormControl, Menu, IconButton, MenuItem, TextField, InputAdornment } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
// components
import React, { useRef } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Bioenergy() {
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
      if (fuelCategory === 'biomass') {
        delete newFuels.biomass.types.biomass;
      } else if (fuelCategory === 'biogas') {
        delete newFuels.biogas.types.biogas;
      }
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

//  const totalBiogas = calculateTotal('biogas');
//  const totalBiomass = calculateTotal('biomass');
//  const totalBiofuel = calculateTotal('biofuel');

  return (
          <>
              <div>
                  <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
                    Bioenergy
                  </Typography>
                  <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                         Bioenergy: Enter the monthly values of bioenergy consumption
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox id="biofuel" name="biofuel" value="liquid" />}
                        label="Biofuels (liquids)"
                        onChange={handleFuelTypeChange}
                      />
                      <FormControlLabel
                        control={<Checkbox id="biomass" name="biomass" value="biomass" />}
                        label="Biomass (solid)"
                        onChange={handleFuelTypeChange}
                      />
                      <FormControlLabel
                        control={<Checkbox id="biogas" name="biogas" value="biogas" />}
                        label="Biogas (gas)"
                        onChange={handleFuelTypeChange}
                      />
                  </div>

                  {fuels.biofuel.show && (
                  <div>
                    <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: 16, fontWeight: 500 }}>
                      Select biofuels
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.biofuel.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="biofuel" value={fuelType} onChange={(event) => handleFuelChange(event, 'biofuel')} />}
                                  label={fuels.biofuel.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                  {fuels.biofuel.selected.map((fuelType, index) => {
                          const fuelData = fuels.biofuel.types[fuelType];
                          if (!fuelData) {
                            return null;
                          }
                          return (
                            <div key={index}>
                              <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                                Enter the amount of {fuelData.label}
                              </Typography>
                              <FormControl>
                                <TextField
                                  type="number"
                                  placeholder="0.0"
                                  style={{ width: 400 }}
                                  value={fuelData.amount}
                                  onChange={(event) => handleAmountChange(event, fuelType, 'biofuel', 'biofuel', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'litres' : fuelData.selectedOption === 'litres' ? 'Gj' : 'Kg'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'biofuel')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'biofuel')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'biofuel')}
                                            variant="outlined"
                                          >
                                            Litres
                                          </MenuItem>
                                          <MenuItem
                                            value="litres"
                                            onClick={() => handleOptionSelect('litres', fuelType, 'biofuel')}
                                            variant="outlined"
                                          >
                                            Gj
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'biofuel')}
                                            variant="outlined"
                                          >
                                            Kg
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
                  
                  {fuels.biomass && fuels.biomass.show && (
                    <div>
                      <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                        Amount of Biomass
                      </Typography>
                      <FormControl>
                        <TextField
                          type="number"
                          placeholder="0.0"
                          style={{ width: 400 }}
                          value={fuels.biomass.types.biomass.amount}
                          onChange={(event) => handleAmountChange(event, 'biomass', 'biomass', 'biomass', fuels.biomass.types.biomass)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {fuels.biomass.types.biomass.selectedOption === 'toneladas' ? 'tonnes' : fuels.biomass.types.biomass.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                <IconButton
                                  ref={anchorRef}
                                  onClick={(event) => handleMenuOpen(event, 'biomass', 'biomass')}
                                  aria-controls={`menu-biomass`}
                                  aria-haspopup="true"
                                >
                                  <ArrowDropDown />
                                </IconButton>
                                <Menu
                                  id={`menu-biomass`}
                                  open={fuels.biomass.types.biomass.menuOpen}
                                  onClose={() => handleMenuClose('biomass', 'biomass')}
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
                                    onClick={() => handleOptionSelect('toneladas', 'biomass', 'biomass')}
                                    variant="outlined"
                                  >
                                    Tonnes
                                  </MenuItem>
                                  <MenuItem
                                    value="kilowatt"
                                    onClick={() => handleOptionSelect('kWh', 'biomass', 'biomass')}
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
                  )}
                  {fuels.biogas && fuels.biogas.show && (
                    <div>
                      <Typography gutterBottom sx={{ color: '#2c3345', fontSize: '1.2em', fontWeight: 600 }}>
                        Amount of Biogas
                      </Typography>
                      <FormControl>
                        <TextField
                          type="number"
                          placeholder="0.0"
                          style={{ width: 400 }}
                          value={fuels.biogas.types.biogas.amount}
                          onChange={(event) => handleAmountChange(event, 'biogas', 'biogas', 'biogas', fuels.biogas.types.biogas)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {fuels.biogas.types.biogas.selectedOption === 'toneladas' ? 'tonnes' : fuels.biogas.types.biogas.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                <IconButton
                                  ref={anchorRef}
                                  onClick={(event) => handleMenuOpen(event, 'biogas', 'biogas')}
                                  aria-controls={`menu-biogas`}
                                  aria-haspopup="true"
                                >
                                  <ArrowDropDown />
                                </IconButton>
                                <Menu
                                  id={`menu-biogas`}
                                  open={fuels.biogas.types.biogas.menuOpen}
                                  onClose={() => handleMenuClose('biogas', 'biogas')}
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
                                    onClick={() => handleOptionSelect('toneladas', 'biogas', 'biogas')}
                                    variant="outlined"
                                  >
                                    Tonnes
                                  </MenuItem>
                                  <MenuItem
                                    value="kilowatt"
                                    onClick={() => handleOptionSelect('kWh', 'biogas', 'biogas')}
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
                  )}

              </div>
      </> 
  );
}