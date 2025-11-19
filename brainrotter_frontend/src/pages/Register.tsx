import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import API_URL from '../config/api';

import brain from '../assets/brain.png';
import skibidi2 from '../assets/skibidi2.gif';

const Register: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Account created! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center items-center mb-8 space-x-4">
            <img src={brain} alt="brain" className="w-12 h-12" />
            <h2 className="text-4xl font-bold text-center text-white">
              {isBrainrot ? 'Signup for Aura' : 'Create Account'}
            </h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">

            {/* Username UI — not used by backend yet */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white"
              />
            </div>

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

            <button
              type="submit"
              className="w-full bg-neon-purple text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
              {isBrainrot ? 'level up' : 'Register'}
            </button>
          </form>

          {isBrainrot && (
            <div className="mt-6 flex justify-center">
              <img src={skibidi2} className="w-24 h-24 rounded-lg" />
            </div>
          )}

          <p className="mt-4 text-center text-sm text-gray-400">
            {isBrainrot ? 'already a sigma? ' : 'Already have an account? '}
            <Link to="/login" className="font-medium text-neon-purple hover:underline">
              {isBrainrot ? 'login fr fr' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
