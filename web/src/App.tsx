import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';

import Layout from './Layout';
import LoadingSpinner from './ui/components/LoadingSpinner';
import ProtectedRoute from './auth/ProtectedRoute';

// Lazy load the components
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Login = lazy(() => import('./auth/Login'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />

          {/*protected Routes*/}
          <Route element={<ProtectedRoute />}>
            <Route path={'/:userName/dashboard'} element={<Dashboard />} />
          </Route>

          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
