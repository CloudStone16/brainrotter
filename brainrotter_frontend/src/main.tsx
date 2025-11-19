import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BrainrotProvider } from './contexts/BrainrotContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BrainrotProvider>
          <App />
        </BrainrotProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
