import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Box,
  Container,
  Divider,
  Typography,
  MenuItem,
  Grid,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
  TextField
} from '@mui/material';
import axios from 'axios';
import Prueba from './PruebaPage';
import WasteDisposal from './csv/WasteDisposal';

function FactorForm() {
  const [products, setProducts] = useState([]);
  const [factor, setFactor] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState('');
  const [requests, setRequests] = useState([]);
  const [showAddSupplier, setShowAddSupplier] =useState(false);
  const [showAddResult, setShowAddResult] =useState(false);
  const [selectedFactor, setSelectedFactor] = useState('');

  const [totalEmissionsScope1, setTotalEmissionsScope1] = useState(0);
  const [totalEmissionsScope2, setTotalEmissionsScope2] = useState(0);
  const [scope1, setScope1] = useState('');
  const [scope2, setScope2] = useState(''); 
  const [scope1Emission, setScope1Emission] = useState('');
  const [scope2Emission, setScope2Emission] = useState('');
  const [waste, setWaste] = useState('');
  const [dataFromChild, setDataFromChild] = useState([]);
  const [distanceResultsFromChild, setDistanceResultsFromChild] = useState([]);
  const [materialResultsFromChild, setMaterialResultsFromChild] = useState([]);
  const [quantityResultsFromChild, setQuantityResultsFromChild] = useState([]);
  const [totalMaterialEmission, setTotalMaterialEmission] = useState(0);

  const handleShowAddSupplier = (productId, quantity) => {
    setShowAddSupplier(true);
    setProduct(productId);
    setQuantity(quantity);
  };

  const handleHideAddSupplier = () => {
    setShowAddSupplier(false);
  }
  const handleShowAddResult = (productId, quantity) => {
    setShowAddResult(true);
    setProduct(productId);
    setQuantity(quantity);
  };

  const handleHideAddResult = () => {
    setShowAddResult(false);
  }

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const fetchUserData = useCallback(async () => {
    try {
      const token = getToken();

      const response = await axios.get('http://localhost:5000/api/get-emissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalEmissionsScope1(response.data.total_emissions_scope1);
      setTotalEmissionsScope2(response.data.total_emissions_scope2);
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken(); // Obtiene el token JWT almacenado (puedes implementar la función getToken según tus necesidades)
      
      const response = await axios.get('http://localhost:5000/api/my-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const selectedProductData = products.find(
      (product) => product.name === selectedParentId
    );

    if (selectedProductData) {
      setFactor(selectedProductData.factor);
    } else {
      setFactor('');
    }
  }, [selectedParentId, products]);

  const handleParentIdChange = (event) => {
    setSelectedParentId(event.target.value);
    const selectedProduct = products.find((product) => product.name === event.target.value);
    setSelectedFactor(selectedProduct ? selectedProduct.factor : '');
  };
  useEffect(() => {
    const selectedProductData = products.find(
      (product) => product.name === selectedParentId
    );
  
    if (selectedProductData) {
      setFactor(selectedProductData.factor);
    } else {
      setFactor('');
    }
  }, [selectedParentId, products]);

  const fetchRequests = useCallback(async () => {
    try {
      const token = getToken();

      const response = await axios.get('http://localhost:5000/api/request', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data.requests);
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDataResults = (data) => {
    setDataFromChild(data);
  };
  const handleQuantityResults = (results) => {
    setQuantityResultsFromChild(results);
  };
  const handleDistanceResults = (results) => {
    setDistanceResultsFromChild(results);
  };
  const handleMaterialResults = (results) => {
    setMaterialResultsFromChild(results);
  };
  const handleWasteResult = (results) => {
    setWaste(results);
  };

  const totalscope = () => {
    const totalScopeValue =
      parseInt(scope1Emission, 10) +
      parseInt(waste, 10) +
      parseInt(scope2Emission, 10);
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
    totalscope();
  }, [waste, scope1Emission, scope2Emission, materialResultsFromChild, distanceResultsFromChild]);

  const handleUpdateFactor = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken(); // Obtiene el token JWT almacenado (puedes implementar la función getToken según tus necesidades)

      const materialData = [];
      // Iterate through dataFromChild and extract materialNames and emails
      dataFromChild.forEach((item) => {
        const { materialName, email } = item;
        materialData.push({ materialName, email }); // Note: Use 'materialName' instead of 'materialNames'
      });

      const response = await axios.put(
        'http://localhost:5000/api/update_factor',
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
      console.log(response.data.product);
      console.log(response.data.factor);
      // Resto del código...
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  };
  useEffect(() => {
    if (!Number.isNaN(parseFloat(selectedFactor))) {
      const factorQuantity = parseFloat(selectedFactor) * parseFloat(quantity);
      setResult(factorQuantity);
    }
  }, [selectedFactor, quantity]);

  const handleUpdateResult = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken();
      const response = await axios.put(
        'http://localhost:5000/api/update_result',
        {
          product,
          result,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div>
        {showAddSupplier && (
          <form onSubmit={handleUpdateFactor} style={{ position: 'fixed', top: 0, right: 0, width: 1255, paddingLeft: 5, height: '100%', backgroundColor: 'white',
          zIndex: 1000, display: 'flex', justifyContent: 'center', boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.2),', overflowY: 'auto'}}>
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
        Provide data on CO2 emissions from the sale of <strong>{quantity}</strong> units of <strong>{product}</strong>
        </Typography> 
      <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
        What are your scope 1 and 2 emissions?
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What percentage of your Scope 1 is allocated to this product?</Typography>
          <TextField
            type="text"
            placeholder="0 %"
            value={scope1}
            onChange={(e) => {
              const inputValue = e.target.value;
              const scope1Emission = (parseFloat(inputValue) * totalEmissionsScope1) / 100;
              setScope1(inputValue);
              setScope1Emission(scope1Emission); 
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
              const scope2Emission = (parseFloat(inputValue) * totalEmissionsScope2) / 100;
              setScope2(inputValue);
              setScope2Emission(scope2Emission); 
            }}
          />
        </Grid>
      </Grid>
              <Prueba 
                onDistanceResultsChange={handleDistanceResults}
                onMaterialResultsChange={handleMaterialResults}
                onDataResultsChange={handleDataResults}
                onQuantityResultsChange={handleQuantityResults}
              />      
              <WasteDisposal onWasteResultChange={handleWasteResult} /> 

              <Divider />

          <Grid item xs={12} sx={{ height: 100, width: '100%', display:'flex'}}>
          <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'left', alignItems: 'center'}}>
              <Button variant="contained"  sx={{ width: 200, height: 40, backgroundColor: 'gray', '&:hover': { backgroundColor: '#6d6c6c' } }} onClick={handleHideAddSupplier}>
                Cancel
              </Button>
            </Grid>
            <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'right', alignItems: 'center'}}>
              <Button sx={{ width: 200, height: 40,backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} variant="contained" type="submit">
                Share information
              </Button>
            </Grid>
          </Grid>

    </Box>   
          </form>
        )}   
        {showAddResult && (
          <form onSubmit={handleUpdateResult} style={{ position: 'fixed', top: 0, right: 0, width: 1255, paddingLeft: 5, height: '100%', backgroundColor: 'white',
          zIndex: 1000, display: 'flex', justifyContent: 'center', boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.2),', overflowY: 'auto'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
              Provide data on CO2 emissions from the sale of <strong>{quantity}</strong> units of <strong>{product}</strong>
            </Typography> 
            <Typography>If you have already saved the factor of your <strong>{product}</strong> select it</Typography> 
              <TextField select sx={{ width: 400 }} value={selectedParentId} onChange={handleParentIdChange}>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.name}>
                    {product.name}-"{product.factor}"
                  </MenuItem>
                ))}
              </TextField>
            <Divider />
            <Grid item xs={12} sx={{ height: 100, width: '100%', display:'flex'}}>
                <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'left', alignItems: 'center'}}>
                    <Button variant="contained"  sx={{ width: 200, height: 40, backgroundColor: 'gray', '&:hover': { backgroundColor: '#6d6c6c' } }} onClick={handleHideAddResult}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs={6} sx={{ width: '100%', display:'flex', justifyContent: 'right', alignItems: 'center'}}>
                    <Button sx={{ width: 200, height: 40,backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} variant="contained" type="submit">
                      Share information
                    </Button>
                  </Grid>
                </Grid>
            </Box>   
          </form>
        )}   

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Select Factor</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.provider_email}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>
                  <Button variant='contained' 
                  sx={{  backgroundColor: request.status === 'Pending Request' ? 'rgb(242 58 60 / 94%)' : request.status === 'Shared' ? '#18bd5b' : 'initial' }}
                  onClick={() => handleShowAddSupplier(request.name, request.quantity)}
                  >
                   {request.status}
                  </Button>
                </TableCell>   
                <TableCell>
                  <Button variant='contained' 
                  sx={{  backgroundColor: request.status === 'Pending Request' ? 'rgb(242 58 60 / 94%)' : request.status === 'Shared' ? '#18bd5b' : 'initial' }}
                  onClick={() => handleShowAddResult(request.name, request.quantity)}
                  >
                   {request.status}
                  </Button>
                </TableCell>          
              </TableRow>
            ))}
          </TableBody>
        </Table>     

      </div>


      
    </Container>
  );
}

export default FactorForm;
