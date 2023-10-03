import React, { useState } from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, RadioGroup, Radio, TextField } from '@mui/material';
import useFuels from '../../_mock/FactorData';

export default function Goods() {
  const { fuels, setFuels } = useFuels();
  const [selectedSeaTanker, setSelectedSeaTanker] = useState('');
  const [seaValue, setSeaValue] = useState('');
  const [cargoValue, setCargoValue] = useState('');
  const [selectedCargoShip, setSelectedCargoShip] = useState('');
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [fuelValues, setFuelValues] = useState({});

  const handleFuelTypeChange = (event) => {
    const { name: fuelCategory } = event.target;
    const newFuels = { ...fuels };
    newFuels[fuelCategory].show = event.target.checked;

    setFuels(newFuels);
  };

  const handleFuelChange = (event, fuelCategory) => {
    const fuelType = event.target.value;
    const newFuels = { ...fuels };
    const { selected: selectedFuels, carbonFootprints } = newFuels[fuelCategory];
    const fuelData = newFuels[fuelCategory].types[fuelType];
  
    if (event.target.checked) {
      if (!selectedFuels.includes(fuelType)) {
        newFuels[fuelCategory].selected = [...selectedFuels, fuelType];
        carbonFootprints[fuelType] = fuelData.tonnesFactor;
        newFuels[fuelCategory].types[fuelType].menuOpen = false;
      }
    } else if (selectedFuels.includes(fuelType)) {
      newFuels[fuelCategory].selected = selectedFuels.filter(fuel => fuel !== fuelType);
      delete carbonFootprints[fuelType];
    }
  
    if (fuelCategory === 'seaTanker') {
      setSelectedSeaTanker(newFuels[fuelCategory].selected[0] ? fuelData.tonnesFactor : '');
    } else if (fuelCategory === 'cargoShip') {
      setSelectedCargoShip(newFuels[fuelCategory].selected[0] ? fuelData.tonnesFactor : '');
    }
  
    setSelectedFuels(newFuels[fuelCategory].selected); 
  
    setFuels(newFuels);
  };

  const handleFuelValueChange = (event, fuelType) => {
    const value = event.target.value;
    setFuelValues((prevFuelValues) => ({ ...prevFuelValues, [fuelType]: value }));
  };

  return (
    <div>
      <div className="fuelType" style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom color="black">
          Select the type of delivery vehicles owned by you
        </Typography>
        <Grid container spacing={1}>
          {Object.keys(fuels.goods.types).map((fuelType, index) => (
            <Grid item xs={6} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    id={fuelType}
                    name="goods"
                    value={fuelType}
                    onChange={(event) => handleFuelChange(event, 'goods')}
                  />
                }
                label={fuels.goods.types[fuelType].label}
              />
            </Grid>
          ))}
        </Grid>

        <FormControlLabel
          control={
            <Checkbox
              id="liquid"
              name="cargoShip"
              value="liquid"
              onChange={handleFuelTypeChange}
            />
          }
          label="Cargo Ship"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="gaseous"
              name="seaTanker"
              value="gaseous"
              onChange={handleFuelTypeChange}
            />
          }
          label="Sea Tanker"
        />
      </div>

      {Object.keys(fuels.goods.types).map((fuelType) => (
        selectedFuels.includes(fuelType) && (
          <div key={fuelType}>
            <Typography>Goods transferred by {fuels.goods.types[fuelType].label}</Typography>
            <TextField
              type='number'
              placeholder='Enter value'
              value={fuelValues[fuelType] || ''}
              onChange={(event) => handleFuelValueChange(event, fuelType)}
            />
            <TextField
              value={fuels.goods.types[fuelType].tonnesFactor}
            />
            <TextField
              label='Result'
              value={fuelValues[fuelType] ? fuelValues[fuelType] * fuels.goods.types[fuelType].tonnesFactor : ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        )
      ))}

      
      {fuels.cargoShip.show && (
        <div>
          <Typography variant="h5" gutterBottom color="black">
            Select the cargoShip fuel consumed
          </Typography>
          <RadioGroup
            name="cargoShip"
            value={fuels.cargoShip.selected}
            onChange={(event) => handleFuelChange(event, 'cargoShip')}
          >
            <Grid container>
              {Object.keys(fuels.cargoShip.types).map((fuelType, index) => (
                <Grid item xs={3} key={index}>
                  <FormControlLabel
                    value={fuelType}
                    control={<Radio />}
                    label={fuels.cargoShip.types[fuelType].label}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <Typography variant="subtitle1">Goods transferred by cargo ship</Typography>
          <TextField
            type="number"
            placeholder="cargo value"
            value={cargoValue}
            onChange={(event) => setCargoValue(event.target.value)}
          />
          {selectedCargoShip !== '' && cargoValue !== '' && (
            <TextField
              label="Result"
              value={Number(selectedCargoShip) * Number(cargoValue)}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </div>
      )}

      {fuels.seaTanker.show && (
        <div>
          <Typography variant="h5" gutterBottom color="black">
            Select the seaTanker fuel consumed
          </Typography>
          <RadioGroup
            name="seaTanker"
            value={fuels.seaTanker.selected}
            onChange={(event) => handleFuelChange(event, 'seaTanker')}
          >
            <Grid container>
              {Object.keys(fuels.seaTanker.types).map((fuelType, index) => (
                <Grid item xs={3} key={index}>
                  <FormControlLabel
                    value={fuelType}
                    control={<Radio />}
                    label={fuels.seaTanker.types[fuelType].label}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <Typography variant="subtitle1">Goods transferred by sea tanker</Typography>
          <TextField
            type="number"
            placeholder="sea value"
            value={seaValue}
            onChange={(event) => setSeaValue(event.target.value)}
          />
          {selectedSeaTanker !== '' && (
            <TextField
              label="Result"
              value={Number(selectedSeaTanker) * Number(seaValue)}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </div>
      )}

    </div>
  );
}