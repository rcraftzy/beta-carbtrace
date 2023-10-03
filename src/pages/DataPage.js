import React, { useEffect, useState, useCallback } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, Table, TableCell, TableBody, TableHead, TableRow, Typography, TextField } from '@mui/material';
import axios from 'axios';


export default function DataPage() {
  const [countries, setCountries] = useState([]);
  const [showAddSupplier, setShowAddSupplier] =useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedLevel2, setSelectedLevel2] = useState('');
  const [selectedLevel3, setSelectedLevel3] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [level2s, setLevel2s] = useState([]); 
  const [level3s, setLevel3s] = useState([]); 
  const [level4s, setLevel4s] = useState([]);
  const [selectedLevel4, setSelectedLevel4] = useState('');
  const [level4Index, setLevel4Index] = useState(-1);
  const [csvRows, setCsvRows] = useState([]);
  const [countryIndex, setCountryIndex] = useState(-1);
  const [stateIndex, setStateIndex] = useState(-1);
  const [cityIndex, setCityIndex] = useState(-1);
  const [level2Index, setLevel2Index] = useState(-1);
  const [level3Index, setLevel3Index] = useState(-1);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState('');

  const handleShowAddSupplier = () => {
    setShowAddSupplier(true);
  }
  const handleHideAddSupplier = () => {
    setShowAddSupplier(false);
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputNumber(value);
    setResult((selectedLevel4 * value));
  };  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/factors.csv');
        const csvData = await response.text();

        const rows = csvData.split('\n');
        const headers = rows[0].split(',');

        setCountryIndex(headers.indexOf('Scope L2'));
        setStateIndex(headers.indexOf('Level 1'));
        setCityIndex(headers.indexOf('Level 2'));
        setLevel2Index(headers.indexOf('Level 3'));
        setLevel3Index(headers.indexOf('UOM'));
        setLevel4Index(headers.indexOf('kg CO2e'));

        const uniqueCountries = [...new Set(rows.slice(1).map(row => row.split(',')[countryIndex]))];

        setCountries(uniqueCountries);
        setCsvRows(rows);
      } catch (error) {
        console.error('Error fetching or parsing CSV file:', error);
      }
    };

    fetchData();
  }, [countryIndex, stateIndex, cityIndex]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);

    const filteredStates = csvRows
      .slice(1)
      .filter(row => row.split(',')[countryIndex] === selectedCountry)
      .map(row => row.split(',')[stateIndex]);

    const uniqueStates = [...new Set(filteredStates)];
    setStates(uniqueStates);
    setSelectedState('');
    setSelectedLevel3(''); // Agregar esta línea para resetear el estado seleccionado de Level 3 al cambiar Level 2
    setSelectedLevel4(''); // Agregar esta línea para resetear el estado seleccionado de Level 4 al cambiar Level 2
    setSelectedCity('');
    setSelectedLevel2('');
    setCities([]);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    const filteredCities = csvRows
      .slice(1)
      .filter(row =>
        row.split(',')[countryIndex] === selectedCountry &&
        row.split(',')[stateIndex] === selectedState
      )
      .map(row => row.split(',')[cityIndex]);

    const uniqueCities = [...new Set(filteredCities)];
    setCities(uniqueCities);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  
    const filteredLevel2s = csvRows
      .slice(1)
      .filter(
        (row) =>
          row.split(',')[countryIndex] === selectedCountry &&
          row.split(',')[stateIndex] === selectedState &&
          row.split(',')[cityIndex] === selectedCity
      )
      .map((row) => row.split(',')[level2Index]);
  
    const uniqueLevel2s = [...new Set(filteredLevel2s)];
    setLevel2s(uniqueLevel2s);
  };

  const handleLevel2Change = (event) => {
    const selectedLevel2 = event.target.value;
    setSelectedLevel2(selectedLevel2);
  
    const filteredLevel3s = csvRows
      .slice(1)
      .filter(
        (row) =>
          row.split(',')[countryIndex] === selectedCountry &&
          row.split(',')[stateIndex] === selectedState &&
          row.split(',')[cityIndex] === selectedCity &&
          row.split(',')[level2Index] === selectedLevel2
      )
      .map((row) => row.split(',')[level3Index]);
  
    const uniqueLevel3s = [...new Set(filteredLevel3s)];
    setLevel3s(uniqueLevel3s);
  };

  const handleLevel3Change = (event) => {
    const selectedLevel3 = event.target.value;
    setSelectedLevel3(selectedLevel3);
  
    const filteredLevel4s = csvRows
      .slice(1)
      .filter(
        (row) =>
          row.split(',')[countryIndex] === selectedCountry &&
          row.split(',')[stateIndex] === selectedState &&
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

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };
  
  const handleAddEmissions = async () => {
    try {
      const token = getToken();
      const data = {
        selectedCountry,
        selectedState,
        selectedCity,
        selectedLevel2,
        selectedLevel3,
        result
      };
      const response = await axios.post(
        '/update-emissions',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [emissions, setEmissions] = useState([]);

  const fetchEmissions = useCallback(async () => {
    try {
      const token = getToken(); // Obtiene el token JWT almacenado (puedes implementar la función getToken según tus necesidades)

      const response = await axios.get('http://127.0.0.1:5000/api/table-emissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmissions(response.data.emissions);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchEmissions();
  }, [fetchEmissions]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Upload your data
        </Typography>
        <Button variant="contained" sx={{ width: 200, height: 40,backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} onClick={handleShowAddSupplier}>
          Add Emission
        </Button>
      </Stack>
      {showAddSupplier && (
        <Stack direction="column" spacing={2} style={{ position: 'fixed', top: 0, right: 0, width: 400, height: '100%', backgroundColor: 'white',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.2)' }}>
        <FormControl sx={{width:'250px'}}>
          <InputLabel id="country-label">Scope</InputLabel>
          <Select
            labelId="country-label"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl sx={{width:'250px'}}>
          <InputLabel id="state-label">Category</InputLabel>
          <Select
            labelId="state-label"
            value={selectedState}
            onChange={handleStateChange}
          >
            {states.map((state, index) => (
              <MenuItem key={index} value={state}>{state}</MenuItem>
            ))}
          </Select>
        </FormControl>
    
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id="city-label">Sub-Category</InputLabel>
          <Select
            labelId="city-label"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
    
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id="level2-label">Type</InputLabel>
          <Select
            labelId="level2-label"
            value={selectedLevel2}
            onChange={handleLevel2Change}
          >
            {level2s.map((level2, index) => (
              <MenuItem key={index} value={level2}>{level2}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id="level3-label">Unit</InputLabel>
          <Select
            labelId="level3-label"
            value={selectedLevel3}
            onChange={handleLevel3Change}
          >
            {level3s.map((level3, index) => (
              <MenuItem key={index} value={level3}>{level3}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <TextField
          label="Level 5"
          value={selectedLevel4}
          readOnly
          sx={{ width: '250px'}}
        />
  
        <TextField
          type='number'
          placeholder='Inserta número'
          value={inputNumber}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleAddEmissions}>
          Upload emission
        </Button>
        <Button variant="contained" onClick={handleHideAddSupplier}>
          Cancel
        </Button>
      </Stack>
     )}
      <Table sx={{marginTop: 4}}>
        <TableHead>
          <TableRow>
            <TableCell>Scope</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub-Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Emission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emissions.map((emission) => (
            <TableRow key={emission.id}>
              <TableCell>{emission.scope}</TableCell>
              <TableCell>{emission.category}</TableCell>
              <TableCell>{emission.subcategory}</TableCell>
              <TableCell>{emission.type}</TableCell>
              <TableCell>{emission.unit}</TableCell>
              <TableCell>{emission.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
