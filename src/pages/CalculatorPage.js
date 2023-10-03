import { Box, Divider, Button, Grid, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Calculator
import Scope1 from './CarbonCalculator/Scope1';
import Scope2 from './CarbonCalculator/Scope2';
import Scope3 from './CarbonCalculator/Scope3';
import Scope31 from './CarbonCalculator/Scope31';
import Infor from './CarbonCalculator/Infor';
import InforKnow from './CarbonCalculator/InforKnow';
import Welcome from './CarbonCalculator/Welcome';
import Request from './CarbonCalculator/Request';
import WasteDisposal from './csv/WasteDisposal';
import Prueba from './PruebaPage';
// ----------------------------------------------------------------------
export default function CalculatorPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState('no');
  const [logValue, setLogValue] = useState('no');
  const [scope1, setScope1] = useState('');
  const [scope2, setScope2] = useState(''); 
  const [waste, setWaste] = useState('');
  const [scope1Value, setScope1Value] = useState(0);
  const [scope2Value, setScope2Value] = useState(0);
  const [totalscope1, setTotalScope1] = useState(0);
  const [totalscope2, setTotalScope2] = useState(0);
  const [totalMaterialEmission, setTotalMaterialEmission] = useState(0);
  const [quantityResultsFromChild, setQuantityResultsFromChild] = useState([]);
  const [steps, setSteps] = useState([
    { id: 1, label: 'Select fuel types' },
    { id: 2, label: 'Enter fuel amounts' },
    { id: 3, label: 'Select transportation modes' },
    { id: 4, label: 'Enter transportation distances' },
    { id: 5, label: 'Review and submit' },
    { id: 6, label: 'Step 6' },
    { id: 7, label: 'Step 7' },
    { id: 8, label: 'Step 8' },
  ]);

  const currentURL = window.location.href;
  const searchParams = new URLSearchParams(new URL(currentURL).search);
  const product = searchParams.get("child_id");

  const handleInforSelection = (results) => {
    setSelectedValue(results);
  };
  const handleLogSelection = (results) => {
    setLogValue(results);
  };
  const handleScope1ResultChange = (results) => {
    setScope1Value(results);
  };
  const handleScope2ResultChange = (results) => {
    setScope2Value(results);
  };

  const [distanceResultsFromChild, setDistanceResultsFromChild] = useState([]);
  const handleDistanceResults = (results) => {
    setDistanceResultsFromChild(results);
  };
  const [materialResultsFromChild, setMaterialResultsFromChild] = useState([]);
  const handleMaterialResults = (results) => {
    setMaterialResultsFromChild(results);
  };
  const [dataFromChild, setDataFromChild] = useState([]);
  const handleDataResults = (data) => {
    setDataFromChild(data);
  };
  const handleQuantityResults = (results) => {
    setQuantityResultsFromChild(results);
  };
  const handleWasteResult = (results) => {
    setWaste(results);
  };

  const totalscope = () => {
    const totalScopeValue =
      parseInt(totalscope1, 10) +
      parseInt(totalscope2, 10) +
      parseInt(waste, 10);
    const materialResultsTotal = materialResultsFromChild.reduce(
      (acc, value) => acc + parseFloat(value), 0
    );
    const distanceResultsTotal = distanceResultsFromChild.reduce(
      (acc, value) => acc + parseFloat(value), 0
    );
    const totalMaterialEmission = totalScopeValue + materialResultsTotal + distanceResultsTotal;
    setTotalMaterialEmission(totalMaterialEmission);
  };
  
  useEffect(() => {
    totalscope(); // Call the totalscope function whenever any of the relevant values change
  }, [waste, totalscope1, totalscope2, materialResultsFromChild, distanceResultsFromChild]);

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const handleUpdateFactor = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken();

      const materialData = [];
      // Iterate through dataFromChild and extract materialNames and emails
      dataFromChild.forEach((item) => {
        const { materialName, email } = item;
        materialData.push({ materialName, email }); 
      });

      const response = await axios.put(
        '/update_calculator_factor',
        {
          product,
          materialData,
          distanceResults: distanceResultsFromChild,
          materialResults: materialResultsFromChild,
          quantityResults: quantityResultsFromChild,
          totalMaterialEmission,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
    return (
      <>
        <div style={{ width: '100%', minHeight: '100vh',backgroundColor: '#f3f3fe',display:'flex', justifyContent: 'center' }}>    
          <Box sx={{ width: 900, height: '100%', boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.1)',backgroundColor: 'white',paddingLeft: 6, paddingRight: 6,marginTop: 9,marginBottom: 9 }}>
            {currentStep === 1 && (
              <Welcome onSelectionChange={handleLogSelection}/>
            )}
            {currentStep === 2 && (
              <Request />
            )}
            {currentStep === 3 && (
              <Infor onSelectionChange={handleInforSelection} />
            )}
            {currentStep === 4 && (
              <InforKnow />
            )}
            {currentStep === 5 && (
              <Scope1 onScope1ResultChange={handleScope1ResultChange}/>
            )}
            {currentStep === 6 && (
              <Scope2 onScope2ResultChange={handleScope2ResultChange}/>
            )}
            {currentStep === 7 && (
              <>
              <Scope3 />
              <Grid container>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What percentage of your Scope 1 is allocated to this product?</Typography>
                <TextField
                  type="text"
                  placeholder="0 %"
                  value={scope1}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const totalScope1Value = (parseInt(scope1Value, 10) * parseInt(inputValue, 10)) / 100;
                    setScope1(totalScope1Value);
                    setTotalScope1(totalScope1Value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What percentage of your Scope 2 is allocated to this product?</Typography>
                <TextField
                  type="text"
                  placeholder="0 %"
                  value={scope2}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const totalScope2Value = (parseInt(scope2Value, 10) * parseInt(inputValue, 10)) / 100;
                    setScope2(totalScope2Value);
                    setTotalScope2(totalScope2Value);
                  }}
                />
              </Grid>
            </Grid>
              </>
            )}
            {currentStep === 8 && (
              <>
                <Scope31 />
                <Prueba 
                  onDistanceResultsChange={handleDistanceResults}
                  onMaterialResultsChange={handleMaterialResults}
                  onDataResultsChange={handleDataResults}
                  onQuantityResultsChange={handleQuantityResults}
                />
               <WasteDisposal onWasteResultChange={handleWasteResult}/>
              </>
            )}

          <Divider />

              <Grid item xs={12} sx={{ height: 100, width: '100%', display:'flex'}}>
                <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'left', alignItems: 'center'}}>
                {currentStep > 1 && (
                  <Button sx={{ width: 200, height: 40, backgroundColor: 'gray', '&:hover': { backgroundColor: '#6d6c6c' } }} variant="contained" 
                  onClick={() => {
                    if (currentStep === 5) {
                      setCurrentStep(3); // Si el currentStep es 5, seleccionar el currentStep 3
                    } else {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  >
                    Back
                  </Button>
                )}
                </Grid>
                <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'right', alignItems: 'center'}}>
                {currentStep < steps.length && currentStep !== 8 && (
                  <Button sx={{ width: 200, height: 40,backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} variant="contained"  
                  onClick={() => {
                    if (currentStep === 3 && selectedValue === 'no') {
                      setCurrentStep(5);
                    } else if (currentStep === 1 && logValue === 'no') {
                      navigate('/login'); // Redireccionar a /login
                    } else if (currentStep === 4) {
                      setCurrentStep(7);
                    } else {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === 8 && (
                  <Button
                    sx={{ width: 200, height: 40, backgroundColor: '#18bd5b', '&:hover': { backgroundColor: '#16aa52' } }}
                    variant="contained"
                    type='submit'
                    onClick={handleUpdateFactor}
                  >
                    Submit
                  </Button>
                )}
                </Grid>
            </Grid>
          </Box>
        </div>
      </>
    );
  }
