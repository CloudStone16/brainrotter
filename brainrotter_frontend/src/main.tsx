import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { BrainrotProvider } from './contexts/BrainrotContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

import './index.css';

// ❌ REMOVE THIS (AppRoutes doesn't exist anymore)
// import AppRoutes from './AppRoutes.tsx';

// ✅ USE App.tsx INSTEAD
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrainrotProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BrainrotProvider>
    </AuthProvider>
  </StrictMode>
);
