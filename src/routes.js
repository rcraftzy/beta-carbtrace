import { Navigate, useRoutes } from 'react-router-dom';
import { useAuth } from './sections/auth/login/AuthContext';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DataPage from './pages/DataPage';
import SuppliersPage from './pages/SuppliersPage';
import Page404 from './pages/Page404';
import MaterialsPage from './pages/MaterialsPage';
import ProductsPage from './pages/ProductsPage';
import ReducePage from './pages/ReducePage';
import TargetsPage from './pages/TargetsPage'
import ReportPage from './pages/ReportPage';
import CalculatorPage from './pages/CalculatorPage';
import IntegrationPage from './pages/IntegrationPage';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import PruebaPage from './pages/PruebaPage'

// ----------------------------------------------------------------------

export default function Router() {
  const { isAuthenticated } = useAuth();

  const requireAuth = (element) => isAuthenticated ? element : <Navigate to="/login" />;

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: isAuthenticated ? <Navigate to="/dashboard/app" /> : null, index: true },
        { path: 'app', element: requireAuth(<DashboardAppPage />) },
        { path: 'suppliers', element: requireAuth(<SuppliersPage />) },
        { path: 'products', element: requireAuth(<ProductsPage />) },
        { path: 'data', element: requireAuth(<DataPage />) },
        { path: 'materials', element: requireAuth(<MaterialsPage />) },
        { path: 'reduce', element: requireAuth(<ReducePage />) },
        { path: 'targets', element: requireAuth(<TargetsPage />) },
        { path: 'report', element: requireAuth(<ReportPage />) },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    { path: 'calculator', 
      element: requireAuth(<CalculatorPage />) 
    },
    { path: 'integration', 
      element: requireAuth(<IntegrationPage />) 
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
