// @mui
import {
  Stack,
  Button,
  TableRow,
  Divider,
  MenuItem,
  Popover,
  TableBody,
  TableCell,
  Container,
  Table,
  IconButton,
  Typography,
  TableHead,
  TextField,
  Box,
  Grid,
} from '@mui/material';
// components
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Iconify from '../components/iconify';
import WasteDisposal from './csv/WasteDisposal';
import Prueba from './PruebaPage';

export default function Product() {
  const [showAddSupplier, setShowAddSupplier] =useState(false);
  const [totalEmissionsScope1, setTotalEmissionsScope1] = useState(0);
  const [totalEmissionsScope2, setTotalEmissionsScope2] = useState(0);
  const [calculatedWaste, setCalculatedWaste] = useState('');

  const [name, setName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [waste, setWaste] = useState('');
  const [scope1, setScope1] = useState('');
  const [scope2, setScope2] = useState(''); 

  const [products, setProducts] = useState([]);
  const [scope1Emission, setScope1Emission] = useState('');
  const [scope2Emission, setScope2Emission] = useState('');
  const [dataFromChild, setDataFromChild] = useState([]);
  const [distanceResultsFromChild, setDistanceResultsFromChild] = useState([]);
  const [materialResultsFromChild, setMaterialResultsFromChild] = useState([]);
  const [quantityResultsFromChild, setQuantityResultsFromChild] = useState([]);

  const handleShowAddSupplier = () => {
    setShowAddSupplier(true);
  }
  const handleHideAddSupplier = () => {
    setShowAddSupplier(false);
  }
  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const fetchUserData = useCallback(async () => {
    try {
      const token = getToken();

      const response = await axios.get('/get-emissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalEmissionsScope1(response.data.total_emissions_scope1);
      setTotalEmissionsScope2(response.data.total_emissions_scope2);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken();
      const response = await axios.get('/my-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const totalscope = () => {
    // Convert the state values to numbers using parseInt with radix parameter
    const totalScopeValue =
      parseInt(calculatedWaste, 10) +
      parseInt(scope1Emission, 10) +
      parseInt(scope2Emission, 10);
  };

  useEffect(() => {
    totalscope(); // Call the totalscope function whenever any of the relevant values change
  }, [calculatedWaste, scope1Emission, scope2Emission]);

  // Esta función recibe el estado 'data' desde el componente Prueba
  const handleDataResults = (data) => {
    setDataFromChild(data);
  };
  const handleDistanceResults = (results) => {
    setDistanceResultsFromChild(results);
  };
  const handleMaterialResults = (results) => {
    setMaterialResultsFromChild(results);
  };
  const handleQuantityResults = (results) => {
    setQuantityResultsFromChild(results);
  };
  const handleWasteResult = (results) => {
    setWaste(results);
  };

  const handleAddNames = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const materialData = [];
      // Iterate through dataFromChild and extract materialNames and emails
      dataFromChild.forEach((item) => {
        const { materialName, email } = item;
        materialData.push({ materialName, email }); // Note: Use 'materialName' instead of 'materialNames'
      });
      // Send the materialData array to the backend
      const response = await axios.post(
        '/newmaterial',
        {
          name,
          productQuantity,
          waste,
          scope1Emission,
          scope2Emission,
          materialData,
          distanceResults: distanceResultsFromChild,
          materialResults: materialResultsFromChild,
          quantityResults: quantityResultsFromChild,
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
<Container>
  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
    <Typography variant="h4" gutterBottom>
      Products
    </Typography>
    <Button variant="contained" sx={{ width: 200, height: 40,backgroundColor: '#a339e8', '&:hover': { backgroundColor: '#7f40a7' } }} startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShowAddSupplier}>
      New Product
    </Button>
  </Stack>

  {showAddSupplier && (
    <form onSubmit={handleAddNames} style={{ position: 'fixed', top: 0, right: 0, width: 1255, paddingLeft: 5, height: '100%', backgroundColor: 'white',
     zIndex: 1000, display: 'flex', justifyContent: 'center', boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.2),', overflowY: 'auto'}}>
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
        List the product and its quantity and how many emissions and materials are related to it
      </Typography>
      <Grid container>
        <Grid item xs={6}>
        <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>What is the name of your product?</Typography>
            <TextField
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </Grid>
        <Grid item xs={6}>
        <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 500}}>How much quantity manufacturer?(Kg)</Typography>
            <TextField
              type="text"
              placeholder="0.0 Kg"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
        </Grid>
      </Grid>   

      <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '16px', fontWeight: 700}}>
        What are your scope 1 and 2 emissions related to this product?
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
              setScope1(inputValue); // Actualiza el estado del valor ingresado
              setScope1Emission(scope1Emission); // Actualiza el estado del resultado calculado
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
              setScope2(inputValue); // Actualiza el estado del valor ingresado
              setScope2Emission(scope2Emission); // Actualiza el estado del resultado calculado
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
            Add Product
          </Button>
        </Grid>
      </Grid>
</Box>
    </form>
  )}

    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>quantity</TableCell>
            <TableCell>Emissions</TableCell>
            <TableCell>Factor Emission</TableCell>
            <TableCell>Edit</TableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.emission}</TableCell>
              <TableCell>{product.factor}</TableCell>
              <TableCell>
                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
              </TableCell>  
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </div>
  </Container>  
  </>
  );
}
