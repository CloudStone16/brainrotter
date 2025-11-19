import { Routes, Route } from 'react-router-dom';
import GlitchBackground from './components/GlitchBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GenerateClip from './pages/GenerateClip';
import BrainrotToggle from './components/BrainrotToggle';

// ⭐ Landing Page Import
import Landing from './pages/Landing';

// ⭐ Forgot/Reset Import
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <main>
      <GlitchBackground />
      <BrainrotToggle />

      <Routes>
        {/* ⭐ DEFAULT ROUTE = LANDING PAGE ⭐ */}
        <Route path="/" element={<Landing />} />

        {/* ⭐ AUTH ROUTES ⭐ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ⭐ USER ROUTES ⭐ */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateClip />} />
        <Route path="/home" element={<Home />} />

        {/* ⭐ NEW ROUTES ⭐ */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </main>
  );
}

export default App;
