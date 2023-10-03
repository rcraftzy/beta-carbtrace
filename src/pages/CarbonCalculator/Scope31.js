import React from 'react';
import { Divider, Typography, Stack} from '@mui/material';

export default function Scope31() {

  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
                Scope 3 emissions
            </Typography>
          </Stack>  
          <Divider/>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
            Step 2: Allocating Emissions
          </Typography>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
            Asign the scope 1 and scope 2 emissions allocation for the item Pencils. You can do it in
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
            For the item Pencil, list the material that you bought to produce it.
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
            List of materials and use the supplier specific method
          </Typography> 
    </> 
  );
}