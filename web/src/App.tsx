import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';

import Layout from './Layout';
import LoadingSpinner from './ui/components/LoadingSpinner';

// Lazy load the Login component
const Home = lazy(() => import('./pages/Home'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Login = lazy(() => import('./users/Login'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
