import { Grid, Typography, FormControlLabel, Checkbox, FormControl, Menu, IconButton, MenuItem, TextField, InputAdornment } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
// components
import React, { useState, useRef } from 'react';
import useFuels from '../../_mock/FactorData';

export default function Materials() {
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
  const [selectedSeaTanker, setSelectedSeaTanker] = useState('');
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
        setSelectedSeaTanker(fuelData.tonnesFactor);
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
        setSelectedSeaTanker('');
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

  return (
          <>
            <div>
              <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h5" gutterBottom color="black">
                        Select the type of materials used
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox id="liquid" name="construction" value="liquid" />}
                        label="Construction"
                        onChange={handleFuelTypeChange}
                      />
                      <FormControlLabel
                        control={<Checkbox id="gaseous" name="electricalItems" value="gaseous" />}
                        label="Electrical Items"
                        onChange={handleFuelTypeChange}
                      />
                      <Grid container spacing={1}>
                            {Object.keys(fuels.materials.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="materials" value={fuelType} onChange={(event) => handleFuelChange(event, 'materials')} />}
                                  label={fuels.materials.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                      </Grid>
                  </div>

                  {fuels.construction.show && (
                    <div>
                    <Typography variant="h5" gutterBottom color="black">
                      Select the construction fuels consumed
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.construction.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="construction" value={fuelType} onChange={(event) => handleFuelChange(event, 'construction')} />}
                                  label={fuels.construction.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}
                   {selectedSeaTanker !== '' && (
                    <TextField
                      label="Tonnes Factor"
                      value={selectedSeaTanker}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )} 
                  {fuels.electricalItems.show && (
                  <div>
                    <Typography variant="h5" gutterBottom color="black">
                      Select the electricalItems fuels consumed
                    </Typography>
                          <Grid container spacing={2}>
                            {Object.keys(fuels.electricalItems.types).map((fuelType, index) => (
                              <Grid item xs={6} key={index}>
                                <FormControlLabel
                                  control={<Checkbox id={fuelType} name="electricalItems" value={fuelType} onChange={(event) => handleFuelChange(event, 'electricalItems')} />}
                                  label={fuels.electricalItems.types[fuelType].label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                  )}

                  {fuels.materials.selected.map((fuelType, index) => {
                          const fuelData = fuels.materials.types[fuelType];
                          if (!fuelData) {
                            return null;
                          }
                          return (
                            <div key={index}>
                              <Typography variant="h5" gutterBottom color="black">
                                Amount of {fuelData.label} used
                              </Typography>
                              <FormControl>
                                <TextField
                                  type="number"
                                  placeholder="0.0"
                                  style={{ width: 400 }}
                                  value={fuelData.amount}
                                  onChange={(event) => handleAmountChange(event, fuelType, 'materials', 'materials', fuelData)}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {fuelData.selectedOption === 'toneladas' ? 'tonnes' : fuelData.selectedOption === 'litres' ? 'litres' : 'kHw'}
                                        <IconButton
                                          ref={anchorRef}
                                          onClick={(event) => handleMenuOpen(event, fuelType, 'materials')}
                                          aria-controls={`menu-${fuelType}`}
                                          aria-haspopup="true"
                                        >
                                          <ArrowDropDown />
                                        </IconButton>
                                        <Menu
                                          id={`menu-${fuelType}`}
                                          open={fuelData.menuOpen}
                                          onClose={() => handleMenuClose(fuelType, 'materials')}
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
                                            onClick={() => handleOptionSelect('toneladas', fuelType, 'materials')}
                                            variant="outlined"
                                          >
                                            Tonnes
                                          </MenuItem>
                                          <MenuItem
                                            value="kilowatt"
                                            onClick={() => handleOptionSelect('kWh', fuelType, 'materials')}
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