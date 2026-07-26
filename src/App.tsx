/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { RouteErrorBoundary } from './components/shared/ErrorBoundary';
import Home from './features/public/pages/Home';
import StartProject from './features/client/pages/StartProject';
import JoinNetwork from './features/designer/pages/JoinNetwork';
import Designers from './features/public/pages/Designers';
import DesignerProfile from './features/public/pages/DesignerProfile';
import EpoxyFlooring from './features/public/pages/EpoxyFlooring';
import ShopWaitlist from './features/public/pages/ShopWaitlist';
import About from './features/public/pages/About';
import Contact from './features/public/pages/Contact';
import Login from './features/auth/pages/Login';
import Signup from './features/auth/pages/Signup';
import ClientDashboard from './features/client/pages/ClientDashboard';
import DesignerDashboard from './features/designer/pages/DesignerDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'start-project', element: <StartProject /> },
      { path: 'join-network', element: <JoinNetwork /> },
      { path: 'designers', element: <Designers /> },
      { path: 'designers/:id', element: <DesignerProfile /> },
      { path: 'epoxy-flooring', element: <EpoxyFlooring /> },
      { path: 'shop', element: <ShopWaitlist /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'dashboard/client', element: <ClientDashboard /> },
      { path: 'dashboard/designer', element: <DesignerDashboard /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
