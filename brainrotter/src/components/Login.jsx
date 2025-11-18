import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import skibidiGif from '../assets/skibidi-skibidi-toilet.gif';
import brainImg from '../assets/brain.png';
import skullImg from '../assets/skull.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Try again bestie 💀');
    }
    
    setLoading(false);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto bg-gradient-to-br from-black via-purple-900 to-black">
      {/* Background brainrot elements - scattered across page */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dense background of Skibidi toilets */}
        {[...Array(12)].map((_, i) => (
          <motion.img
            key={`skibidi-${i}`}
            src={skibidiGif}
            alt="skibidi"
            className="absolute opacity-15 rounded-lg pointer-events-auto cursor-pointer"
            style={{ 
              width: `${60 + Math.random() * 60}px`,
              height: `${60 + Math.random() * 60}px`,
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20 + Math.random() * 40, 0],
              rotate: [0, Math.random() * 30 - 15, 0],
            }}
            whileHover={{ scale: 1.3, opacity: 0.4, transition: { duration: 0.8 } }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
        
        {/* Emoji brainrot characters */}
        {['💀', '🧠', '🗿', '🚽', '👁️', '😵', '🤡', '💩', '👹', '🔥', '💯', '📱', '🎮', '⚡'].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-4xl sm:text-5xl md:text-6xl opacity-20 pointer-events-auto cursor-pointer"
            style={{ 
              top: `${(i * 13) % 100}%`, 
              left: `${(i * 17) % 100}%`,
            }}
            animate={{
              y: [0, -15 + Math.random() * 30, 0],
              rotate: [0, Math.random() * 40 - 20, 0],
            }}
            whileHover={{ 
              scale: 1.5, 
              opacity: 0.5,
              rotate: 45,
              transition: { duration: 0.6 } 
            }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Centered Login Card - Clean & Prominent */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border-4 border-cyan-400 hover:border-pink-500 transition-all duration-300 w-full">
          {/* Skibidi Toilet GIF - RESPONSIVE */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <motion.img
              src={skibidiGif}
              alt="skibidi toilet"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-green-400 shadow-lg shadow-green-500/50"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.5)',
                  '0 0 40px rgba(34, 197, 94, 0.8)',
                  '0 0 20px rgba(34, 197, 94, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Title with glitch effect - RESPONSIVE */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-2 sm:mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400"
            animate={{
              textShadow: [
                '0 0 10px #00ffff',
                '0 0 20px #ff00ff',
                '0 0 10px #ffff00',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LOGIN FR FR
          </motion.h1>
          
          <motion.p
            className="text-center text-pink-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 font-bold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            no cap on god 🗿
          </motion.p>

          {error && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-red-500/80 text-white p-3 rounded-xl mb-4 text-center font-bold border-2 border-red-300"
            >
              ❌ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              <label className="block text-cyan-300 font-bold mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl text-center">
                📧 Email (bussin required)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl bg-purple-900/50 border-2 border-cyan-400 rounded-xl text-white text-center placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500 font-semibold"
                placeholder="your.email@brainrot.com"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-cyan-300 font-bold mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl text-center">
                🔐 Password (keep it skibidi)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl bg-purple-900/50 border-2 border-cyan-400 rounded-xl text-white text-center placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500 font-semibold"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-black text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 border-2 border-white"
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  🔄
                </motion.span>
              ) : (
                '🚀 LETS GOOOO 🚀'
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-pink-200 font-semibold">
              No account? L + ratio 💀
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-2 text-cyan-300 font-black text-lg hover:text-yellow-300 transition-colors underline decoration-wavy"
              >
                SIGN UP RN (real)
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Extra brainrot decorations - RESPONSIVE */}
        <motion.div
          className="absolute -top-6 sm:-top-8 md:-top-10 -right-6 sm:-right-8 md:-right-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          💀
        </motion.div>
        <motion.div
          className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 -left-6 sm:-left-8 md:-left-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          🗿
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
