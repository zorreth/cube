import { TooltipProvider } from '@radix-ui/react-tooltip';
import { BrowserRouter, Routes, Route } from 'react-router';
import { NotFound } from './pages/not-found';
import { Layout } from './components/layout';
import { SolveProvider } from './contexts/solve-provider';

export function App() {
  return (
    <TooltipProvider>
      <SolveProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SolveProvider>
    </TooltipProvider>
  );
}
