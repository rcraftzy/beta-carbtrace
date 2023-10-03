import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import TransportDistance from './TransportDistance';
import MaterialUse from './MaterialUse';
import MaterialName from './MaterialName';

export default function Prueba() {
  const [duplicates, setDuplicates] = useState([1]);
  const [distanceResults, setDistanceResults] = useState([]);
  const [materialResults, setMaterialResults] = useState([]);
  const [data, setData] = useState([{ materialName: '', mass: '', email: '' }]);

  const handleAddDuplicate = () => {
    setDuplicates((prevDuplicates) => [...prevDuplicates, prevDuplicates.length + 1]);
    setDistanceResults((prevResults) => [...prevResults, '']);
    setMaterialResults((prevResults) => [...prevResults, '']);
    setData((prevData) => [...prevData, { materialName: '', mass: '', email: '' }]); // Agregar un valor vacío al array
  };

  const handleRemoveDuplicate = () => {
    setDuplicates((prevDuplicates) => prevDuplicates.slice(0, prevDuplicates.length - 1));
    setDistanceResults((prevResults) => prevResults.slice(0, prevResults.length - 1));
    setMaterialResults((prevResults) => prevResults.slice(0, prevResults.length - 1));
    setData((prevData) => prevData.slice(0, prevData.length - 1)); // Eliminar el último valor del array
  };

  const handleDistanceChange = useCallback((index, result) => {
    setDistanceResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el valor en el índice correspondiente
      return newResults;
    });
  }, []);

  const handleMaterialChange = useCallback((index, result) => {
    setMaterialResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el valor en el índice correspondiente
      return newResults;
    });
  }, []);

  const handleNamesChange = (index, materialData) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = materialData;
      return newData;
    });
  };

  useEffect(() => {
    console.log('Received data:');
    data.forEach((item, index) => {
      const { materialName, mass, email } = item;
      console.log(`Material Name: ${materialName}, Mass: ${mass}, Email: ${email}`);
    });
  }, [data]);

  return (
    <>
      {duplicates.map((duplicate, index) => (
        <>
          <MaterialName
            key={`materialName-${index}`}
            materialData={data[index]}
            onMaterialChange={(materialData) => handleNamesChange(index, materialData)}
          />
          <MaterialUse
            key={`materialUse-${index}`}
            onResultChange={(result) => handleMaterialChange(index, result)}
          />
          <TransportDistance
            key={`transportDistance-${index}`}
            onResultChange={(result) => handleDistanceChange(index, result)}
          />
        </>
      ))}

      <div>
        <Button variant='contained' sx={{ width: 200, height: 40, backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} onClick={handleAddDuplicate}>Add</Button>
        <Button variant='contained' sx={{ width: 200, height: 40, backgroundColor: 'gray', '&:hover': { backgroundColor: '#6d6c6c' } }} onClick={handleRemoveDuplicate} disabled={duplicates.length === 1}>Remove</Button>
      </div>

    </>
  );
}

/*

      <div>
        {distanceResults.map((result, index) => (
          <div key={index}>
            Distanci resultado {index + 1}: {result}
          </div>
        ))}
      </div>
      <div>
        {materialResults.map((result, index) => (
          <div key={index}>
            Maeterial Resultado {index + 1}: {result}
          </div>
        ))}
      </div>
      */