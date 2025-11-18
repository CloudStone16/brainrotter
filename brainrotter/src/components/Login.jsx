import { useState } from 'react';
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

  const floatingEmojis = ['💀', '🗿', '🧠', '🚽', '📱', '🔥', '💯', '😭', '🤡', '👁️'];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-4">
      {/* Floating brainrot assets */}
      <motion.img
        src={brainImg}
        alt="brain"
        className="absolute w-24 h-24 opacity-20 pointer-events-none"
        style={{ top: '10%', left: '10%' }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.img
        src={skullImg}
        alt="skull"
        className="absolute w-32 h-32 opacity-20 pointer-events-none"
        style={{ top: '20%', right: '15%' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.img
        src={brainImg}
        alt="brain"
        className="absolute w-20 h-20 opacity-20 pointer-events-none"
        style={{ bottom: '15%', left: '20%' }}
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.img
        src={skullImg}
        alt="skull"
        className="absolute w-28 h-28 opacity-20 pointer-events-none"
        style={{ bottom: '25%', right: '10%' }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Floating background emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Main login card */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-cyan-400 hover:border-pink-500 transition-all duration-300">
          {/* Skibidi Toilet */}
          <div className="flex justify-center mb-4">
            <motion.img
              src={skibidiGif}
              alt="skibidi toilet"
              className="w-40 h-40 rounded-full border-4 border-green-400"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Title with glitch effect */}
          <motion.h1
            className="text-6xl font-black text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400"
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
            className="text-center text-pink-300 text-xl mb-6 font-bold"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyan-300 font-bold mb-2 text-lg flex items-center gap-2">
                📧 Email (bussin required)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/50 border-2 border-cyan-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500 font-semibold"
                placeholder="your.email@brainrot.com"
                required
              />
            </div>

            <div>
              <label className="block text-cyan-300 font-bold mb-2 text-lg flex items-center gap-2">
                🔐 Password (keep it skibidi)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#ff00ff' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/50 border-2 border-cyan-400 rounded-xl text-white placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500 font-semibold"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-black text-xl py-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 border-2 border-white"
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

        {/* Extra brainrot decorations */}
        <motion.div
          className="absolute -top-10 -right-10 text-8xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          💀
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -left-10 text-8xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          🗿
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
