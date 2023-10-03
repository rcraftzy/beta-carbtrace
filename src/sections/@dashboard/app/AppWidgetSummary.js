// @mui
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { Factory, LocalGasStation, ElectricBolt, EmojiTransportation } from '@mui/icons-material';

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, sx, ...other }) {

  let IconComponent;

  // Determina el ícono adecuado según el prop 'icon'
  switch (icon) {
    case 'factory':
      IconComponent = Factory;
      break;
    case 'localGasStation':
      IconComponent = LocalGasStation;
      break;
    case 'electricBolt':
      IconComponent = ElectricBolt;
      break;
    case 'emojiTransportation':
      IconComponent = EmojiTransportation;
      break;
    default:
      // Si no se proporciona un ícono válido, usa un ícono predeterminado
      IconComponent = Factory;
  }
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 5,
        textAlign: 'center',
        color: '#fffff',
        bgcolor: '#fffff',
        ...sx,
      }}
      {...other}
    >
      <IconComponent color='primary' sx={{ fontSize: 40 }} />
      <Typography variant="h3" color='#000000'>{total}</Typography>

      <Typography variant="subtitle2" color='#000000' sx={{ opacity: 0.72,  }}>
        {title}
      </Typography>
    </Card>
  );
}
