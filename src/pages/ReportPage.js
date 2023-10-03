import React from 'react';
import { Button, Typography, Stack} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Int1 from '../assets/netzero.jpg';

export default function ReportPage() {
  return (
    <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reporting
          </Typography>
        </Stack>

         <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Card sx={{ maxWidth: 315,}}>
            <CardActionArea>
              <CardMedia
                component='img'
                image={Int1}
                height="140"
                alt="Logotipo report emissions"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Emissions Report 2021
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get your organization emissions details.
                </Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
                <Button sx={{ marginLeft: 2, backgroundColor: '#7027A0', color: 'white' }} size="small">
                  Download
                </Button>
              </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345,}}>
            <CardActionArea>
              <CardMedia
                component='img'
                image={Int1}
                height="140"
                alt="Logotipo report emissions"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Emissions Report 2022
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get your organization emissions details.
                </Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
                <Button sx={{ marginLeft: 2, backgroundColor: '#7027A0', color: 'white' }} size="small">
                  Download
                </Button>
              </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345,}}>
            <CardActionArea>
              <CardMedia
                component='img'
                image={Int1}
                height="140"
                alt="Logotipo report emissions"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Emissions Report 2023
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get your organization emissions details.
                </Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
                <Button sx={{ marginLeft: 2, backgroundColor: '#7027A0', color: 'white' }} size="small">
                  Download
                </Button>
              </CardActions>
          </Card>    
        </Stack>        

    </>
  );
}

/*

      <Typography variant='subtitle2' gutterBottom color='#000000'>
        Material Use
      </Typography>
      <FormControl sx={{ width: '450px' }}>
        <InputLabel id="material-use-label">Material Use Category</InputLabel>
        <Select
          labelId="material-use-label"
          value={selectedMaterialUse}
          onChange={handleMaterialUseChange}
          {...getMenuProps()}
        >
          {Object.keys(materialUseLevelsData).map((level1, index) => (
            materialUseLevelsData[level1].map((item, idx) => (
              <MenuItem key={`${index}-${idx}`} value={item} sx={{ lineHeight: 1 }}>
                {item}
              </MenuItem>
            ))
          ))}
        </Select>
      </FormControl>

 /*     



// ----------------------------------------------------------------------
        /* 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedType('');
    setFactor('');
  };

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
  const selectedFactor = fuels.materials.types[selectedType]?.tonnesFactor;


      <div className="question" style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body1" gutterBottom mr={5} mt={1}>
                     Please confirm that Dave has purchased 100kg of xxxx
                </Typography>
                <FormControlLabel
                control={<Checkbox id="si" name="acuerdo" value="si" />}
                label="Yes"
                htmlFor="si"
                />
                <FormControlLabel
                control={<Checkbox id="no" name="acuerdo" value="no" />}
                label="No"
                htmlFor="no"
                />
            </div>
            <div className="question" style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body1" gutterBottom mr={10} mt={1}>
                     Do you know the emission factor of your product?
                </Typography>
                <FormControlLabel
                control={<Checkbox id="si" name="acuerdo" value="si" />}
                label="Yes"
                htmlFor="si"
                />
                <FormControlLabel
                control={<Checkbox id="no" name="acuerdo" value="no" />}
                label="No"
                htmlFor="no"
                />
            </div>
             <Typography variant="h3" gutterBottom mr={5} mt={1}>
                  Let's calculate it!
              </Typography>
              <Stack alignItems="center" mb={3} mt={2}>
                <Typography variant="h5" gutterBottom color="black">
                    Scope 1
                </Typography>
              </Stack>
              <Typography variant="h5" gutterBottom color="black">
                  Fuels Consumed: Enter the monthly consumption values
              </Typography>

  */