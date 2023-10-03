// @mui
import { Container, Stack, Typography, Grid, IconButton } from '@mui/material';
// components
import { ReactComponent as Int1 } from '../assets/integrate/sap.svg';
import { ReactComponent as Int2 } from '../assets/integrate/salesforce.svg';
import { ReactComponent as Int3 } from '../assets/integrate/plana.svg';
import { ReactComponent as Int4 } from '../assets/integrate/excel.svg';
import { ReactComponent as Int5 } from '../assets/integrate/microsoft.svg';
import { ReactComponent as Int6 } from '../assets/integrate/ibm.svg';
import { ReactComponent as Int7 } from '../assets/integrate/greenly.svg';
import { ReactComponent as Int8 } from '../assets/integrate/emitwise.svg';

export default function IntegrationPage() {
  const integrations = [
    { logo: Int1, name: 'SAP' },
    { logo: Int2, name: 'Salesforce' },
    { logo: Int3, name: 'Plana' },
    { logo: Int4, name: 'Excel' },
    { logo: Int5, name: 'Ibm' },
    { logo: Int6, name: 'Greenly' },
    { logo: Int7, name: 'Emitwise' },
    { logo: Int8, name: 'Emitwises' },
  ];

  return (
    <>
      <Container>
        <Stack alignItems="center" mb={3} mt={2}>
          <Typography variant="h2" gutterBottom color="#C32BAD">
            Integrate your carbon accounting software
          </Typography>
        </Stack>
        <Grid container spacing={2} justify="space-between">
          {integrations.map((integration, index) => {
            const Logo = integration.logo;
            return (
              <Grid item xs={6} sm={3} key={index}>
                <IconButton aria-label={integration.name} style={{ width: 200, height: 100 }}>
                  <Logo style={{ width: '100%', height: '100%' }} />
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}