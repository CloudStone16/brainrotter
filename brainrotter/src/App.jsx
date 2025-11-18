import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PureBrainrot from './components/PureBrainrot';
import YoutubeBrainrot from './components/YoutubeBrainrot';
import JustEdits from './components/JustEdits';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate/pure"
            element={
              <ProtectedRoute>
                <PureBrainrot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate/youtube"
            element={
              <ProtectedRoute>
                <YoutubeBrainrot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate/edits"
            element={
              <ProtectedRoute>
                <JustEdits />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
