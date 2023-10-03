import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import ReportPage from './MaterialName';

const MaterialBox = ({ index, onBoxResultChange }) => {
  const [stateIndex, setStateIndex] = useState(-1);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLevel2, setSelectedLevel2] = useState('');
  const [selectedLevel3, setSelectedLevel3] = useState('');
  const [level2s, setLevel2s] = useState([]);
  const [level3s, setLevel3s] = useState([]);
  const [level4s, setLevel4s] = useState([]);
  const [selectedLevel4, setSelectedLevel4] = useState('');
  const [level4Index, setLevel4Index] = useState(-1);
  const [csvRows, setCsvRows] = useState([]);
  const [cityIndex, setCityIndex] = useState(-1);
  const [level2Index, setLevel2Index] = useState(-1);
  const [level3Index, setLevel3Index] = useState(-1);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputNumber(value);
    setResult(selectedLevel4 * value);
  };

  useEffect(() => {
    onBoxResultChange(index, result);
  }, [index, result, onBoxResultChange]);

  const fetchData = async () => {
    try {
      const response = await fetch('/factors.csv');
      const csvData = await response.text();

      const rows = csvData.split('\n');
      const headers = rows[0].split(',');

      setStateIndex(headers.indexOf('Level 1'));
      setCityIndex(headers.indexOf('Level 2'));
      setLevel2Index(headers.indexOf('Level 3'));
      setLevel3Index(headers.indexOf('UOM'));
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
    const filteredCities = new Set(
      csvRows
        .filter((row) => row.split(',')[stateIndex] === 'Material use')
        .map((row) => row.split(',')[cityIndex])
    );

    setCities(Array.from(filteredCities));
  }, [csvRows, stateIndex]);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);

    const filteredLevel2s = csvRows
      .filter(
        (row) =>
          row.split(',')[stateIndex] === 'Material use' &&
          row.split(',')[cityIndex] === selectedCity
      )
      .map((row) => row.split(',')[level2Index]);

    const uniqueLevel2s = [...new Set(filteredLevel2s)];
    setLevel2s(uniqueLevel2s);
    setSelectedLevel2(''); // Agregar esta línea para resetear el estado seleccionado de Level 2 al cambiar la ciudad
    setSelectedLevel3(''); // Agregar esta línea para resetear el estado seleccionado de Level 3 al cambiar la ciudad
    setSelectedLevel4(''); // Agregar esta línea para resetear el estado seleccionado de Level 4 al cambiar la ciudad
  };

  const handleLevel2Change = (event) => {
    const selectedLevel2 = event.target.value;
    setSelectedLevel2(selectedLevel2);

    const filteredLevel3s = csvRows
      .filter(
        (row) =>
          row.split(',')[stateIndex] === 'Material use' &&
          row.split(',')[cityIndex] === selectedCity &&
          row.split(',')[level2Index] === selectedLevel2
      )
      .map((row) => row.split(',')[level3Index]);

    const uniqueLevel3s = [...new Set(filteredLevel3s)];
    setLevel3s(uniqueLevel3s);
    setSelectedLevel3(''); // Agregar esta línea para resetear el estado seleccionado de Level 3 al cambiar Level 2
    setSelectedLevel4(''); // Agregar esta línea para resetear el estado seleccionado de Level 4 al cambiar Level 2
  };

  const handleLevel3Change = (event) => {
    const selectedLevel3 = event.target.value;
    setSelectedLevel3(selectedLevel3);

    const filteredLevel4s = csvRows
      .slice(1)
      .filter(
        (row) =>
          row.split(',')[cityIndex] === selectedCity &&
          row.split(',')[level2Index] === selectedLevel2 &&
          row.split(',')[level3Index] === selectedLevel3
      )
      .map((row) => row.split(',')[level4Index]);

    const uniqueLevel4s = [...new Set(filteredLevel4s)];
    setLevel4s(uniqueLevel4s);

    if (uniqueLevel4s.length > 0) {
      setSelectedLevel4(uniqueLevel4s[uniqueLevel4s.length - 1]);
    } else {
      setSelectedLevel4(''); // No data found, set to empty string
    }
  };


  return (
    <Box container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle2' gutterBottom color='#000000'>
        Categoría
      </Typography>
      <FormControl sx={{ width: '250px' }}>
        <InputLabel id="city-label">Material Category</InputLabel>
        <Select labelId="city-label" value={selectedCity} onChange={handleCityChange}>
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: '250px' }}>
        <InputLabel id="level2-label">Type</InputLabel>
        <Select labelId="level2-label" value={selectedLevel2} onChange={handleLevel2Change}>
          {level2s.map((level2, index) => (
            <MenuItem key={index} value={level2}>
              {level2}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: '250px' }}>
        <InputLabel id="level3-label">Unit</InputLabel>
        <Select labelId="level3-label" value={selectedLevel3} onChange={handleLevel3Change}>
          {level3s.map((level3, index) => (
            <MenuItem key={index} value={level3}>
              {level3}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Level 5" value={selectedLevel4} readOnly sx={{ width: '250px' }} />

      <TextField type='number' placeholder='Cantidad' value={inputNumber} onChange={handleInputChange} />
      <TextField type='number' value={result} readOnly />

    </Box>
  );
};

const MaterialUse = ({ onTotalResultChange }) => {
  const [boxes, setBoxes] = useState([]);
  const [boxCount, setBoxCount] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [boxResults, setBoxResults] = useState([]);

  useEffect(() => {
    // ... (código anterior)

    // Calcular el resultado total al agregar un nuevo box
    const total = boxResults.reduce((acc, val) => acc + val, 0);
    onTotalResultChange(total); // Llama a la función de cambio de resultado total en el componente padre
  }, [boxResults, onTotalResultChange]);

  const handleBoxResultChange = (index, result) => {
    setBoxResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el resultado del MaterialBox específico
      return newResults;
    });

    // Calcular el resultado total sumando los resultados de todos los MaterialBox
    const total = boxResults.reduce((acc, val) => acc + val, 0);
    setTotalResult(total);
  };

  const handleRemoveBox = () => {
    if (boxes.length > 0) {
      const newBoxes = [...boxes];
      newBoxes.pop(); // Remove the last box
      setBoxes(newBoxes);
      setBoxCount(boxCount - 1);
    }
  };
  const handleAddBox = () => {
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      <MaterialBox
        key={prevBoxes.length}
        index={prevBoxes.length} // Pasar el índice como prop
        onBoxResultChange={handleBoxResultChange}
      />
    ]);
    setBoxCount((prevCount) => prevCount + 1);
    setBoxResults((prevResults) => [...prevResults, parseFloat(0)]);

    // Calcular el resultado total al agregar un nuevo box
    const total = boxResults.reduce((acc, val) => acc + val, 0);
    setTotalResult(total);
  };
  
  return (
    <>
      {boxes.map((box) => box)}
      
      <div>
        <Typography variant="subtitle2" gutterBottom color="#000000">
          Resultado Total:
        </Typography>
        <TextField type="number" value={totalResult} readOnly />
      </div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddBox}>
        Material
      </Button>
      {boxCount > 0 && ( // Show the "Quitar" button only when there is at least one box
        <Button variant="contained" startIcon={<Iconify icon="eva:minus-fill" />} onClick={handleRemoveBox}>
          Quitar
        </Button>
      )}
    </>
  );
};

export default MaterialUse;