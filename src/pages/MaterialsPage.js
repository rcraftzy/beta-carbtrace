// @mui
import {
  Stack,
  Button,
  Box,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Popover,
  Container,
  IconButton,
  Table,
  Typography,
  TableHead,
  TextField,
} from '@mui/material';
// components
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useFuels from '../_mock/FactorData';
import Iconify from '../components/iconify';

export default function MaterialsPage() {
  const {fuels, setFuels} = useFuels();
  const [showAddSupplier, setShowAddSupplier] =useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [factor, setFactor] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const handleParentIdChange = (event) => {
    setSelectedParentId(event.target.value);
  };

//  const handleShowAddSupplier = () => {
//    setShowAddSupplier(true);
//  }
  const handleHideAddSupplier = () => {
    setShowAddSupplier(false);
  }

  const handleCountryChange = (event) => {
    setSelectedType(event.target.value);
    setFactor('');
  };

  function renderTypeOptions() {
    return Object.keys(fuels.materials.types).map((type) => (
      <MenuItem key={type} value={type}>
        {fuels.materials.types[type].label}
      </MenuItem>
    ));
  }

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const selectedFactor = fuels.materials.types[selectedType]?.tonnesFactor;

  const handleAddChild = async (e) => {
    e.preventDefault();
  
    try {
      const token = getToken();
      const factorToSend = selectedFactor;
      const response = await axios.post(
        '/add-child',
        {
          name,
          email,
          factor: factorToSend,
          parent_id: selectedParentId,
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

  const fetchSuppliers = useCallback(async () => {
    try {
      const token = getToken();
      const response = await axios.get('/my-supplier', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

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
 
  return (
  <>
<Container>
  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
    <Typography variant="h4" gutterBottom >
      Materials
    </Typography>
    {/*
    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShowAddSupplier}>
      New Supplier
    </Button>
  */}
  </Stack>

  {showAddSupplier && (
    <form onSubmit={handleAddChild} style={{ position: 'fixed', top: 0, right: 0, width: 400, height: '100%', backgroundColor: 'white',
    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.2)' }}>
  <Box sx={{display: 'flex', width: '22vw', height: '84vh', flexDirection: 'column'}}>
      <Typography variant='h4' gutterBottom paddingLeftl='10' color='primary'>Add a new Material</Typography>
      <Typography variant='subtitle2' gutterBottom color='#000000'>Add your materials that you buy so you can start uploading your carbon footprint information</Typography>
      <TextField
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography variant='subtitle2' gutterBottom color='#000000'>
        Add your supplier's email so we can send them an email automatically so he can start sharing their product carbon footprint information with you
      </Typography>
      <TextField
        type="text"
        placeholder="Suppliers Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Typography variant='subtitle2' gutterBottom color='#000000'>Select the product you make with this material</Typography>
      <TextField select sx={{ width: 400 }} value={selectedParentId} onChange={handleParentIdChange}>
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
      <Typography variant='subtitle2' gutterBottom color='#000000'>Select the category of the material</Typography>
      <TextField
        select
        label="Select type"
        value={selectedType}
        onChange={handleCountryChange}
        sx={{ width: 400 }}
        SelectProps={{ MenuProps: { style: { zIndex: 99999 } } }}
      >
          {renderTypeOptions()}
      </TextField>
      <Typography variant="subtitle1">
        {`Tonnes factor for ${fuels.materials.types[selectedType]?.label}: ${selectedFactor}`}
      </Typography>
      <Button variant='contained' type="submit">Add Material</Button>
      <Button variant="contained" onClick={handleHideAddSupplier}>
        Cancel
      </Button>
  </Box>   
  </form>
  )}
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Factor</TableCell>
            <TableCell>Supplier Email</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.factor}</TableCell>
              <TableCell>{supplier.email}</TableCell>
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
