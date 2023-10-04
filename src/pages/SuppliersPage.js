// @mui
import {
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Popover,
  IconButton,
  MenuItem,
  Table,
  Typography,
  TableHead,
} from '@mui/material';
// components
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Iconify from '../components/iconify';

export default function Product() {
  const [suppliers, setSuppliers] = useState([]);

  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };


  const fetchSuppliers = useCallback(async () => {
    try {
      const token = getToken();
      const response = await axios.get('/api/my-supplier', {
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
    <Typography variant="h4" gutterBottom>
      Suppliers
    </Typography>
    {/*
    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
      New Supplier
    </Button>
  */}
  </Stack>

    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Suppliers</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.name}</TableCell>
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
