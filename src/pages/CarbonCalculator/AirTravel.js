import { Grid, Typography, TextField } from '@mui/material';
// components
import React from 'react';

export default function AirTravel() {


  return (
          <>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of short haul flights (30 minutes to 3 hours) per month</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of medium haul flights (between 3-6 hours) per month</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of long haul flights (more than 6 hours) per month</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of persons/employees travelled</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of persons/employees travelled</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Number of persons/employees travelled</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField defaultValue="0,0" type='number'/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
      </> 
  );
}