import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';

import Layout from './Layout';
import ProtectedRoute from './auth/ProtectedRoute';
import LoLoadingSpinner from './ui/components/LoLoadingSpinner';

// Lazy load the components
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Login = lazy(() => import('./auth/Login'));
const Feedback = lazy(() => import('./feedback/Feedback'));
const Testing = lazy(() => import('./Testing'));

// Lazy load the Private Component
const ManageDashboard = lazy(() => import('./space/ManageDashboard'));
const ManageSpace = lazy(() => import('./space/ManageSpace'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<LoLoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
          <Route path="/feedback/:spaceName" element={<Feedback />} />
          {/*protected Routes start*/}
          <Route element={<ProtectedRoute />}>
            <Route path={'/dash'} element={<ManageDashboard />} />
            <Route path={'/dashboard'} element={<ManageDashboard />} />
            <Route path={'/spaces/:spaceName'} element={<ManageSpace />} />
          </Route>
          {/*protected Routes end*/}
          <Route path={'/testing'} element={<Testing />} />
          <Route path={'*'} element={<NotFound />} />
          <Route path={'/error'} element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
