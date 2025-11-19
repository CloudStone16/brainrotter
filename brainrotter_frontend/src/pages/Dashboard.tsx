import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrainrot } from '../contexts/BrainrotContext';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import skibidi from '../assets/skibidi-skibidi-toilet.gif';
import brain from '../assets/brain.gif';
import skull from '../assets/skull.png';

const Dashboard: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const { user, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  const cards = [
    {
      title: isBrainrot ? 'Cook a Clip' : 'Generate Clip',
      description: isBrainrot ? 'let him cook.' : 'Create a new clip.',
      content: <img src={skibidi} alt="skibidi" className="w-full h-auto rounded-lg mt-4" />,
      onClick: () => navigate('/generate'),
    },
    {
      title: isBrainrot ? 'Rizzponses' : 'View Clips',
      description: isBrainrot ? 'check the W rizz.' : 'Browse your generated clips.',
      content: <img src={brain} alt="brain" className="w-full h-auto rounded-lg mt-4" />,
      onClick: () => navigate('/clips'),
    },
    {
      title: isBrainrot ? 'Aura Settings' : 'Account',
      description: isBrainrot ? 'max prestige your account.' : 'Manage your account settings.',
      content: <img src={skull} alt="skull" className="w-2/3 h-auto rounded-lg mt-4 mx-auto animate-flip" />,
      onClick: () => navigate('/account'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Greeting and Logout Button */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <span className="text-lg text-gray-300">Greetings, {user?.username || 'User'}</span>
        <button
          onClick={logout}
          className="px-4 py-2 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-7xl md:text-8xl font-bold tracking-widest">BRAINROTTER</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          {isBrainrot ? <i className="italic">the opps won’t survive this feed</i> : 'Your Content Hub.'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg hover:border-neon-purple/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col ${
              card.onClick() ? 'cursor-pointer' : ''
            }`}>
            <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
