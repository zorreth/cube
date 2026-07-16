import { BrowserRouter, Routes, Route } from 'react-router';
import { NotFound } from '@/pages/not-found';
import { Layout } from './layout';
import { Timer } from './pages/timer';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<Timer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
