import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/Home';
import { Login } from '../Authentication/Login';
import { Register } from '../Authentication/Register';
import { Dashboard } from '../pages/Dashboard';
import { DashboardInventory } from '../pages/Dashboard/DashboardInventory';
import { DashboardHome } from '../pages/Dashboard/DashboardHome';
import { DashboardAlerts } from '../pages/Dashboard/DashboardAlerts';
import { DashboardSettings } from '../pages/Dashboard/DashboardSettings';
import { DashboardDelivery } from '../pages/Dashboard/DashboardDelivery';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: 'delivery',
            element: <DashboardDelivery/>,
          },
          {
            path: 'inventory',
            element: <DashboardInventory />,
          },
          {
            path: 'alerts',
            element: <DashboardAlerts />,
          },
          {
            path: 'settings',
            element: <DashboardSettings />,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
