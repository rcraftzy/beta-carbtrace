import React, { useState, useEffect } from 'react';
import { TextField, Typography, FormControl,InputLabel,Grid,Select,MenuItem} from '@mui/material';

export default function WasteDisposal({ onWasteResultChange }) {
  const [stateIndex, setStateIndex] = useState(-1);
  const [selectedCity, setSelectedCity] = useState('');
  const [level4Index, setLevel4Index] = useState(-1);
  const [csvRows, setCsvRows] = useState([]);
  const [cityIndex, setCityIndex] = useState(-1);
  const [level2Index, setLevel2Index] = useState(-1);
  const [level3Index, setLevel3Index] = useState(-1);
  const [levelsData, setLevelsData] = useState({}); 
  const [wasteFactor, setWasteFactor] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    onWasteResultChange(wasteFactor * value); // Llamamos a la función con el resultado actualizado
  };
  
    const getMenuProps = () => ({
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 500, // Ajusta esta altura máxima según tus necesidades
          paddingTop: 0, // Reduce el espacio superior
          paddingBottom: 0, // Reduce el espacio inferior
        },
      },
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/factors.csv');
      const csvData = await response.text();
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
  
      setStateIndex(headers.indexOf('Level 1'));
      setCityIndex(headers.indexOf('Level 2'));
      setLevel2Index(headers.indexOf('Level 3'));
      setLevel3Index(headers.indexOf('Level 5'));
      setLevel4Index(headers.indexOf('kg CO2e'));
  
      setCsvRows(rows.slice(1));
    } catch (error) {
      console.error('Error fetching or parsing CSV file:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const filteredRows = csvRows.filter((row) => row.split(',')[stateIndex] === 'Waste disposal');
    const groupedLevelsData = filteredRows.reduce((acc, row) => {
      const level1 = row.split(',')[stateIndex];
      const level2 = row.split(',')[cityIndex];
      const level3 = row.split(',')[level2Index];
      const level4 = row.split(',')[level3Index];
      const level5 = row.split(',')[level4Index];
      if (!acc[level1]) {
        acc[level1] = [];
      }
      if (level2 !== 'Waste disposal' && /\d/.test(level5)) {
        acc[level1].push(`${level2}-${level3}-${level4}-${level5}`);
      }
      return acc;
    }, {});
    setLevelsData(groupedLevelsData);
  }, [csvRows, stateIndex, cityIndex, level2Index, level3Index, level4Index]);


const handleChange = (event) => {
  // Obtener el valor seleccionado del MenuItem
  const selectedMenuItemValue = event.target.value;
  // Separar el valor seleccionado por el caracter '-'
  const selectedMenuItemValuesArray = selectedMenuItemValue.split('-');
  // Obtener el último valor del array (corresponde a level5)
  const lastValue = selectedMenuItemValuesArray[selectedMenuItemValuesArray.length - 1];
  // Actualizar el estado wasteFactor con el último valor
  setWasteFactor(lastValue);
  // Actualizar el estado selectedCity con el valor completo del MenuItem
  setSelectedCity(selectedMenuItemValue);
};

  return (
    <>
      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
        Waste outputs relating to production of purchased goods
      </Typography>
      <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
       <Grid item xs={6}>
          <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>
            Emission factor (kg CO2e/kg of waste sent to landfill)
          </Typography>
          <FormControl sx={{ width: '350px' }}>
            <InputLabel id="city-label">Category</InputLabel>
            <Select
              labelId="city-label"
              value={selectedCity}
              onChange={handleChange} // Utilizamos el nuevo handleChange
              {...getMenuProps()}
            >
              {Object.keys(levelsData).map((level1, index) => (
                levelsData[level1].map((item, idx) => (
                  <MenuItem key={`${index}-${idx}`} value={item} sx={{ lineHeight: 1 }}>
                    {item}
                  </MenuItem>
                ))
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>
            Mass (Kg)
          </Typography>
          <TextField
            sx={{ width: '250px' }}
            type='number'
            placeholder='0.0 Kg'
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Grid>
      </Grid>

    </>
  );
}