import React  from 'react';
import { Box, Grid, Divider, Typography, FormControlLabel, Radio, RadioGroup, Stack} from '@mui/material';

export default function Scope3() {
  return (
    <>
          <Stack alignItems="right" mb={4} mt={4}>
            <Typography sx={{ color: '#2c3345', fontSize: '2em', fontWeight: 900 }}>
                Scope 3 emissions
            </Typography>
          </Stack>  
          <Divider/>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
            Scope 3 emissions refer to all other indirect greenhouse gas emissions associated with an organization's activities that occur outside of their direct control or ownership. These emissions encompass the entire lifecycle of a company's products or services, including all activities from the extraction of raw materials to the disposal of products.
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', fontSize: '1.5em', fontWeight: 700 }}>
            Step 1: Allocating Emissions
          </Typography>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
          First, you need to identidify scope 1 and scope 2 emissions associated to the production of the the item Pencils.
          </Typography> 
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '1.1em', fontWeight: 600}}>
          To choose the better approach answer the following questions: <strong style={{ color: 'red'}}>*</strong>
          </Typography> 
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                  Can GHG data be provided for the specific product purchased?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                Can the energy use or other activity data used to produce each output be separately sub-metered?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                Can engineering models be used to separately estimate the energy use or other activity data used to produce each output?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                Do physical factors best reflect the causal relationship between production of the outputs and the resulting emissions?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
        <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '1.1em', fontWeight: 600}}>
          Now, answer the following questions: <strong style={{ color: 'red'}}>*</strong>
        </Typography>    
        <Box>
        <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                Do physical factors best reflect the causal relationship between production of the outputs and the resulting emissions?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '.9375em'}}>
                Are data available on the physical quantities of outputs produced?
                </Typography> 
                </Grid>
                <Grid item xs={6} >
                  <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="si" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </Grid>
              </Grid>
          <Typography gutterBottom mt={4} sx={{ color: '#2c3345', lineHeight: 1.6, fontSize: '1.1em', fontWeight: 600}}>
          Assign emissions base on physical allocation: <strong style={{ color: 'red'}}>*</strong>
          </Typography> 
        </Box>
    </> 
  );
}