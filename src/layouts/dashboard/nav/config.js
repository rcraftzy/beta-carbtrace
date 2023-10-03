// component
import { Equalizer, Description, Recycling, UploadFileRounded, CrisisAlert, LocalShipping, Person, Token } from '@mui/icons-material';

const navConfig = [
  {
    title: 'Overview Emissions',
    path: '/dashboard/app',
    icon:  <Equalizer color='primary'/>,
  },
  {
    title: 'Your Data',
    path: '/dashboard/data',
    icon: <Description color='primary' />,
  },
  {
    title: 'Your Suppliers',
    path: '/dashboard/suppliers',
    icon:  <LocalShipping color='primary' />,
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon:  <Person color='primary' />,
  },
  {
    title: 'Materials',
    path: '/dashboard/materials',
    icon:  <Token color='primary' />,
  },
  {
    title: 'Reduce',
    path: '/dashboard/reduce',
    icon:  <Recycling color='primary' />,
  },
  {
    title: 'Request',
    path: '/dashboard/targets',
    icon:  <CrisisAlert color='primary' />,
  },
  {
    title: 'Report',
    path: '/dashboard/report',
    icon: <UploadFileRounded color='primary' />,
  },
];

export default navConfig;
