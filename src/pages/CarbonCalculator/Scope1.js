import React, { useState, useEffect } from 'react';
import { Divider, Typography, Stack} from '@mui/material';
import Fuels from './Fuels';
import Bioenergy from './Bioenergy';
import Delivery from './Delivery';
import Refrigerants from './Refrigerants';
import Vehicles from './Vehicles';
import Jets from './Jets';

export default function Scope1({ onScope1ResultChange }) {
  const [fuel, setFuel] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [refrigerant, setRefrigerant] = useState(0);
  const [vehicle, setVehicle] = useState(0);
  const [totalScope1, setTotalScope1] = useState(0);

  const handleFuelResultChange = (results) => {
    setFuel(results);
  };
  const handleDeliveryResultChange = (results) => {
    setDelivery(results);
  };
  const handleRefrigerantsResultChange = (results) => {
    setRefrigerant(results);
  }
  const handleVehicleResultChange = (results) => {
    setVehicle(results);
  }

  const totalscope = () => {
    const totalScope1Value =
      parseInt(fuel, 10) +
      parseInt(delivery, 10) +
      parseInt(refrigerant, 10) +
      parseInt(vehicle, 10);
    setTotalScope1(totalScope1Value);
    onScope1ResultChange(totalScope1Value);
  };
  
  useEffect(() => {
    totalscope();
  }, [fuel, delivery, refrigerant, vehicle ]);

  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
                Scope 1 emissions
            </Typography>
          </Stack>  
          <Divider/>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}} >
          Scope 1 emissions refer to direct greenhouse gas emissions that come from sources that are owned or 
          controlled by a company or organization. These emissions typically include those generated from combustion 
          processes in on-site equipment, such as fossil fuels burned in boilers, furnaces, and vehicles. Scope 1 emissions 
          are considered to be the most immediate and controllable emissions because they are directly associated with the 
          activities of the entity. Examples of Scope 1 emissions include carbon dioxide (CO2), methane (CH4), and nitrous 
          oxide (N2O) released directly into the atmosphere from the company's operations. Managing and reducing Scope 1 emissions is a crucial step in a company's efforts to mitigate its environmental impact and contribute to climate change mitigation goals.
          </Typography>  
      <Fuels onFuelResultChange={handleFuelResultChange}/>
      <Bioenergy />
      <Delivery onDeliveryResultChange={handleDeliveryResultChange}/>
      <Refrigerants onRefrigerantsResultChange={handleRefrigerantsResultChange}/>
      <Vehicles onVehicleResultChange={handleVehicleResultChange}/>
      <Jets />
    </> 
  );
}