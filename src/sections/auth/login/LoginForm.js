import { useState } from 'react';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuth } from './AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated } = useAuth();

  const getProductIDFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product_id');
  };

  const productID = getProductIDFromURL();

  const handleLogi = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        productID
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        const token = response.data.access_token;
        // Almacenar el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', token);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      } else if (error.request) {
        console.error('No se pudo hacer la solicitud:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };
/*
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
*/
  return (
    <>
      <Stack spacing={3}>
        <TextField 
        name="email" 
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel 
        control={<Checkbox color="primary"/>}
        label="Remember me"/>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogi}>
        Login
      </LoadingButton>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
