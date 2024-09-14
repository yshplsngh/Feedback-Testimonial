import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path={'login'} element={<Login />} />
      </Route>
    </Routes>
  );
}
