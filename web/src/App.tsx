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
const ManageFeedback = lazy(() => import('./feedback/ManageFeedback'));
const Testing = lazy(() => import('./Testing'));

// Lazy load the Private Component
const ManageDash = lazy(() => import('./space/ManageDash'));
const ManageSpace = lazy(() => import('./space/ManageSpace'));
const EditSpace = lazy(() => import('./space/EditSpace'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<LoLoadingSpinner className={'mt-[4.8rem]'} />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/privacy-policy'} element={<PrivacyPolicy />} />
          <Route path="/feedback/:spaceName" element={<ManageFeedback />} />
          {/*protected Routes start*/}
          <Route element={<ProtectedRoute />}>
            <Route path={'/dashboard'} element={<ManageDash />} />
            <Route path={'/space/:spaceName'} element={<ManageSpace />} />
            <Route path={'/space/edit/:spaceName'} element={<EditSpace />} />
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
