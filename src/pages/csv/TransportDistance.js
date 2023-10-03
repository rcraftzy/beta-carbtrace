import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl,InputLabel,Select,MenuItem} from '@mui/material';

export default function TransportDistance({ onResultChange }) {
  const [stateIndex, setStateIndex] = useState(-1);
  const [selectedCity, setSelectedCity] = useState('');
  const [level4Index, setLevel4Index] = useState(-1);
  const [csvRows, setCsvRows] = useState([]);
  const [cityIndex, setCityIndex] = useState(-1);
  const [level2Index, setLevel2Index] = useState(-1);
  const [level3Index, setLevel3Index] = useState(-1);
  const [result, setResult] = useState('');

  const [distanceFactor, setDistanceFactor] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [origin, setOrigin] = useState('');

  const [levelsData, setLevelsData] = useState({}); 
  
  const [distanceResults, setDistanceResults] = useState([]);

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
    const filteredRows = csvRows.filter((row) => row.split(',')[stateIndex] === 'Freighting goods');
    const groupedLevelsData = filteredRows.reduce((acc, row) => {
      const level1 = row.split(',')[stateIndex];
      const level2 = row.split(',')[cityIndex];
      const level3 = row.split(',')[level2Index];
      const level4 = row.split(',')[level3Index];
      const level5 = row.split(',')[level4Index];
      if (!acc[level1]) {
        acc[level1] = [];
      }
      if (level2 !== 'Freighting goods' && /\d/.test(level5)) {
        acc[level1].push(`${level2}-${level3}-${level4}-${level5}`);
      }
      return acc;
    }, {});
    setLevelsData(groupedLevelsData);
  }, [csvRows, stateIndex, cityIndex, level2Index, level3Index, level4Index]);

  useEffect(() => {
    if (origin && destination) {
      calculateDistance();
    }
  }, [origin, destination]); 
  
  useEffect(() => {
    if (distance && distanceFactor) {
      const calculatedResult = (parseFloat(distance) * parseFloat(distanceFactor)).toFixed(2);
      setResult(calculatedResult);// Llama a la función de devolución de llamada con el resultado
    } else {
      setResult(''); // Llama a la función de devolución de llamada con un resultado vacío
    }
  }, [distance, distanceFactor]); 
    
  useEffect(() => {
    const calculatedResult = Number(distance) * Number(distanceFactor);
    if (!Number.isNaN(calculatedResult)) {
      setResult(calculatedResult.toFixed(2));
    } else {
      setResult('');
    }
  }, [distance, distanceFactor]);

  useEffect(() => {
    if (result !== '' && !distanceResults.includes(result)) {
      onResultChange(result);
    }
  }, [result, distanceResults, onResultChange]);

  useEffect(() => {
    return () => {
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
  setDistanceFactor(parseFloat(lastValue));
  onResultChange(parseFloat(distance) * parseFloat(lastValue)); 
};

const calculateDistance = () => {
  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(
    {
      origin,
      destination,
      travelMode: 'DRIVING',
    },
    (response, status) => {
      if (status === 'OK') {
        const distanceValue = response.routes[0].legs[0]?.distance.value;
        setDistance(distanceValue.toString());
        if (distanceValue && distanceFactor) {
          const calculatedResult = (parseFloat(distanceValue) * parseFloat(distanceFactor)).toFixed(2);
          setResult(calculatedResult);
          onResultChange(parseFloat(calculatedResult)); // Enviar el resultado calculado
        } else {
          setResult('');
          onResultChange(0); // Enviar resultado vacío o cero si no hay cálculo
        }
      }
    }
  );
};

useEffect(() => {
  // Cargar la API de Google Maps de manera asincrónica
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDa1nuV_uVoq9xWNUcppCWn0GTD5cacys4&libraries=places&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);

  // Limpia el script de la API cuando el componente se desmonte
  return () => {
    document.head.removeChild(script);
  };
}, []);
  return (
    <>
      <Grid container sx={{ display: 'flex', flexDirection: 'row'}}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
        <TextField
              type="text"
              sx={{ width: '100%' }}
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
        </Grid>
        <Grid item xs={4}>
        <TextField
              type="text"
              sx={{ width: '100%' }}
              placeholder="Destiny"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
        </Grid>
      </Grid>
    </>
  );
}

/*

      <TextField
    label="Level 5"
    value={distanceFactor}
    readOnly
    sx={{ width: '250px'}}
  />
  <TextField
        type="text"
        placeholder="Distancia de recorrido en carretera"
    value={distance}
    readOnly
  />
  <TextField
    label="Level 5"
    value={distanceFactor}
    onChange={handleDistanceChange}
    readOnly
    sx={{ width: '250px'}}
  />
  <TextField
        type="text"
        placeholder="Distancia de recorrido en carretera"
    value={distance}
    readOnly
  />

  const [selectedMaterialUse, setSelectedMaterialUse] = useState('');
  const [materialUseLevelsData, setMaterialUseLevelsData] = useState({}); 
  
  const handleMaterialUseChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMaterialUse(selectedValue);
  };
  
  // Nuevo efecto para filtrar los datos según "Material use"
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
    setMaterialUseLevelsData(groupedLevelsData);
  }, [csvRows, stateIndex, cityIndex, level2Index, level3Index, level4Index]);

  const [duplicates, setDuplicates] = useState([1]);

  // Función para duplicar el contenido del retorno y agregarlo al estado de duplicados
  const handleAddDuplicate = () => {
    setDuplicates((prevDuplicates) => [...prevDuplicates, prevDuplicates.length + 1]);
  };

  // Función para eliminar el último duplicado del estado de duplicados
  const handleRemoveDuplicate = () => {
    setDuplicates((prevDuplicates) => prevDuplicates.slice(0, prevDuplicates.length - 1));
  };

  */