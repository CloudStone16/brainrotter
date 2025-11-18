import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import skibidiGif from '../assets/skibidi-skibidi-toilet.gif';
import brainImg from '../assets/brain.png';
import skullImg from '../assets/skull.png';
import moaiImg from '../assets/4666433.png';
import SkibidiTransition from './SkibidiTransition';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showTransition, setShowTransition] = useState(false);

  const cards = [
    {
      id: 'pure',
      title: 'PURE BRAINROT',
      description: 'Maximum chaos. No context. Only rot.',
      emoji: '💀',
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-500',
      route: '/generate/pure'
    },
    {
      id: 'youtube',
      title: 'YOUTUBE + BRAINROT',
      description: 'Your video. Our rot. Peak content.',
      emoji: '🧠',
      color: 'from-cyan-600 to-blue-600',
      borderColor: 'border-cyan-500',
      route: '/generate/youtube'
    },
    {
      id: 'edits',
      title: 'JUST EDITS',
      description: 'Clean edits. W rizz. Fr fr.',
      emoji: '🎬',
      color: 'from-green-600 to-yellow-600',
      borderColor: 'border-green-500',
      route: '/generate/edits'
    }
  ];

  const floatingAssets = [
    { src: brainImg, size: 'w-24 h-24', top: '15%', left: '12%', duration: 8 },
    { src: skullImg, size: 'w-32 h-32', top: '65%', right: '8%', duration: 6 },
    { src: moaiImg, size: 'w-28 h-28', bottom: '20%', left: '15%', duration: 10 },
    { src: brainImg, size: 'w-20 h-20', top: '40%', right: '18%', duration: 7 },
    { src: skullImg, size: 'w-24 h-24', top: '80%', left: '75%', duration: 9 },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setTimeout(() => {
      setShowTransition(true);
    }, 800);
  };

  const handleTransitionComplete = () => {
    navigate(selectedCard.route);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated background characters with side-eye effect */}
        {floatingAssets.map((asset, i) => (
          <motion.img
            key={i}
            src={asset.src}
            alt={`floating-${i}`}
            className={`absolute ${asset.size} opacity-20 pointer-events-none`}
            style={{ 
              top: asset.top, 
              left: asset.left, 
              right: asset.right, 
              bottom: asset.bottom 
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: asset.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ 
              scale: 1.5, 
              opacity: 0.4,
              rotate: -20,
              transition: { duration: 0.3 }
            }}
          />
        ))}

        {/* Terminal-style header */}
        <div className="relative z-10 border-b-2 border-green-500 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </motion.div>
              <motion.h1 
                className="text-2xl font-mono text-green-400"
                animate={{ 
                  textShadow: ['0 0 10px #00ff00', '0 0 20px #00ff00', '0 0 10px #00ff00'] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'>'} BRAINROT_GENERATOR.exe
              </motion.h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cyan-400 font-mono">USER: {user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono rounded border-2 border-red-400 transition-all hover:scale-105"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              CHOOSE YOUR ROT
            </motion.h2>
            <p className="text-xl text-gray-400 font-mono">
              &gt; SELECT_BRAINROT_MODE.sh --execute
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ 
                  opacity: selectedCard?.id === card.id ? 0 : 1, 
                  y: selectedCard?.id === card.id ? 1000 : 0,
                  rotateX: 0 
                }}
                transition={{ 
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 255, 255, 0.5)'
                }}
                onClick={() => handleCardClick(card)}
                className="cursor-pointer"
              >
                <div className={`relative h-80 rounded-2xl bg-gradient-to-br ${card.color} p-1 ${card.borderColor} border-4 overflow-hidden`}>
                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  <div className="relative h-full bg-black/60 backdrop-blur rounded-xl p-8 flex flex-col items-center justify-center">
                    <motion.div 
                      className="text-8xl mb-6"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {card.emoji}
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-white mb-3 font-mono">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-300 text-center font-mono text-sm">
                      {card.description}
                    </p>

                    <motion.div 
                      className="mt-6 px-6 py-2 bg-white/10 rounded-full border-2 border-white/30"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <span className="text-white font-mono font-bold">CLICK ME</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal prompt at bottom */}
          <motion.div 
            className="mt-16 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-green-400 font-mono text-lg">
              <span className="animate-pulse">▮</span> AWAITING_INPUT...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Skibidi Transition Modal */}
      <AnimatePresence>
        {showTransition && (
          <SkibidiTransition onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
