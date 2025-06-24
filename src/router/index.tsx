import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../components/layout/auth';
import { MainLayout } from '../components/layout/main';
import { authRoutes } from './auth';
import { mainRoutes } from './main';

export const router = createBrowserRouter([
  {
    path: '/',
    children: mainRoutes,
    element: <MainLayout />,
  },
  {
    path: '/initial-password',
    element: 'InitialPasswordPage',
  },
  {
    children: authRoutes,
    element: <AuthLayout />,
  },
]);
