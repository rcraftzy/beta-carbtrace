// components
import React, { useState, useEffect } from 'react';
import {Divider, Typography, Stack} from '@mui/material';
import Electricity from './Electricity';
import Heat from './Heat';

export default function Scope2({ onScope2ResultChange }) {
  const[electricity, setElectricity] = useState(0)
  const[heat, setHeat] = useState(0)
  const [totalScope2, setTotalScope2] = useState(0);


  const handleElectricityResultChange = (results) => {
    setElectricity(results);
  }
  const handleHeatResultChange = (results) => {
    setHeat(results);
  }

  const totalscope = () => {
    // Convert the state values to numbers using parseInt with radix parameter
    const totalScope2Value =
      parseInt(electricity, 10) +
      parseInt(heat, 10);
    setTotalScope2(totalScope2Value);
    onScope2ResultChange(totalScope2Value);
  };
  
  useEffect(() => {
    totalscope(); // Call the totalscope function whenever any of the relevant values change
  }, [electricity, heat ]);

  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
                Scope 2 emissions
            </Typography>
          </Stack>  
          <Divider/>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}} >
          Scope 2 emissions refer to indirect greenhouse gas emissions associated with the consumption of purchased electricity, heat, or steam by a company or organization. These emissions occur as a result of using electricity generated elsewhere, typically by a utility company. The emissions are not produced on-site but are still related to the company's activities and consumption patterns.
          </Typography> 
        <Electricity onElectricityResultChange={handleElectricityResultChange}/>
        <Heat onHeatResultChange={handleHeatResultChange}/>
    </> 
  );
}