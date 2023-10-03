import React, { useEffect, useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import axios from 'axios';
import {
// AppTasks,
//  AppNewsUpdate,
// AppOrderTimeline,
  AppCurrentVisits,
//  AppWebsiteVisits,
// AppTrafficBySite,
  AppWidgetSummary,
// AppCurrentSubject,
// AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [totalEmissionsScope1, setTotalEmissionsScope1] = useState(0);
  const [totalEmissionsScope2, setTotalEmissionsScope2] = useState(0);
  const [totalEmissionsScope3, setTotalEmissionsScope3] = useState(0);
  const [totalEmissions, setTotalEmissions] = useState(0);

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
      setTotalEmissionsScope3(response.data.total_emissions_scope3);
      setTotalEmissions(response.data.total_emissions);
    } catch (error) {
      console.error(error);
      // Manejo de errores...
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Overview Emissions
        </Typography>                

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total emissions" total={totalEmissions} icon="factory" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Scope 1" total={totalEmissionsScope1} icon="localGasStation" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Scope 2" total={totalEmissionsScope2} icon="electricBolt" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Scope 3" total={totalEmissionsScope3} icon="emojiTransportation" />
        </Grid>         

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Emissions group"
              chartData={[
                { label: 'Scope 2', value: parseInt(totalEmissionsScope2, 10) },
                { label: 'Scope 3', value: parseInt(totalEmissionsScope3, 10) },
                { label: 'Scope 1', value: parseInt(totalEmissionsScope1, 10) },
              ]}
              chartColors={[
                theme.palette.info.lighter,
                theme.palette.info.main,
                theme.palette.primary.main,
                theme.palette.error.light,
              ]}
            />
          </Grid>

{/* 

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Emissions"
              subheader="(-23%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Scope 1',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Scope 2',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Scope 3',
                  type: 'line',
                  fill: 'solid',
                  color: 'blue',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>   

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
 
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

         <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
             list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>

            */}



        </Grid>
      </Container>
    </>
  );
}
