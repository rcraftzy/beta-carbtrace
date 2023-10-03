import React, { useState, useCallback } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import TransportDistance from './csv/TransportDistance';
import MaterialUse from './csv/MaterialUse';
import MaterialName from './csv/MaterialName';

export default function Prueba({ onDistanceResultsChange, onMaterialResultsChange, onQuantityResultsChange, onDataResultsChange }) {
  const [duplicates, setDuplicates] = useState([1]);
  const [distanceResults, setDistanceResults] = useState([]);
  const [materialResults, setMaterialResults] = useState([]);
  const [quantityResults, setQuantityResults] = useState([]);
  const [data, setData] = useState([{ materialName: '', email: '' }]);

  const handleAddDuplicate = () => {
    setDuplicates((prevDuplicates) => [...prevDuplicates, prevDuplicates.length + 1]);
    setDistanceResults((prevResults) => [...prevResults, '']);
    setQuantityResults((prevResults) => [...prevResults, '']);
    setMaterialResults((prevResults) => [...prevResults, '']);
    setData((prevData) => [...prevData, { materialName: '', email: '' }]); // Agregar un valor vacío al array
  };

  const handleRemoveDuplicate = () => {
    setDuplicates((prevDuplicates) => prevDuplicates.slice(0, prevDuplicates.length - 1));
    setDistanceResults((prevResults) => prevResults.slice(0, prevResults.length - 1));
    setQuantityResults((prevResults) => prevResults.slice(0, prevResults.length - 1));
    setMaterialResults((prevResults) => prevResults.slice(0, prevResults.length - 1));
    setData((prevData) => prevData.slice(0, prevData.length - 1)); // Eliminar el último valor del array
  };

  const handleDistanceChange = useCallback((index, result) => {
    setDistanceResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el valor en el índice correspondiente
      return newResults;
    });
    onDistanceResultsChange(distanceResults); // Llamar a la función del componente padre y pasarle distanceResults
  }, [distanceResults, onDistanceResultsChange]);

  const handleMaterialChange = useCallback((index, result) => {
    setMaterialResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el valor en el índice correspondiente
      return newResults;
    });
    onMaterialResultsChange(materialResults);
  }, [materialResults, onMaterialResultsChange]);

  const handleQuantityChange = useCallback((index, result) => {
    setQuantityResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result; // Actualizar el valor en el índice correspondiente
      return newResults;
    });
    onQuantityResultsChange(quantityResults)
  }, [quantityResults, onQuantityResultsChange]);

  const handleNamesChange = (index, materialData) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = materialData;
      onDataResultsChange(newData);
      return newData;
    });
  };

  return (
    <>
      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
          List of materials and use the supplier specific method
      </Typography>
      <Grid container sx={{ backgroundColor: '#e5eaf4', height: 50 }}>
        <Grid item xs={3} sx={{ display: 'flex', height: '100%'}}>
         <Grid container >
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Purchased good
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Supplier email
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', height: '100%'}}>
          <Grid container>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Emission factor associated
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Mass (kg)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', height: '100%'}}>
          <Grid container>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Vehicle emission factor associated
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Address of origin
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
              <Typography variant='subtitle2' color='#2c3345'>
                Address of destiny
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {duplicates.map((duplicate, index) => (
        <Grid container>
          <Grid item xs={3}>
            <MaterialName
            key={`materialName-${index}`}
            materialData={data[index]}
            onMaterialChange={(materialData) => handleNamesChange(index, materialData)}
          />
          </Grid>
          <Grid item xs={3}>
            <MaterialUse
              key={`materialUse-${index}`}
              onResultChange={(result) => handleMaterialChange(index, result)}
              onQuantityChange={(result) => handleQuantityChange(index, result)}
            />
          </Grid>
          <Grid item xs={6}>  
            <TransportDistance
              key={`transportDistance-${index}`}
              onResultChange={(result) => handleDistanceChange(index, result)}
            />
          </Grid>
        </Grid>
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