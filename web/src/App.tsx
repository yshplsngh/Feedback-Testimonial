import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './auth/Login';
import Layout from './Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path={'/login'} element={<Login />} />
        </Route>
      </Routes>
    </Layout>
  );
}
