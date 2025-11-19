import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import { useAuth } from '../contexts/AuthContext';
import API_URL from '../config/api';

import skull from '../assets/skull.png';
import skibidi1 from '../assets/skibidi1.gif';

const Login: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Note: Ensure backend sends user and token
      // The AuthContext expects login(user, token)
      login(data.user, data.token); 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center items-center mb-8 space-x-4">
            <img src={skull} alt="skull" className="w-12 h-12" />
            <h2 className="text-4xl font-bold text-center text-white">
              {isBrainrot ? 'Login fr fr' : 'Login'}
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white"
              />
            </div>

            {/* ⭐ FORGOT PASSWORD LINK (added) ⭐ */}
            <div className="flex justify-end -mt-4">
              <Link
                to="/forgot-password"
                className="text-neon-purple text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-neon-purple text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
              {isBrainrot ? 'rizz up' : 'Sign In'}
            </button>
          </form>

          {isBrainrot && (
            <div className="mt-6 flex justify-center">
              <img src={skibidi1} className="w-24 h-24 rounded-lg" />
            </div>
          )}

          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-neon-purple">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
