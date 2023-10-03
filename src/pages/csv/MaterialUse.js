import React, { useState, useEffect } from 'react';
import { TextField, FormControl,InputLabel,Grid,Select,MenuItem} from '@mui/material';

export default function MaterialUse({ onResultChange, onQuantityChange }) {
  const [stateIndex, setStateIndex] = useState(-1);
  const [selectedCity, setSelectedCity] = useState('');
  const [level4Index, setLevel4Index] = useState(-1);
  const [csvRows, setCsvRows] = useState([]);
  const [cityIndex, setCityIndex] = useState(-1);
  const [level2Index, setLevel2Index] = useState(-1);
  const [level3Index, setLevel3Index] = useState(-1);
  const [result, setResult] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialFactor, setMaterialFactor] = useState('');

  const [levelsData, setLevelsData] = useState({}); 
  const [materialResults, setMaterialResults] = useState([]);
  const [quantityResults, setQuantityResults] = useState([]);

  
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
    const filteredRows = csvRows.filter((row) => row.split(',')[stateIndex] === 'Material use');
    const groupedLevelsData = filteredRows.reduce((acc, row) => {
      const level1 = row.split(',')[stateIndex];
      const level2 = row.split(',')[cityIndex];
      const level3 = row.split(',')[level2Index];
      const level4 = row.split(',')[level3Index];
      const level5 = row.split(',')[level4Index];
      if (!acc[level1]) {
        acc[level1] = [];
      }
      if (level2 !== 'Material use' && /\d/.test(level5)) {
        acc[level1].push(`${level2}-${level3}-${level4}-${level5}`);
      }
      return acc;
    }, {});
    setLevelsData(groupedLevelsData);
  }, [csvRows, stateIndex, cityIndex, level2Index, level3Index, level4Index]);

  useEffect(() => {
    if (result !== '' && !materialResults.includes(result)) {
      onResultChange(result);
    }
  }, [result, materialResults, onResultChange]);

  useEffect(() => {
    if (quantity !== '' && !quantityResults.includes(quantity)) {
      onQuantityChange(quantity);
    }
  }, [quantity, quantityResults, onQuantityChange]);

  useEffect(() => {
    return () => {
      // Limpiar el resultado al desmontar el componente
      setResult('');
    };
  }, []);
  
const handleChange = (event) => {
  // Obtener el valor seleccionado del MenuItem
  const selectedMenuItemValue = event.target.value;
  // Separar el valor seleccionado por el caracter '-'
  const selectedMenuItemValuesArray = selectedMenuItemValue.split('-');
  // Obtener el último valor del array (corresponde a level5)
  const lastValue = selectedMenuItemValuesArray[selectedMenuItemValuesArray.length - 1];
  // Actualizar el estado distanceFactor con el último valor
  // Actualizar el estado selectedCity con el valor completo del MenuItem
  setSelectedCity(selectedMenuItemValue);
  setMaterialFactor(parseFloat(lastValue));
};

const handleQuantityChange = (event) => {
  const value = event.target.value;
  setQuantity(value);
  setResult(materialFactor * value, () => {
    // Esta función se ejecutará después de que setResult haya actualizado el estado
    onResultChange(materialResults);
    onQuantityChange(quantityResults);
  });
};

  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
        <Grid item xs={6}>
            <FormControl sx={{ width: '100%' }}>
            <InputLabel id="city-label">Category</InputLabel>
            <Select
              labelId="city-label"
              value={selectedCity}
              onChange={handleChange}
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
          <TextField
            type="text"
            sx={{ width: '100%' }}
            placeholder="0.0 Kg"
            value={quantity}
            onChange={handleQuantityChange}
           />
        </Grid>
      </Grid>
    </>
  );
}