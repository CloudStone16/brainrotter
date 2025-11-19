import { Routes, Route } from 'react-router-dom';
import GlitchBackground from './components/GlitchBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GenerateClip from './pages/GenerateClip';
import BrainrotToggle from './components/BrainrotToggle';

function App() {
  return (
    <main>
      <GlitchBackground />
      <BrainrotToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateClip />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;