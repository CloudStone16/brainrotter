import React from 'react';
import { Link } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import brain from '../assets/brain.png';
import skibidi2 from '../assets/skibidi2.gif';

const Register: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for registration logic
    console.log('Register form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center items-center mb-8 space-x-4">
            <img src={brain} alt="brain" className="w-12 h-12" />
            <h2 className="text-4xl font-bold text-center text-white">{isBrainrot ? 'Signup for Aura' : 'Create Account'}</h2>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple transition"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-neon-purple text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
              >
                {isBrainrot ? 'level up' : 'Register'}
              </button>
            </div>
          </form>
          {isBrainrot && (
            <div className="mt-6 flex justify-center">
              <img src={skibidi2} alt="skibidi 2" className="w-24 h-24 rounded-lg" />
            </div>
          )}
          <p className="mt-4 text-center text-sm text-gray-400">
            {isBrainrot ? 'already a sigma? ' : 'Already have an account? '}
            <Link to="/" className="font-medium text-neon-purple hover:underline">
              {isBrainrot ? 'login fr fr' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
