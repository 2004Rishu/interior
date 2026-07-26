/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import StartProject from './pages/StartProject';
import JoinNetwork from './pages/JoinNetwork';
import Designers from './pages/Designers';
import DesignerProfile from './pages/DesignerProfile';
import EpoxyFlooring from './pages/EpoxyFlooring';
import ShopWaitlist from './pages/ShopWaitlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClientDashboard from './pages/ClientDashboard';
import DesignerDashboard from './pages/DesignerDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
