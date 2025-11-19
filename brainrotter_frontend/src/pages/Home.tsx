import React from 'react';
import { Link } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import brain from '../assets/brain.png';
import skull from '../assets/skull.png';
import skibidi1 from '../assets/skibidi1.gif';
import skibidi2 from '../assets/skibidi2.gif';
import skibidi3 from '../assets/skibidi3.gif';

const Home: React.FC = () => {
  const { isBrainrot } = useBrainrot();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="flex items-center justify-center space-x-8">
        <img src={skull} alt="skull" className="w-24 h-24 md:w-32 md:h-32 animate-pulse" />
        <h1 className="text-7xl md:text-9xl font-bold tracking-widest">BRAINROTTER</h1>
        <img src={brain} alt="brain" className="w-24 h-24 md:w-32 md:h-32 animate-bounce" />
      </div>
      <p className="mt-4 text-lg md:text-2xl text-gray-300">
        {isBrainrot ? 'made for sigmas, by sigmas' : 'Where your content ascends.'}
      </p>
      <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          to="/register"
          className="px-8 py-3 border border-white/20 rounded-2xl text-lg hover:bg-white/5 transition-colors duration-300"
        >
          {isBrainrot ? 'sign up for aura' : 'Register'}
        </Link>
        <Link
          to="/login"
          className="px-8 py-3 border border-white/20 rounded-2xl text-lg hover:bg-white/5 transition-colors duration-300"
        >
          {isBrainrot ? 'login fr fr' : 'Login'}
        </Link>
      </div>
      {isBrainrot && (
        <div className="mt-16 flex space-x-4">
          <img src={skibidi1} alt="skibidi 1" className="w-32 h-32 rounded-lg" />
          <img src={skibidi2} alt="skibidi 2" className="w-32 h-32 rounded-lg" />
          <img src={skibidi3} alt="skibidi 3" className="w-32 h-32 rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default Home;
