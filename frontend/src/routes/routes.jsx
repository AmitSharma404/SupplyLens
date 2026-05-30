import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Inventory from '../pages/Inventory';
import AddProduct from '../pages/AddProduct';
import Suppliers from '../pages/Suppliers';
import Orders from '../pages/Orders';
import Forecast from '../pages/Forecast';
import Alerts from '../pages/Alerts';
import { DashboardSettings } from '../pages/Dashboard/DashboardSettings';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  // Keep /register as alias for /signup
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'inventory/add', element: <AddProduct /> },
      { path: 'suppliers', element: <Suppliers /> },
      { path: 'orders', element: <Orders /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'alerts', element: <Alerts /> },
      { path: 'settings', element: <DashboardSettings /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
