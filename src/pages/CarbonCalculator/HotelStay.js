import { Grid, Typography, FormControlLabel, Radio, RadioGroup, TextField, MenuItem } from '@mui/material';
import React, { useState, useCallback } from 'react';
import useFuels from '../../_mock/FactorData';

export default function HotelStay() {
  const { fuels, setFuels } = useFuels();
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedTypesStay, setSelectedTypesStay] = useState([]);
  const [numberOfRoomsArray, setNumberOfRoomsArray] = useState([]);
  const [numberOfNightsArray, setNumberOfNightsArray] = useState([]);

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    setSelectedTypesStay([]);
    setNumberOfRoomsArray([]);
    setNumberOfNightsArray([]);
  };

  const handleCountryChangeStay = useCallback((event, index) => {
    const updatedTypesStay = [...selectedTypesStay];
    updatedTypesStay[index] = event.target.value;
    setSelectedTypesStay(updatedTypesStay);
  }, [selectedTypesStay]);

  const handleNumberOfRoomsChange = (event, index) => {
    const updatedNumberOfRoomsArray = [...numberOfRoomsArray];
    updatedNumberOfRoomsArray[index] = event.target.value;
    setNumberOfRoomsArray(updatedNumberOfRoomsArray);
  };

  const handleNumberOfNightsChange = (event, index) => {
    const updatedNumberOfNightsArray = [...numberOfNightsArray];
    updatedNumberOfNightsArray[index] = event.target.value;
    setNumberOfNightsArray(updatedNumberOfNightsArray);
  };

  function renderTypeOptionsStay() {
    return Object.keys(fuels.hotelStay.types).map((type) => (
      <MenuItem key={type} value={type}>
        {fuels.hotelStay.types[type].label}
      </MenuItem>
    ));
  }

  const calculateTotal = (index) => {
    if (selectedTypesStay[index]) {
      const factor = fuels.hotelStay.types[selectedTypesStay[index]].tonnesFactor;
      const numberOfRooms = numberOfRoomsArray[index] || 0;
      const numberOfNights = numberOfNightsArray[index] || 0;
      return numberOfRooms * numberOfNights * factor;
    }
    return 0;
  };

  return (
    <div>
      <Typography variant="h5">Select how many hotel stays did you have per month</Typography>
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <Grid item xs={3} key={id}>
            <RadioGroup key={id}>
              <FormControlLabel
                control={
                  <Radio
                    id={id}
                    color="primary"
                    checked={selectedRadio === id}
                    onChange={handleRadioChange}
                    value={id}
                  />
                }
                label={id.toString()}
              />
            </RadioGroup>
          </Grid>
        ))}
      </Grid>
      {selectedRadio && (
        <div>
          {Array.from({ length: parseInt(selectedRadio, 10) }, (_, index) => (
            <div key={index}>
              <Typography variant="h5">Details of Hotel Stay {index + 1}</Typography>
              <Typography variant="subtitle1" sx={{ width: '100%', bottom: 10 }}>
                Select the country of stay {index + 1}
              </Typography>
              <TextField
                select
                label="Select type"
                value={selectedTypesStay[index] || ''}
                onChange={(event) => handleCountryChangeStay(event, index)}
                sx={{ width: 400 }}
              >
                {renderTypeOptionsStay()}
              </TextField>
              <Typography variant="subtitle1">
                {`Tonnes factor for ${
                  selectedTypesStay[index]
                    ? fuels.hotelStay.types[selectedTypesStay[index]].label
                    : ''
                }: ${
                  selectedTypesStay[index]
                    ? fuels.hotelStay.types[selectedTypesStay[index]].tonnesFactor
                    : ''
                }`}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Number of rooms booked</Typography>
                  <TextField
                    defaultValue="0"
                    type="number"
                    value={numberOfRoomsArray[index] || ''}
                    onChange={(event) => handleNumberOfRoomsChange(event, index)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Number of nights spent</Typography>
                  <TextField
                    defaultValue="0"
                    type="number"
                    value={numberOfNightsArray[index] || ''}
                    onChange={(event) => handleNumberOfNightsChange(event, index)}
                  />
                </Grid>
              </Grid>
              <TextField
                disabled
                label="Total"
                value={calculateTotal(index)}
                sx={{ width: 400 }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}