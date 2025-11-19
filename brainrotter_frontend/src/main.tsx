import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { BrainrotProvider } from './contexts/BrainrotContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

import './index.css';
import AppRoutes from './AppRoutes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrainrotProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BrainrotProvider>
    </AuthProvider>
  </StrictMode>
);
