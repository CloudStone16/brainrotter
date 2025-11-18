import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { BrainrotProvider } from './contexts/BrainrotContext.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrainrotProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BrainrotProvider>
  </StrictMode>,
)
