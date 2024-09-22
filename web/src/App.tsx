import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';

import Layout from './Layout';
import ProtectedRoute from './auth/ProtectedRoute';
import BigLoadingSpinner from './ui/components/BIgLoadingSpinner';

// Lazy load the components
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Login = lazy(() => import('./auth/Login'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const NewSpace = lazy(() => import('./space/NewSpace'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<BigLoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />

          {/*protected Routes*/}
          <Route element={<ProtectedRoute />}>
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/new-space'} element={<NewSpace />} />
          </Route>

          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
