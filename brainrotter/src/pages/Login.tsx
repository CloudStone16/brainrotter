import React from 'react';
import { Link } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import skull from '../assets/skull.png';
import skibidi1 from '../assets/skibidi1.gif';

const Login: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log('Login form submitted');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center items-center mb-8 space-x-4">
            <img src={skull} alt="skull" className="w-12 h-12" />
            <h2 className="text-4xl font-bold text-center text-white">{isBrainrot ? 'Login fr fr' : 'Login'}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-400 hover:text-neon-purple transition">
                  {isBrainrot ? 'forgot password? dw, you dont lose aura' : 'Forgot Password?'}
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple transition"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-neon-purple text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
              >
                {isBrainrot ? 'rizz up' : 'Sign In'}
              </button>
            </div>
          </form>
          {isBrainrot && (
            <div className="mt-6 flex justify-center">
              <img src={skibidi1} alt="skibidi 1" className="w-24 h-24 rounded-lg" />
            </div>
          )}
          <p className="mt-4 text-center text-sm text-gray-400">
            {isBrainrot ? 'need that sigma status? ' : "Don't have an account? "}
            <Link to="/register" className="font-medium text-neon-purple hover:underline">
              {isBrainrot ? 'signup for aura' : 'Sign Up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
